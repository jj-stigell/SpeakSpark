import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

export async function saveToStore(key: string, value: string): Promise<void> {
  await setItemAsync(key, value);
}

export async function getFromStore(key: string): Promise<string | null> {
  return await getItemAsync(key);
}

export async function deleteFromStore(key: string): Promise<void> {
  await deleteItemAsync(key);
}
