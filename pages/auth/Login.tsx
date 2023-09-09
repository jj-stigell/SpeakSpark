/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import {
  FormControl, VStack, Heading, Input, InputField, ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { JSX, useState } from 'react';
import React from 'react';
import { gql, useMutation, DocumentNode, ApolloError } from '@apollo/client';
import Notification, { Action } from './Notification';
import { useAppDispatch } from '../../redux/hooks';
import { setAccount } from '../../redux/features/accountSlice';

const LOGIN: DocumentNode = gql`
mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    user {
      id
    }
    token
  }
}`;

export default function Login(
  props: { navigation: any }
): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string, action: Action }>({
    message: '',
    action: 'success'
  });
  const emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  const dispatch = useAppDispatch();

  const [loginAccount, { data, loading }] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onError: (error: Error) => {
      if (error instanceof ApolloError) {
        setNotification({
          message: error.graphQLErrors[0].message,
          action: 'error'
        });
      } else {
        setNotification({
          message: error.message,
          action: 'error'
        });
      }
    },
    onCompleted: () => {
      //console.log(data);
      //props.setToken(data.login.token);
      //console.log('USER ID is', data.login.user.id);

      dispatch(setAccount({ isLoggedIn: true, account:
        { id: data.login.user.id, email, token: data.login.token }
      }));
    }
  });

  async function login(): Promise<void> {
    await loginAccount({ variables: { email, password } });
  }

  return (
    <FormControl p='$4' marginTop='$32'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>Login to SpeakSpark</Heading>
        </Center>
        { notification.message.length !== 0 && (
          <Notification message={notification.message} action={notification.action} />
        )}
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
          isDisabled={!emailRegex.test(email) || password.length == 0 || loading}
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
