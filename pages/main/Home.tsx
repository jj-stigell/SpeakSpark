import React, { JSX } from 'react';
import {
  FormControl, VStack, Heading, ButtonText, Text, Button, Center
} from '@gluestack-ui/themed';

import Card, { CardData } from '../../components/ChatCard';

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
  },
  {
    chatId: 'fgdfjgds98gsd0',
    name: '정은',
    nameRomaji: 'Jung-Eun',
    avatar: 'https://i.ibb.co/h7DJ1M3/jung-eun.png',
    language: 'ko',
    updatedAt: new Date('2023-12-01')
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home(props: { navigation: any }): JSX.Element {

  function navigateToChatId(chatId: string): void {
    props.navigation.navigate('Chat', { chatId });
  }

  return (
    <FormControl p='$4' marginTop='$12'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>SpeakSpark</Heading>
        </Center>
        <VStack space='xs'>
          <Text marginTop='$2'>Previous chats</Text>
          { previousChats.map((data: CardData) => (
            <Card
              key={data.chatId}
              chatId={data.chatId}
              name={data.name}
              nameRomaji={data.nameRomaji}
              avatar={data.avatar}
              language={data.language}
              updatedAt={data.updatedAt}
              onClick={navigateToChatId}
            />
          ))}
        </VStack>
        <Button onPress={(): void => props.navigation.navigate('NewChat')}>
          <ButtonText color='$white'>New chat</ButtonText>
        </Button>
        <Button onPress={(): void => props.navigation.navigate('Settings')}>
          <ButtonText color='$white'>Settings</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
