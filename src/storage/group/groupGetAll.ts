import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageConfig } from "@storage/storageConfig";

export async function groupGetAll() {
  try {
    const storage = await AsyncStorage.getItem(storageConfig.group);

    const groups: string[] = storage ? JSON.parse(storage) : [];

    return groups;
  } catch (error) {
    throw error;
  }
}
