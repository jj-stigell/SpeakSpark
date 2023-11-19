import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './screens/auth/Register';
import Login from './screens/auth/Login';
import TermsAndConditions from './screens/auth/Tos';
import Home from './screens/main/Home';
import Chat from './screens/main/Chat';
import Settings from './screens/main/Settings';
import NewChat from './screens/main/SelectBot';
import NewChatLoader from './screens/main/NewChatLoader';

import { AuthContextType } from './context/AuthProvider';
import useAuth from './hooks/useAuth';
import { SystemContextType } from './context/SystemProvider';
import useSystem from './hooks/useSystem';

// eslint-disable-next-line @typescript-eslint/typedef
const Stack = createNativeStackNavigator();

export default function Navigator(): React.JSX.Element {
  const { theme }: SystemContextType = useSystem();
  const { auth }: AuthContextType = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={auth ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.primary
        }
      }}>
      { auth ?
        (
          <React.Fragment>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Chat" component={Chat}/>
            <Stack.Screen name="NewChatLoader" component={NewChatLoader}/>
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="NewChat" component={NewChat}/>
          </React.Fragment>
        ) :
        (
          <React.Fragment>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Tos" component={TermsAndConditions}/>
          </React.Fragment>
        )
      }
    </Stack.Navigator>
  );
}
