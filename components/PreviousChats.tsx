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
import { getLabelByValue, studyLanguages } from '../utils/languages';

export default function PreviousChats(props: { navigation: any }): React.JSX.Element {
  const [chats, setChats] = React.useState<Array<Chat>>([]);
  const language: string = useAppSelector(
    (state: RootState) => state.account.account.studyLanguage);

  const { data, loading, error } = useQuery(GET_LATEST_CHATS, {
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

  return (
    <View>
      <Text marginTop='$2' style={{ fontSize: 20, textAlign: 'center' }}>Latest Chats</Text>
      <Text marginTop='$2' style={{ fontSize: 16, textAlign: 'center' }}>
        Studying {getLabelByValue(language, studyLanguages, 'label') + ' - '}
        {getLabelByValue(language, studyLanguages, 'english')}
      </Text>
      <ScrollView style={{ height: 440 }}>
        { loading ?
          <View style={{ marginTop: 90, alignItems: 'center' }}>
            <Loader loadingText='Loading previous chats...'/>
          </View>
          :
          chats.length === 0 || error ?
            <Text style={{ marginTop: 90, textAlign: 'center' }}>
              No previous chats found for the language, click "New Chat" button to start a new chat.
            </Text>
            :
            chats.map((data: Chat) => (
              <Card
                key={data.id}
                chatId={data.id}
                bot={data.bot}
                updatedAt={data.updatedAt}
                onPress={navigateToChatId}
              />
            ))
        }
      </ScrollView>
    </View>
  );
}
