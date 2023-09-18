import React, { JSX } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import TermsAndConditions from './pages/auth/Tos';
import Home from './pages/main/Home';
import Chat from './pages/main/Chat';
import Settings from './pages/main/Settings';
import NewChat from './pages/main/SelectBot';

import { RootState } from './redux/store';
import { useAppSelector } from './redux/hooks';

// eslint-disable-next-line @typescript-eslint/typedef
const Stack = createNativeStackNavigator();

export default function Navigator(): JSX.Element {
  const isLoggedIn: boolean = useAppSelector((state: RootState) => state.account.isLoggedIn);

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor:'#F5FCFF' }
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
