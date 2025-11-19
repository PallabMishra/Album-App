import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../src/screens/DashboardScreen';
import type {RootStackParamList} from '../src/navigation/RootNavigator';

// mock the hook so we don't hit real API
jest.mock('../src/hooks/useAlbums', () => ({
  useAlbums: () => ({
    albums: [
      {
        collectionId: 1,
        collectionName: 'Test Album One',
        artistName: 'Jack Johnson',
        artworkUrl100: 'https://example.com/a1.jpg',
        releaseDate: new Date().toISOString(),
        trackCount: 10,
        country: 'USA',
        primaryGenreName: 'Rock',
      },
    ],
    loading: false,
    error: null,
    isOffline: false,
    refresh: jest.fn(),
  }),
}));

const Stack = createNativeStackNavigator<RootStackParamList>();

const Wrapper = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('DashboardScreen', () => {
  it('renders at least one album card', () => {
    const {getAllByTestId, getByText} = render(<Wrapper />);

    // header
    expect(getByText('Albums')).toBeTruthy();

    // album cards
    const cards = getAllByTestId('album-card');
    expect(cards.length).toBeGreaterThan(0);
  });
});
