/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import {
  FormControl, VStack, Heading, Input, InputField, ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { JSX, useState } from 'react';
import React from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../../graphql/mutations';
import { useAppDispatch } from '../../redux/hooks';
import { setAccount } from '../../redux/features/accountSlice';
import { validEmail } from '../../utils/validators';
import { saveToStore } from '../../utils/expoStore';

export default function Login(props: { navigation: any }): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    await loginAccount({ variables: { email, password } });
  }

  return (
    <FormControl p='$4' marginTop='$32'>
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


/*

        <Button
          onPress={(): void => console.log('GOOGLEEE')}
          isDisabled={loading}
          bgColor='#4285F4' // Google blue color
          flexDirection="row" // Ensure contents of the button are in a row
          justifyContent="space-between"
          alignItems="center" // Vertically center the logo and text
        >
          <View
            style={{
              backgroundColor: '#FFFFFF',
              padding: 4, // Adjust as necessary
              borderRadius: 8 // Rounded corners, adjust as desired
            }}
          >
            <Image
              source={GoogleLogo}
              alt="Google Logo"
              width={24}
              height={24}
              //mr="$2"
              style={{ width: 20, height: 20, marginRight: 8 }} // Adjusted size and spacing
            />
          </View>
          <ButtonText color='$white'>
                    Login with Google
          </ButtonText>
        </Button>

*/
