/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl, VStack, Heading, Input, InputField,
  ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { JSX, useState } from 'react';
import React from 'react';
import { gql, useMutation, DocumentNode, ApolloError } from '@apollo/client';

import Notification, { Action } from './Notification';
import { useAppDispatch } from '../../redux/hooks';
import { setAccount } from '../../redux/features/accountSlice';
import { validEmail } from '../../util';

const CREATE_ACCOUNT: DocumentNode = gql`
mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    user {
      id
    }
    token
  }
}`;

export default function Register({ navigation }: { navigation: any }): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string, action: Action }>({
    message: '',
    action: 'success'
  });

  const [createAccount, { data, loading }] = useMutation(CREATE_ACCOUNT, {
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
      setNotification({
        message: 'Account created succesfully. Logging in, please wait...',
        action: 'success'
      });
      setTimeout(() => {
        dispatch(setAccount({ isLoggedIn: true, account:
          { id: data.register.user.id, email, token: data.register.token }
        }));
      }, 1000);
    }
  });

  async function register(): Promise<void> {
    setNotification({
      message: '',
      action: 'success'
    });
    await createAccount({ variables: { email, password } });
  }

  return (
    <FormControl p='$4' marginTop='$32'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>Register new account to SpeakSpark</Heading>
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
        <VStack space='xs'>
          <Text lineHeight='$xs'>Confirm Password</Text>
          <Input>
            <InputField
              type='password'
              defaultValue={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </Input>
        </VStack>
        <Button
          isDisabled={
            !validEmail(email) || password.length == 0 ||
            loading || password !== confirmPassword
          }
          onPress={register}
        >
          {loading && <ButtonSpinner mr="$2" />}
          <ButtonText color='$white'>
            {loading ? 'Please wait' : 'Register'}
          </ButtonText>
        </Button>
        <Button
          onPress={(): void => navigation.navigate('Login')}
          bgColor='#5adbb5'
        >
          <ButtonText color='$white'>Already have an account?</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
