/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl, VStack, Heading, Input, InputField,
  ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { JSX, useState } from 'react';
import React from 'react';
import { gql, useMutation, DocumentNode, ApolloError } from '@apollo/client';

import { useAppDispatch } from '../../redux/hooks';
import { setAccount } from '../../redux/features/accountSlice';
import { validEmail } from '../../utils/validators';
import { saveToStore } from '../../utils/expoStore';
import { setNotification } from '../../redux/features/notificationSlice';
import Notification from '../../components/Notification';

const CREATE_ACCOUNT: DocumentNode = gql`
mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    user {
      id
      darkMode
      uiLanguage
      studyLanguage
    }
    token
  }
}`;

export default function Register({ navigation }: { navigation: any }): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [createAccount, { data, loading }] = useMutation(CREATE_ACCOUNT, {
    errorPolicy: 'all',
    onError: (error: Error) => {
      if (error instanceof ApolloError) {
        dispatch(setNotification({ message: error.graphQLErrors[0].message, severity: 'error' }));
      } else {
        dispatch(setNotification({ message: error.message, severity: 'error' }));
      }
    },
    onCompleted: () => {
      dispatch(setNotification({
        message: 'Account created succesfully. Logging in, please wait...',
        severity: 'success'
      }));
      setTimeout(() => {
        saveToStore('jwt', data.register.token);
        dispatch(setAccount({
          id: data.register.user.id,
          email,
          darkMode: data.login.user.darkMode,
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
    <FormControl p='$4' marginTop='$32'>
      <Notification />
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>Register new account to SpeakSpark</Heading>
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

/*
        { notification.message.length !== 0 && (
          <Notification message={notification.message} action={notification.action} />
        )}
*/
