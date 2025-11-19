import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {Album} from '../types/album';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {layout} from '../theme/layout';

interface Props {
  album: Album;
  onPress: () => void;
}

const AlbumCard: React.FC<Props> = ({album, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} testID="album-card">
      <Image source={{uri: album.artworkUrl100}} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {album.collectionName}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {album.artistName}
        </Text>
        {album.primaryGenreName ? (
          <Text style={styles.genre}>{album.primaryGenreName}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: layout.cardRadius,
    padding: layout.cardPadding,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.md,
    elevation: layout.elevation
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary
  },
  artist: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4
  },
  genre: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4
  }
});

export default AlbumCard;
