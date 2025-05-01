import React, { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput, Keyboard } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { playerAddByGroup } from "@storage/player/playersAddByGroup";
import { PlayerStorageDto } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppErro";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";
interface RouteParams {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayer, setNewPlayer] = useState("");
  const [team, setTeam] = useState("time A");
  const [players, setPlayers] = useState<PlayerStorageDto[]>([]);

  const route = useRoute();
  const navigation = useNavigation();

  const { group } = route.params as RouteParams;

  const numberOfPlayers = players.length;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function playerRemove(name: string) {
    try {
      await playerRemoveByGroup(name, group);

      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Remover participante",
        "Não foi possível remover o participante."
      );
    }
  }

  async function handlePlayerAdd() {
    if (newPlayer.trim().length === 0) {
      return Alert.alert(
        "Novo participante",
        "O nome do participante é obrigatório."
      );
    }

    try {
      const newPlayerDto: PlayerStorageDto = { name: newPlayer, team };

      await playerAddByGroup(newPlayerDto, group);
      newPlayerNameInputRef.current?.blur();
      Keyboard.dismiss();

      setNewPlayer("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo participante", error.message);
      } else {
        console.log(error);
        Alert.alert(
          "Novo participante",
          "Não foi possível adicionar o participante."
        );
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);

      const players = await playersGetByGroupAndTeam(group, team);
      setPlayers(players);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Turma", "Não foi possível carregar os participantes.");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.reset({
        index: 0,
        routes: [{ name: "groups" }],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGroupRemove() {
    try {
      Alert.alert("Remover", "Deseja remover a turma?", [
        { text: "Não", style: "cancel" },
        { text: "Sim", onPress: () => groupRemove() },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert("Remover turma", "Não foi possível remover a turma.");
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do participante"
          autoCorrect={false}
          onChangeText={setNewPlayer}
          value={newPlayer}
          onSubmitEditing={handlePlayerAdd}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handlePlayerAdd} />
      </Form>
      <HeaderList>
        <FlatList
          data={["time A", "time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{numberOfPlayers}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <FlatList
            data={players}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PlayerCard name={item.name} onRemove={playerRemove} />
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="Nenhum participante adicionado" />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 },
            ]}
          />
        </>
      )}
      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
