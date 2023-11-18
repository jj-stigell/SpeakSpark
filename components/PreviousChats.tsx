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
import i18n from '../i18n';
import { SystemContextType } from '../context/SystemProvider';
import useSystem from '../hooks/useSystem';

export default function PreviousChats(props: { navigation: any }): React.JSX.Element {
  const [chats, setChats] = React.useState<Array<Chat>>([]);
  const { auth }: AuthContextType = useAuth();
  const { theme }: SystemContextType = useSystem();

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
    notification.show(i18n.t('previousChats.updated'), { type: 'success' });
  }

  return (
    <View>
      <Text style={{ marginTop: 2, fontSize: 18, textAlign: 'center', color: theme.font.primary }}>
        {i18n.t('previousChats.title')}
      </Text>
      <Text style={{ marginTop: 5, fontSize: 16, textAlign: 'center', color: theme.font.primary  }}>
        {i18n.t('previousChats.subtitle')}
        {getLabelByValue(auth!.studyLanguage, studyLanguages, 'label') + ' - '}
        {getLabelByValue(auth!.studyLanguage, studyLanguages, 'english')}
      </Text>
      <ScrollView style={{ height: 400, marginTop: 5 }}>
        { loading ? (
          <Loader marginTop={90} loadingText={i18n.t('previousChats.loading')} />
        ) : (
          chats.length === 0 || error ? (
            <React.Fragment>
              <Text style={{ marginTop: 90, textAlign: 'center' }}>
                {i18n.t('previousChats.noPreviousChats')}
              </Text>
              <Pressable onPress={updateChats}>
                <Text
                  style={{
                    marginTop: 20,
                    textAlign: 'center',
                    textDecorationLine: 'underline'
                  }}>{i18n.t('previousChats.refetch')}</Text>
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
