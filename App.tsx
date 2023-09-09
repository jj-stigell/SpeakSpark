import React, { JSX } from 'react';
import { config, GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import Navigator from './Navigator';
import { persistor, store } from './redux/store';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://192.168.0.12:4000/graphql',
  cache: new InMemoryCache()
});

export default function App(): JSX.Element {
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
