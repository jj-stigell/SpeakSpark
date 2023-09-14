import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { config, GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-native-toast-notifications';
import { PersistGate } from 'redux-persist/integration/react';

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
              <ToastProvider
                placement='top'
                animationType='slide-in'
                offsetTop={50}
                swipeEnabled={true}
                duration={5000}
              >
                <Navigator/>
              </ToastProvider>
            </GluestackUIProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
