/* eslint-disable @typescript-eslint/typedef */
import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { Center } from '@gluestack-ui/themed';
import { Toast as notification } from 'react-native-toast-notifications';
import { useMutation } from '@apollo/client';

import Button from '../../components/Button';
import MainHeader from '../../components/MainHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { saveToStore } from '../../utils/expoStore';
import { CREATE_ACCOUNT } from '../../graphql/mutations';
import { setAccount } from '../../redux/features/accountSlice';
import { validEmail } from '../../utils/validators';
import { RootState } from '../../redux/store';
import { ColorScheme } from '../../utils/colors';
import ThirdPartyButton from '../../components/ThirdPartyButton';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Register({ navigation }: { navigation: any }): React.JSX.Element {
  const dispatch = useAppDispatch();
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [createAccount, { data, loading }] = useMutation(CREATE_ACCOUNT, {
    errorPolicy: 'all',
    onCompleted: () => {
      notification.show(
        'Account created succesfully. Logging in, please wait...', { type: 'success' }
      );
      setTimeout(() => {
        saveToStore('token', data.register.token);
        dispatch(setAccount({
          id: data.register.user.id,
          email,
          uiLanguage: data.login.user.uiLanguage,
          studyLanguage: data.login.user.studyLanguage
        }));
      }, 1000);
    }
  });

  async function register(): Promise<void> {
    await createAccount({ variables: { email, password } });
  }

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
            }}>Create New Account</Text>
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
              placeholderTextColor={theme.disabled}
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
              placeholderTextColor={theme.disabled}
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
        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            marginVertical: 8,
            color: theme.font.primary
          }}>Confirm Password</Text>
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
              placeholder='Confirm your password'
              placeholderTextColor={theme.disabled}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={!showPasswordConfirmation}
              style={{
                width: '100%',
                color: theme.font.primary
              }}
            />
            <TouchableOpacity
              onPress={(): void => setShowPasswordConfirmation(!showPasswordConfirmation)}
              style={{
                position: 'absolute',
                right: 12
              }}
            >
              {
                !showPasswordConfirmation ?
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
            color={isChecked ? theme.background.secondary : undefined}
          />
          <Text style={{ color: theme.font.primary }}>I agree to the </Text>
          <TouchableOpacity onPress={(): void => navigation.navigate('Tos')}>
            <Text style={{ color: theme.font.primary, textDecorationLine: 'underline' }}>
              terms and conditions
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title={loading ? 'Registering, please wait...' : 'Sign Up'}
          onPress={register}
          disabled={!isChecked || loading || password !== confirmPassword || !validEmail(email)}
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
          <Text style={{ fontSize: 14, color: theme.font.primary }}>Or Sign up with</Text>
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
          <Text style={{ fontSize: 16, color: theme.font.primary }}>Already have an account</Text>
          <Pressable onPress={(): void => navigation.navigate('Login')}>
            <Text style={{
              fontSize: 16,
              color: '#007260',
              fontWeight: 'bold',
              marginLeft: 6
            }}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
