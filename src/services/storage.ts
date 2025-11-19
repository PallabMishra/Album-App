import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Album} from '../types/album';

const ALBUMS_KEY = 'albums_cache_v1';

export const saveAlbumsToCache = async (albums: Album[]) => {
  try {
    await AsyncStorage.setItem(ALBUMS_KEY, JSON.stringify(albums));
  } catch (e) {
    console.warn('Failed to save albums cache', e);
  }
};

export const getAlbumsFromCache = async (): Promise<Album[] | null> => {
  try {
    const json = await AsyncStorage.getItem(ALBUMS_KEY);
    if (!json) return null;
    return JSON.parse(json) as Album[];
  } catch (e) {
    console.warn('Failed to read albums cache', e);
    return null;
  }
};
