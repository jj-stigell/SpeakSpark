import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { StatusBar, SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';

import AuthProvider from './context/AuthProvider';
import Navigator from './Navigator';
import SystemProvider from './context/SystemProvider';
import { client } from './graphql/client';

function ThemedStatusBar(): React.JSX.Element {
  return (
    <View style={{ height: StatusBar.currentHeight, backgroundColor: '#6e6e6e' }}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor='#6e6e6e'/>
      </SafeAreaView>
    </View>
  );
}

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <AuthProvider>
          <SystemProvider>
            <React.Fragment>
              <ThemedStatusBar/>
              <ToastProvider
                placement='top'
                animationType='slide-in'
                offsetTop={50}
                swipeEnabled={true}
                duration={5000}
              >
                <Navigator/>
              </ToastProvider>
            </React.Fragment>
          </SystemProvider>
        </AuthProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
}
