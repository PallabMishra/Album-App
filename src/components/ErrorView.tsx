import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

interface Props {
  message: string;
}

const ErrorView: React.FC<Props> = ({message}) => (
  <View style={styles.container} testID="error-view">
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: 8,
    backgroundColor: '#FEE2E2'
  },
  text: {
    color: colors.error
  }
});

export default ErrorView;
