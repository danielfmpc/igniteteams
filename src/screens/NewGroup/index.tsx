import { useState } from "react";
import { Container, Content } from "./styles";
import { Header } from "@components/Header";
import { Icon } from "@components/GroupCard/styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const [group, setGroup] = useState<string>("");
  const navigation = useNavigation();

  function handleNew() {
    navigation.navigate("players", { group });
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
