import React, { JSX } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './screens/auth/Register';
import Login from './screens/auth/Login';
import TermsAndConditions from './screens/auth/Tos';
import Home from './screens/main/Home';
import Chat from './screens/main/Chat';
import Settings from './screens/main/Settings';
import NewChat from './screens/main/SelectBot';

import { RootState } from './redux/store';
import { useAppSelector } from './redux/hooks';
import { ColorScheme } from './redux/features/systemSlice';

// eslint-disable-next-line @typescript-eslint/typedef
const Stack = createNativeStackNavigator();

export default function Navigator(): JSX.Element {
  const isLoggedIn: boolean = useAppSelector((state: RootState) => state.account.isLoggedIn);
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.primary
        }
      }}>
      { isLoggedIn ?
        (
          <React.Fragment>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Chat" component={Chat}/>
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
