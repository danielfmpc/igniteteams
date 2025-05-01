import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageConfig } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupRemoveByName(groupDeleted: string) {
    try {
        const storage = await groupGetAll();

        const groups = storage.filter(group => group !== groupDeleted);

        await AsyncStorage.setItem(storageConfig.group, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${storageConfig.player}-${groupDeleted}`);

    } catch (error) {
        throw error;
    }
}