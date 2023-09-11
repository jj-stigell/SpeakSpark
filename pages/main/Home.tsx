/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import {
  FormControl, VStack, Heading, Input, InputField, ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { JSX, useState } from 'react';
import React from 'react';
import { gql, useMutation, DocumentNode } from '@apollo/client';
import { resetAccount } from '../../redux/features/accountSlice';
import { useAppDispatch } from '../../redux/hooks';

const LOGIN: DocumentNode = gql`
mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    user {
      id
    }
    token
  }
}`;

export default function Home(props: { navigation: any }): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const dispatch = useAppDispatch();


  const [loginAccount, { data, loading }] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onError: (_error: Error) => {

    },
    onCompleted: () => {
      console.log(data);
      console.log('JWT token is', data.login.token);
      console.log('USER ID is', data.login.user.id);
    }
  });

  async function logout(): Promise<void> {
    dispatch(resetAccount());
  }

  return (
    <FormControl p='$4' marginTop='$32'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>
            Home to SpeakSpark
          </Heading>
        </Center>
        <VStack space='xs'>
          <Text lineHeight='$xs'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
             incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                 sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </VStack>
        <Button onPress={(): void => props.navigation.navigate('Chat')}>
          <ButtonText color='$white'>Chat</ButtonText>
        </Button>
        <Button onPress={(): void => props.navigation.navigate('Settings')}>
          <ButtonText color='$white'>Settings</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
