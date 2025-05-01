import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageConfig } from "@storage/storageConfig";
import { PlayerStorageDto } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";
import { AppError } from "@utils/AppErro";

export async function playerAddByGroup(newPlayer: PlayerStorageDto, group: string) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    
    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);
    
    console.log(playerAlreadyExists);
    if (playerAlreadyExists.length > 0) {
        throw new AppError("Essa pessoa já está adicionada em um time.");
    }
    
    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${storageConfig.player}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}

