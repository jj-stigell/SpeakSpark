/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '@gluestack-ui/themed';
import { useQuery } from '@apollo/client';

import Card from '../components/ChatCard';
import Loader from './Loader';
import { GET_LATEST_CHATS } from '../graphql/queries';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { Chat } from '../redux/features/chatSlice';
import { Bot } from '../redux/features/botSlice';

export default function PreviousChats(props: { navigation: any }): React.JSX.Element {
  const [chats, setChats] = React.useState<Array<Chat>>([]);
  const language: string = useAppSelector(
    (state: RootState) => state.account.account.studyLanguage);

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
      <View style={{ marginTop: 90, marginBottom: 200, alignItems: 'center' }}>
        <Loader loadingText='Loading previous chats'/>
      </View>
    );
  }

  return (
    <View>
      <Text marginTop='$2'>Latest Chats</Text>
      <ScrollView style={{ height: 450 }}>
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
    </View>
  );
}
