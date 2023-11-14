/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { Toast as notification } from 'react-native-toast-notifications';

import Card from '../components/ChatCard';
import Loader from './Loader';
import { GET_LATEST_CHATS } from '../graphql/queries';
import { getLabelByValue, studyLanguages } from '../utils/languages';
import { AuthContextType } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import { Bot, Chat } from '../type';

export default function PreviousChats(props: { navigation: any }): React.JSX.Element {
  const [chats, setChats] = React.useState<Array<Chat>>([]);
  const { auth }: AuthContextType = useAuth();

  const { data, loading, error, refetch } = useQuery(GET_LATEST_CHATS, {
    variables: { language: auth!.studyLanguage },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    onCompleted: () => {
      setChats(data.chats);
    }
  });

  function navigateToChatId(bot: Bot, chatId: string): void {
    props.navigation.navigate('Chat', { bot, chatId });
  }

  async function updateChats(): Promise<void> {
    await refetch();
    notification.show('Chats updated!', { type: 'success' });
  }

  return (
    <View>
      <Text style={{ marginTop: 2, fontSize: 18, textAlign: 'center' }}>
        Latest Chats - Click to continue chatting
      </Text>
      <Text style={{ marginTop: 5, fontSize: 16, textAlign: 'center' }}>
        Studying {getLabelByValue(auth!.studyLanguage, studyLanguages, 'label') + ' - '}
        {getLabelByValue(auth!.studyLanguage, studyLanguages, 'english')}
      </Text>
      <ScrollView style={{ height: 400, marginTop: 5 }}>
        { loading ? (
          <Loader marginTop={90} loadingText='Loading previous chats...'/>
        ) : (
          chats.length === 0 || error ? (
            <React.Fragment>
              <Text style={{ marginTop: 90, textAlign: 'center' }}>
                No previous chats found for the language, click "New Chat"
                button to start a new chat.
              </Text>
              <Pressable onPress={updateChats}>
                <Text
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    textDecorationLine: 'underline'
                  }}>Click to refetch chats</Text>
              </Pressable>
            </React.Fragment>
          ) : (
            chats.map((data: Chat) => (
              <Card
                key={data.id}
                chatId={data.id}
                bot={data.bot}
                updatedAt={data.updatedAt}
                onPress={navigateToChatId}
              />
            ))
          )
        )}
      </ScrollView>
    </View>
  );
}
