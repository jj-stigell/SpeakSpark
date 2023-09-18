/* eslint-disable @typescript-eslint/typedef */
import React, { useState } from 'react';
import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { Center } from '@gluestack-ui/themed';
import { useMutation } from '@apollo/client';

import Button from '../../components/Button';
import MainHeader from '../../components/MainHeader';
import { COLORS } from '../../components/constants/colors';
import { useAppDispatch } from '../../redux/hooks';
import { deleteFromStore, getFromStore, saveToStore } from '../../utils/expoStore';
import { LOGIN } from '../../graphql/mutations';
import { setAccount } from '../../redux/features/accountSlice';
import { validEmail } from '../../utils/validators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Login({ navigation }: { navigation: any }): React.JSX.Element {
  const dispatch = useAppDispatch();

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
        darkMode: data.login.user.darkMode,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'F5FCFF' }}>
      <Center>
        <MainHeader/>
      </Center>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Center>
            <Text style={{
              fontSize: 17,
              color: COLORS.black
            }}>Login to existing account</Text>
          </Center>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            marginVertical: 8
          }}>Email address</Text>
          <View style={{
            width: '100%',
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Enter your email address'
              placeholderTextColor={COLORS.black}
              onChangeText={setEmail}
              value={email}
              keyboardType='email-address'
              style={{
                width: '100%'
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            marginVertical: 8
          }}>Password</Text>
          <View style={{
            width: '100%',
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              style={{
                width: '100%'
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
                  (<Ionicons name="eye-off" size={24} color={COLORS.black}/>) :
                  (<Ionicons name="eye" size={24} color={COLORS.black}/>)
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
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text>Remember me</Text>
        </View>
        <Button
          title={loading ? 'Logging in, please wait...' : 'Login'}
          onPress={login}
          disabled={loading || password.length === 0 || !validEmail(email)}
          filled
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
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
          <Text style={{ fontSize: 14 }}>Or Login with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            onPress={(): void => console.log('Facebook Pressed')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}
          >
            <Image
              source={require('../../assets/image/facebook.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode='contain'
            />
            <Text>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(): void => console.log('Google Pressed')}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}
          >
            <Image
              source={require('../../assets/image/google.png')}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode='contain'
            />
            <Text>Google</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 22
        }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account?</Text>
          <Pressable
            onPress={(): void => navigation.navigate('Register')}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: 'bold',
              marginLeft: 6
            }}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
