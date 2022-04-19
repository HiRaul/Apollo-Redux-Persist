import { ApolloClient, InMemoryCache } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, CachePersistor } from 'apollo3-cache-persist';

const cache = new InMemoryCache({});

const persistor = new CachePersistor({
  cache,
  storage: new AsyncStorageWrapper(AsyncStorage),
});

export const apolloClient = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export const restorCache = async () => {
  await persistor.restore();
  apolloClient.onClearStore(async () => {
    await persistor.purge();
  });
};
