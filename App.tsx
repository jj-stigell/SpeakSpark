import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { config, GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Notification from './components/Notification';
import Navigator from './Navigator';
import { client } from './graphql/client';
import { persistor, store } from './redux/store';

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
