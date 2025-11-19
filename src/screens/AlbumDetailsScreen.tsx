import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/RootNavigator';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {isTablet} from '../utils/responsive';

type Props = NativeStackScreenProps<RootStackParamList, 'AlbumDetails'>;

const AlbumDetailsScreen: React.FC<Props> = ({route}) => {
  const {album} = route.params;
  const tablet = isTablet();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} testID="details-screen">
      <View style={[styles.heroContainer, tablet && styles.heroTablet]}>
        <Image
          source={{uri: album.artworkUrl100}}
          style={[styles.heroImage, tablet && styles.heroImageTablet]}
        />
        <View style={styles.heroTextContainer}>
          <Text style={styles.title}>{album.collectionName}</Text>
          <Text style={styles.artist}>{album.artistName}</Text>
          {album.primaryGenreName ? (
            <Text style={styles.genre}>{album.primaryGenreName}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Album Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Release Date</Text>
          <Text style={styles.value}>
            {new Date(album.releaseDate).toDateString()}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Track Count</Text>
          <Text style={styles.value}>{album.trackCount}</Text>
        </View>
        {album.country ? (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Country</Text>
            <Text style={styles.value}>{album.country}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: spacing.lg,
    backgroundColor: colors.background
  },
  heroContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg
  },
  heroTablet: {
    alignItems: 'center'
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 8
  },
  heroImageTablet: {
    width: 200,
    height: 200
  },
  heroTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary
  },
  artist: {
    fontSize: 16,
    marginTop: 4,
    color: colors.textSecondary
  },
  genre: {
    fontSize: 14,
    marginTop: 4,
    color: colors.textSecondary
  },
  infoSection: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14
  },
  value: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500'
  }
});

export default AlbumDetailsScreen;
