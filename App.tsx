/* eslint-disable @typescript-eslint/typedef */
import React from 'react';
import {
  ApolloClient, ApolloLink, ApolloProvider,
  createHttpLink, from, InMemoryCache, NormalizedCacheObject
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { config, GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Navigator from './Navigator';
import Notification from './components/Notification';
import { persistor, store } from './redux/store';
import { setNotification } from './redux/features/notificationSlice';
import { getFromStore } from './utils/expoStore';

// More info on links: https://www.apollographql.com/docs/react/api/link/introduction
const httpLink: ApolloLink = createHttpLink({
  uri: 'http://192.168.0.12:4000/graphql'
});

const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
  let message = 'Error occured';
  if (graphQLErrors) {
    message = graphQLErrors[0].message;
  }

  if (networkError) {
    message = networkError.message;
  }

  store.dispatch(setNotification({
    message,
    severity: 'error'
  }));
});

const authLink: ApolloLink = setContext(async (_, { headers }) => {
  const token: string | null = await getFromStore('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={client}>
            <GluestackUIProvider config={config.theme}>
              <Notification />
              <Navigator/>
            </GluestackUIProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
