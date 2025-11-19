import axios from 'axios';
import {fetchAlbumsFromApi} from '../src/services/api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchAlbumsFromApi', () => {
  it('maps iTunes response into Album[]', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [
          {
            collectionId: 1,
            collectionName: 'Sample Album',
            artistName: 'Jack Johnson',
            artworkUrl100: 'https://example.com/a.jpg',
            releaseDate: '2020-01-01T00:00:00Z',
            trackCount: 12,
            country: 'USA',
            primaryGenreName: 'Rock',
          },
        ],
      },
    } as any);

    const result = await fetchAlbumsFromApi();

    expect(result).toHaveLength(1);
    expect(result[0].collectionName).toBe('Sample Album');
    expect(result[0].artistName).toBe('Jack Johnson');
  });
});
