import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const isTablet = () => {
  return Math.min(width, height) >= 600;
};
