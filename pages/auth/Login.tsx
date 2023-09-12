/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import {
  FormControl, VStack, Heading, Input, InputField, ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { JSX, useState } from 'react';
import React from 'react';
import { gql, useMutation, DocumentNode, ApolloError } from '@apollo/client';

import { useAppDispatch } from '../../redux/hooks';
import { setAccount } from '../../redux/features/accountSlice';
import { validEmail } from '../../utils/validators';
import { saveToStore } from '../../utils/expoStore';
import Notification from '../../components/Notification';
import { setNotification } from '../../redux/features/notificationSlice';

const LOGIN: DocumentNode = gql`
mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    user {
      id
      darkMode
      uiLanguage
      studyLanguage
    }
    token
  }
}`;

export default function Login(props: { navigation: any }): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loginAccount, { data, loading }] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onError: (error: Error) => {
      if (error instanceof ApolloError) {
        dispatch(setNotification({ message: error.graphQLErrors[0].message,severity: 'error' }));
      } else {
        dispatch(setNotification({ message: error.message, severity: 'error' }));
      }
    },
    onCompleted: () => {
      saveToStore('jwt', data.login.token);
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
    await loginAccount({ variables: { email, password } });
  }

  return (
    <FormControl p='$4' marginTop='$32'>
      <Notification />
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>Login to SpeakSpark</Heading>
        </Center>
        <VStack space='xs'>
          <Text lineHeight='$xs'>Email</Text>
          <Input>
            <InputField
              type="text"
              defaultValue={email}
              onChangeText={setEmail}
            />
          </Input>
        </VStack>
        <VStack space='xs'>
          <Text lineHeight='$xs'>Password</Text>
          <Input>
            <InputField
              type='password'
              defaultValue={password}
              onChangeText={setPassword}
            />
          </Input>
        </VStack>
        <Button
          isDisabled={!validEmail(email) || password.length == 0 || loading}
          onPress={login}
        >
          {loading && <ButtonSpinner mr="$2" />}
          <ButtonText color='$white'>
            {loading ? 'Please wait' : 'Login'}
          </ButtonText>
        </Button>
        <Button
          onPress={(): void => props.navigation.navigate('Register')}
          isDisabled={loading}
          bgColor='#5adbb5'
        >
          <ButtonText color='$white'>Register new account</ButtonText>
        </Button>
        <Button
          onPress={(): void => console.log('GOOGLEEE')}
          isDisabled={loading}
          bgColor='#5adbb5'
        >
          <ButtonText color='$white'>
            Login with
            <Text style={{ color: '#4285F4' }}> G</Text>
            <Text style={{ color: '#EA4335' }}>o</Text>
            <Text style={{ color: '#FBBC05' }}>o</Text>
            <Text style={{ color: '#4285F4' }}>g</Text>
            <Text style={{ color: '#34A853' }}>l</Text>
            <Text style={{ color: '#EA4335' }}>e</Text>
          </ButtonText>
        </Button>
        <Button
          onPress={(): void => console.log('FACEBOOOOK')}
          isDisabled={loading}
          bgColor='#5adbb5'
        >
          <ButtonText color='$white'>
            Login with
            <Text style={{ color: '#1877F2' }}> Facebook</Text>
          </ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
