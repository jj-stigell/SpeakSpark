import React, { JSX } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/main/Home';
import { RootState } from './redux/store';
import { useAppSelector } from './redux/hooks';

// eslint-disable-next-line @typescript-eslint/typedef
const Stack = createNativeStackNavigator();

export default function Navigator(): JSX.Element {
  const isLoggedIn: boolean = useAppSelector((state: RootState) => state.account.isLoggedIn);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      { isLoggedIn ?
        (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
            />
          </>
        ) :
        (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Register"
              component={Register}
            />
          </>
        )
      }
    </Stack.Navigator>
  );
}
