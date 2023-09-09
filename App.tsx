import React, { JSX } from 'react';
import { config, GluestackUIProvider } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject } from '@apollo/client';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// eslint-disable-next-line @typescript-eslint/typedef
const Stack = createNativeStackNavigator();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://192.168.0.12:4000/graphql',
  cache: new InMemoryCache()
});

export default function App(): JSX.Element {

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <GluestackUIProvider config={config.theme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Register"
              component={Register}
            />
          </Stack.Navigator>
        </GluestackUIProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
}
