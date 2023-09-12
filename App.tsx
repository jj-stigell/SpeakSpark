import React from 'react';
import {
  ApolloClient, ApolloLink, ApolloProvider,
  createHttpLink, InMemoryCache, NormalizedCacheObject
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { config, GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Navigator from './Navigator';
import { persistor, store } from './redux/store';
import { getFromStore } from './utils/expoStore';

const httpLink: ApolloLink = createHttpLink({
  uri: 'http://10.84.42.168:4000/graphql'
});

// eslint-disable-next-line @typescript-eslint/typedef
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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={client}>
            <GluestackUIProvider config={config.theme}>
              <Navigator/>
            </GluestackUIProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
