import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageConfig } from "@storage/storageConfig";
import { PlayerStorageDto } from "./PlayerStorageDTO";

export async function playersGetByGroup(group: string) {
    try {
        const storage = await AsyncStorage.getItem(`${storageConfig.player}-${group}`);
        const players: PlayerStorageDto[] = storage ? JSON.parse(storage) : [];

        return players;
    } catch (error) {
        throw error;
    }
}
