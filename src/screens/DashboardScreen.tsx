import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/RootNavigator';
import AlbumCard from '../components/AlbumCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import OfflineBanner from '../components/OfflineBanner';
import {useAlbums} from '../hooks/useAlbums';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC<Props> = ({navigation}) => {
  const {albums, loading, error, isOffline, refresh} = useAlbums();

  if (loading && albums.length === 0) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container} testID="dashboard-screen">
      <OfflineBanner visible={isOffline} />

      <View style={styles.header}>
        <Text style={styles.headerText}>Albums</Text>
        <Text style={styles.headerSubText}>
          Jack Johnson albums from iTunes API
        </Text>
      </View>

      {error ? <ErrorView message={error} /> : null}

      <FlatList
        data={albums}
        keyExtractor={item => item.collectionId.toString()}
        renderItem={({item}) => (
          <AlbumCard
            album={item}
            onPress={() =>
              navigation.navigate('AlbumDetails', {album: item})
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        contentContainerStyle={albums.length === 0 ? styles.emptyList : null}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.emptyText}>No albums available.</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary
  },
  headerSubText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: colors.textSecondary
  }
});

export default DashboardScreen;
