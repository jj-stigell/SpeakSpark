/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import {
  FormControl, VStack, Heading, Input, InputField, ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { JSX, useState } from 'react';
import React from 'react';

export default function Login({ navigation }: { navigation: any }): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  async function login(): Promise<void> {
    setLoading(true);
    console.log('loggin in!!!');
    console.log('email', email);
    console.log('password', password);
    setLoading(false);
  }

  return (
    <FormControl p='$4' marginTop='$32'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>
            Login to Yomiko
          </Heading>
        </Center>
        <VStack space='xs'>
          <Text lineHeight='$xs'>
            Email
          </Text>
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
          onPress={(): void => navigation.navigate('Register')}
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
