/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  FormControl, VStack, Heading, ButtonText, Text, Button, Center
} from '@gluestack-ui/themed';

import BotList from '../../components/BotList';
import LanguageSelector from '../../components/LanguageSelector';
import { setStudyLanguage } from '../../redux/features/accountSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

export default function NewChat(props: { navigation: any }): React.JSX.Element {
  const language: string = useAppSelector(
    (state: RootState) => state.account.account.studyLanguage);

  return (
    <FormControl p='$4' marginTop='$12'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>Start a New Chat</Heading>
        </Center>
        <VStack space='xs'>
          <Text>Chat Language</Text>
          <LanguageSelector language={language} setLanguage={setStudyLanguage} />
          <Text marginTop='$2'>Chat Buddies</Text>
          <BotList navigation={props.navigation} />
        </VStack>
        <Button marginTop='$16' onPress={(): void => props.navigation.navigate('Home')}>
          <ButtonText color='$white'>Back Home</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
