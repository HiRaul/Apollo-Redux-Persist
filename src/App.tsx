import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import HomePage from './app/components/HomePage/HomePage';
import { restorCache, apolloClient } from './app/graphql';
import { store } from './app/store';

const App = () => {
  const [loading, setLoading] = useState(true);

  const fetchCache = async () => {
    await restorCache();
    setLoading(false);
  };

  useEffect(() => {
    fetchCache();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <StatusBar />
        <HomePage />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
