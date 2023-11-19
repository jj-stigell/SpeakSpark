/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React, { useEffect } from 'react';

import Loader from '../../components/Loader';
import { NEW_CHAT } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import i18n from '../../i18n';

// Creaters new chat and redirects to chat view with the new chat id.
export default function NewChatLoader(props: { navigation: any, route: any }): React.JSX.Element {
  const [newChat] = useMutation(NEW_CHAT, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      props.navigation.navigate('Chat', { bot: props.route?.params?.bot, chatId: data.newChat.id });
    }
  });

  useEffect(() => {
    setTimeout(() => {
      newChat({ variables: { botId: props.route.params.bot.id } });
    }, 3000);
  }, []);

  return (
    <Loader
      marginTop={10}
      loadingText={i18n.t('chat.loadingNewChat', { name: props.route.params.bot.name })}
    />
  );
}
