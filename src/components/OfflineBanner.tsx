import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

interface Props {
  visible: boolean;
}

const OfflineBanner: React.FC<Props> = ({visible}) => {
  if (!visible) return null;

  return (
    <View style={styles.container} testID="offline-banner">
      <Text style={styles.text}>You are offline. Showing cached albums.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.offline,
    padding: spacing.sm
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12
  }
});

export default OfflineBanner;
