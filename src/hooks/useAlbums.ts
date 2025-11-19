import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import type {Album} from '../types/album';
import {fetchAlbumsFromApi} from '../services/api';
import {getAlbumsFromCache, saveAlbumsToCache} from '../services/storage';

interface UseAlbumsState {
  albums: Album[];
  loading: boolean;
  error: string | null;
  isOffline: boolean;
  refresh: () => void;
}

export const useAlbums = (): UseAlbumsState => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const loadFromCache = async () => {
    const cached = await getAlbumsFromCache();
    if (cached && cached.length > 0) {
      setAlbums(cached);
    }
  };

  const load = async () => {
    setLoading(true);
    setError(null);

    const netState = await NetInfo.fetch();
    const hasInternet = netState.isConnected && netState.isInternetReachable !== false;
    setIsOffline(!hasInternet);

    if (!hasInternet) {
      await loadFromCache();
      setLoading(false);
      return;
    }

    try {
      const freshAlbums = await fetchAlbumsFromApi();
      setAlbums(freshAlbums);
      await saveAlbumsToCache(freshAlbums);
    } catch (e: any) {
      setError('Failed to load albums');
      await loadFromCache();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load: try cache quickly, then fetch
    loadFromCache().finally(load);

    const unsubscribe = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable !== false);
      setIsOffline(offline);
    });

    return () => unsubscribe();
  }, []);

  return {
    albums,
    loading,
    error,
    isOffline,
    refresh: load
  };
};
