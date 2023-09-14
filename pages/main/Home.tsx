/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React from 'react';
import {
  FormControl, VStack, Heading, ButtonText,
  Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import { useQuery } from '@apollo/client';

import Card from '../../components/ChatCard';
import { GET_LATEST_CHATS } from '../../graphql/queries';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { Chat } from '../../redux/features/chatSlice';
import { ScrollView, View } from 'react-native';
import { Bot } from '../../redux/features/botSlice';

export default function Home(props: { navigation: any }): React.JSX.Element {
  const language: string = useAppSelector(
    (state: RootState) => state.account.account.studyLanguage);

  const [chats, setChats] = React.useState<Array<Chat>>([]);

  const { data, loading } = useQuery(GET_LATEST_CHATS, {
    variables: { language },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    onCompleted: () => {
      setChats(data.chats);
    }
  });

  function navigateToChatId(bot: Bot, chatId: string): void {
    props.navigation.navigate('Chat', { bot, chatId });

  }

  if (loading) {
    return (
      <View style={{ marginTop: 90, alignItems: 'center' }}>
        <ButtonSpinner mr="$2" />
        <Text style={{ marginTop: 20 }}>Loading previous chats</Text>
      </View>
    );
  }

  return (
    <FormControl p='$4' marginTop='$12'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>SpeakSpark</Heading>
        </Center>
        <VStack space='xs'>
          <Text marginTop='$2'>Latest Chats</Text>
          <ScrollView>
            { chats.length === 0 ?
              <Text>No previous chats found for the language</Text>
              :
              chats.map((data: Chat) => (
                <Card
                  key={data.id}
                  chatId={data.id}
                  bot={data.bot}
                  updatedAt={data.updatedAt}
                  onPress={navigateToChatId}
                />
              ))}
          </ScrollView>
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
