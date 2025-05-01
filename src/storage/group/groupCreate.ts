import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageConfig } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";
import { AppError } from "@utils/AppErro";
export async function groupCreate(newGroup: string) {
  try {
    const storageGroups = await groupGetAll();

    const groupAlreadyExists = storageGroups.includes(newGroup);

    if (groupAlreadyExists) {
      throw new AppError("Já existe um grupo com este nome.");
    }

    const storage = JSON.stringify([...storageGroups, newGroup]);

    await AsyncStorage.setItem(storageConfig.group, storage);
  } catch (error) {
    throw error;
  }
}
