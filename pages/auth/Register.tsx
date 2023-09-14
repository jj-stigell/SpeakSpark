/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  FormControl, VStack, Heading, Input, InputField,
  ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { Toast as notification } from 'react-native-toast-notifications';

import { CREATE_ACCOUNT } from '../../graphql/mutations';
import { useAppDispatch } from '../../redux/hooks';
import { setAccount } from '../../redux/features/accountSlice';
import { validEmail } from '../../utils/validators';
import { saveToStore } from '../../utils/expoStore';

export default function Register({ navigation }: { navigation: any }): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

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
