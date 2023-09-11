import React from 'react';
import {
  FormControl, VStack, Heading, ButtonText, Text, Button, Center
} from '@gluestack-ui/themed';

import { setStudyLanguage } from '../../redux/features/accountSlice';
import { useAppSelector } from '../../redux/hooks';
import LanguageSelector from '../../components/LanguageSelector';
import Card, { CardData } from '../../components/ChatCard';
import { RootState } from '../../redux/store';

const previousChats: Array<CardData> = [
  {
    chatId: '4534534534',
    name: 'はなこ',
    nameRomaji: 'Hanako',
    avatar: 'https://i.ibb.co/J3gBPyt/DALL-E-2023-09-11-16-27-46.png',
    language: 'jp',
    updatedAt: new Date('2022-01-01')
  },
  {
    chatId: 'dfgfdgdfgdfg',
    name: 'みさと',
    nameRomaji: 'Misato',
    avatar: 'https://i.ibb.co/PQ4z5KQ/misato.png',
    language: 'jp',
    updatedAt: new Date('2022-01-23')
  },
  {
    chatId: 'sd4wtdhghdfgdfg',
    name: 'たけし',
    nameRomaji: 'Takeshi',
    avatar: 'https://i.ibb.co/LrRJGh2/takeshi.png',
    language: 'jp',
    updatedAt: new Date('2022-12-01')
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NewChat(props: { navigation: any }): React.JSX.Element {
  const lang: string = useAppSelector((state: RootState) => state.account.account.studyLanguage);

  function newChat(chatId: string): void {
    props.navigation.navigate('Chat', { chatId, newChat: true });
  }

  return (
    <FormControl p='$4' marginTop='$12'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>Start a new chat</Heading>
        </Center>
        <VStack space='xs'>
          <Text>Chatting language</Text>
          <LanguageSelector language={lang} setLanguage={setStudyLanguage} />
          <Text marginTop='$2'>Chat buddies</Text>
          { previousChats.map((data: CardData) => (
            <Card
              key={data.chatId}
              chatId={data.chatId}
              name={data.name}
              nameRomaji={data.nameRomaji}
              avatar={data.avatar}
              language={data.language}
              updatedAt={data.updatedAt}
              onPress={newChat}
            />
          ))}
        </VStack>
        <Button marginTop='$16' onPress={(): void => props.navigation.navigate('Home')}>
          <ButtonText color='$white'>Back Home</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
