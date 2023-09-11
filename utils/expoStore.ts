import * as SecureStore from 'expo-secure-store';

export async function saveToStore(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value);
}

export async function getFromStore(key: string): Promise<string | null> {
  return await SecureStore.getItemAsync(key);
}

export async function deleteFromStore(key: string): Promise<void> {
  await SecureStore.deleteItemAsync(key);
}
