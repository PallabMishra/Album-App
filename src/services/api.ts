import axios from 'axios';
import type {Album} from '../types/album';

const ITUNES_URL = 'https://itunes.apple.com/search';

interface ITunesResponse {
  results: any[];
}

const mapToAlbum = (item: any): Album => ({
  collectionId: item.collectionId,
  collectionName: item.collectionName,
  artistName: item.artistName,
  artworkUrl100: item.artworkUrl100,
  releaseDate: item.releaseDate,
  trackCount: item.trackCount,
  country: item.country,
  primaryGenreName: item.primaryGenreName
});

export const fetchAlbumsFromApi = async (): Promise<Album[]> => {
  const response = await axios.get<ITunesResponse>(ITUNES_URL, {
    params: {
      term: 'jack johnson',
      entity: 'album'
    }
  });

  return (response.data.results || []).map(mapToAlbum);
};
