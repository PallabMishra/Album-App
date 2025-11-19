import React from 'react';
import {render} from '@testing-library/react-native';


jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn().mockResolvedValue({
    isConnected: true,
    isInternetReachable: true,
  }),
  addEventListener: jest.fn().mockReturnValue(() => {}),
}));


jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

import App from '../src/App';

describe('App root', () => {
  it('renders dashboard screen on start', () => {
    const {getByTestId} = render(<App />);
    expect(getByTestId('dashboard-screen')).toBeTruthy();
  });
});
