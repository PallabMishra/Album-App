import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen';
import type {Album} from '../types/album';
import {BRAND} from '../config/branding';
import {colors} from '../theme/colors';

export type RootStackParamList = {
  Dashboard: undefined;
  AlbumDetails: {album: Album};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: '600'}
      }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{title: `${BRAND.appName} – Albums`}}
      />
      <Stack.Screen
        name="AlbumDetails"
        component={AlbumDetailsScreen}
        options={{title: 'Album Details'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
