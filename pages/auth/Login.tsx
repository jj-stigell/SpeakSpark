/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import {
  FormControl, VStack, Input, InputField,
  ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { JSX, useState } from 'react';
import React from 'react';
import { useMutation } from '@apollo/client';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import MainHeader from '../../components/MainHeader';
import { LOGIN } from '../../graphql/mutations';
import { useAppDispatch } from '../../redux/hooks';
import { setAccount } from '../../redux/features/accountSlice';
import { validEmail } from '../../utils/validators';
import { deleteFromStore, getFromStore, saveToStore } from '../../utils/expoStore';

export default function Login(props: { navigation: any }): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(Boolean(getFromStore('rememberMe')));

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
    if (rememberMe) {
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
      if (rememberMe) {
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
    <FormControl p='$4' marginTop='$12'>
      <VStack space='xl'>
        <Center>
          <MainHeader/>
        </Center>
        <VStack space='xs'>
          <Text lineHeight='$xs'>Email</Text>
          <Input isDisabled={loading}>
            <InputField
              type="text"
              defaultValue={email}
              onChangeText={setEmail}
            />
          </Input>
        </VStack>
        <VStack space='xs'>
          <Text lineHeight='$xs'>Password</Text>
          <Input isDisabled={loading}>
            <InputField
              type='password'
              defaultValue={password}
              onChangeText={setPassword}
            />
          </Input>
        </VStack>
        <BouncyCheckbox
          size={30}
          fillColor="green"
          text="Remember Me"
          isChecked={rememberMe}
          textStyle={{
            textDecorationLine: 'none'
          }}
          onPress={(isChecked: boolean): void => {
            setRememberMe(isChecked);
          }}
        />
        <Button
          isDisabled={!validEmail(email) || password.length == 0 || loading}
          onPress={login}
          bgColor='#3342b3'
        >
          {loading && <ButtonSpinner mr="$2" />}
          <ButtonText color='$white'>
            {loading ? 'Please wait' : 'Login'}
          </ButtonText>
        </Button>
        <Button
          onPress={(): void => props.navigation.navigate('Register')}
          isDisabled={loading}
          bgColor='#467af8'
        >
          <ButtonText color='$white'>Register new account</ButtonText>
        </Button>
        <Button
          onPress={(): void => console.log('GOOGLEEE')}
          isDisabled={loading}
          bgColor='#EA4335'
        >
          <ButtonText color='$white'>Login with Google</ButtonText>
        </Button>
        <Button
          onPress={(): void => console.log('FACEBOOOOK')}
          isDisabled={loading}
          bgColor='#1877F2'
        >
          <ButtonText color='$white'>Login with Facebook</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
