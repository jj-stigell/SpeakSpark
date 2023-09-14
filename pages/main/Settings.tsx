import React from 'react';
import {
  FormControl, VStack, Heading, ButtonText,
  Text, Button, Center, HStack, Switch
} from '@gluestack-ui/themed';
import { AnyAction, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import LanguageSelector from '../../components/LanguageSelector';
import {
  Account, resetAccount, setUiLanguage, toggleDarkMode
} from '../../redux/features/accountSlice';
import { resetBots } from '../../redux/features/botSlice';
import { resetChats } from '../../redux/features/chatSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { deleteFromStore } from '../../utils/expoStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Settings({ navigation }: { navigation: any }): React.JSX.Element {
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const account: Account = useAppSelector((state: RootState) => state.account.account);

  async function logout(): Promise<void> {
    deleteFromStore('jwt').then(() => {
      dispatch(resetAccount());
      dispatch(resetBots());
      dispatch(resetChats());
    });
  }

  return (
    <FormControl p='$4' marginTop='$32'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md' marginBottom='$4'>Settings</Heading>
        </Center>
        <VStack space='xs'>
          <HStack space="md" marginBottom='$1' alignItems='center'>
            <Text size="lg">Email: {account.email}</Text>
          </HStack>
        </VStack>
        <VStack space='xs'>
          <HStack space="md" marginBottom='$1' alignItems='center'>
            <Switch
              value={account.darkMode}
              onToggle={(): PayloadAction<undefined, string> => dispatch(toggleDarkMode())}
            />
            <Text size="lg">Dark mode</Text>
          </HStack>
        </VStack>
        <VStack space='xs' marginBottom='$5'>
          <Text size="lg">UI Language</Text>
          <LanguageSelector language={account.uiLanguage} setLanguage={setUiLanguage} />
        </VStack>
        <Button onPress={(): void => navigation.navigate('Home')} marginBottom='$5'>
          <ButtonText color='$white'>Go Back</ButtonText>
        </Button>
        <Button onPress={logout}>
          <ButtonText color='$white'>logout</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
