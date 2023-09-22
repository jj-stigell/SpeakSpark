/* eslint-disable @typescript-eslint/typedef */
import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { Center } from '@gluestack-ui/themed';
import { useMutation } from '@apollo/client';

import Button from '../../components/Button';
import MainHeader from '../../components/MainHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteFromStore, getFromStore, saveToStore } from '../../utils/expoStore';
import { LOGIN } from '../../graphql/mutations';
import { setAccount } from '../../redux/features/accountSlice';
import { validEmail } from '../../utils/validators';
import { RootState } from '../../redux/store';
import { ColorScheme } from '../../utils/colors';
import ThirdPartyButton from '../../components/ThirdPartyButton';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Login({ navigation }: { navigation: any }): React.JSX.Element {
  const dispatch = useAppDispatch();
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(Boolean(getFromStore('rememberMe')));

  const [loginAccount, { data, loading }] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onCompleted: () => {
      saveToStore('token', data.login.token);
      dispatch(setAccount({
        id: data.login.user.id,
        email,
        uiLanguage: data.login.user.uiLanguage,
        studyLanguage: data.login.user.studyLanguage
      }));
    }
  });

  async function login(): Promise<void> {
    if (isChecked) {
      await saveToStore('email', email);
      await saveToStore('password', password);
      await saveToStore('rememberMe', 'true');
    } else {
      await deleteFromStore('email');
      await deleteFromStore('password');
      await deleteFromStore('rememberMe');
    }
    await loginAccount({ variables: { email, password } });
  }

  React.useEffect(() => {
    // eslint-disable-next-line func-style
    const setCreds = async (): Promise<void> => {
      if (isChecked) {
        const email: string | null = await getFromStore('email');
        const password: string | null = await getFromStore('password');

        if (email)
          setEmail(email);
        if (password)
          setPassword(password);
      }
    };
    setCreds();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center>
        <MainHeader/>
      </Center>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Center>
            <Text style={{
              fontSize: 17,
              color: theme.font.primary
            }}>Login to existing account</Text>
          </Center>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            marginVertical: 8,
            color: theme.font.primary
          }}>Email address</Text>
          <View style={{
            width: '100%',
            height: 48,
            borderColor: theme.container.border,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Enter your email address'
              placeholderTextColor={theme.font.primary}
              onChangeText={setEmail}
              value={email}
              keyboardType='email-address'
              style={{
                width: '100%',
                color: theme.font.primary
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            marginVertical: 8,
            color: theme.font.primary
          }}>Password</Text>
          <View style={{
            width: '100%',
            height: 48,
            borderColor: theme.container.border,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={theme.font.primary}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              style={{
                width: '100%',
                color: theme.font.primary
              }}
            />
            <TouchableOpacity
              onPress={(): void => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 12
              }}
            >
              {
                !showPassword ?
                  (<Ionicons name="eye-off" size={24} color={theme.font.primary}/>) :
                  (<Ionicons name="eye" size={24} color={theme.font.primary}/>)
              }
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          marginVertical: 6
        }}>
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? theme.checkbox : undefined}
          />
          <Text style={{ color: theme.font.primary }}>Remember me</Text>
        </View>
        <Button
          title={loading ? 'Logging in, please wait...' : 'Login'}
          onPress={login}
          disabled={loading || password.length === 0 || !validEmail(email)}
          style={{
            marginTop: 18,
            marginBottom: 4
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.font.primary,
              marginHorizontal: 10
            }}
          />
          <Text style={{ fontSize: 14, color: theme.font.primary }}>Or Login with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.font.primary,
              marginHorizontal: 10
            }}
          />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <ThirdPartyButton title='Facebook' image={require('../../assets/image/facebook.png')}/>
          <ThirdPartyButton title='Google' image={require('../../assets/image/google.png')}/>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 22
        }}>
          <Text style={{ fontSize: 16, color: theme.font.primary }}>Don't have an account?</Text>
          <Pressable
            onPress={(): void => navigation.navigate('Register')}
          >
            <Text style={{
              fontSize: 16,
              color: '#007260',
              fontWeight: 'bold',
              marginLeft: 6
            }}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
