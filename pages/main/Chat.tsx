/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React, { useState, useCallback } from 'react';
import { GiftedChat, IMessage, Bubble, BubbleProps, User } from 'react-native-gifted-chat';
import { Text, View } from 'react-native';
import { Toast as notification } from 'react-native-toast-notifications';

import ChatHeader from '../../components/ChatHeader';
import { NEW_CHAT, POST_MESSAGE } from '../../graphql/mutations';
import { ButtonSpinner } from '@gluestack-ui/themed';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Bot } from '../../redux/features/botSlice';
import { Message } from '../../redux/features/chatSlice';
import { GET_MESSAGES } from '../../graphql/queries';
import { Account } from '../../redux/features/accountSlice';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';

export default function Chat(props: { navigation: any, route: any  }): React.JSX.Element {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isTyping, setIstyping] = React.useState<boolean>(false);
  const [chatId, setChatId] = React.useState<string>('');
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const account: Account = useAppSelector(
    (state: RootState) => state.account.account);

  const bot: Bot = props.route?.params?.bot;
  const botData: User = {
    _id: bot.id,
    name: bot.name,
    avatar: bot.profileImage
  };

  const user: User = {
    _id: account.id
  };

  const [newChat] = useMutation(NEW_CHAT, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setChatId(data.newChat.id);
      setIstyping(false);
      setMessages([
        {
          _id: 1,
          text: bot.welcomeMessage,
          createdAt: new Date(),
          user: botData
        }
      ]);
      setLoading(false);
    }
  });

  const [postMessage] = useMutation(POST_MESSAGE, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      const botReply: Message = data.postMessage;

      const reply: IMessage = {
        _id: botReply.id,
        text: botReply.message,
        createdAt: botReply.createdAt,
        user: botData
      };

      setMessages((previousMessages: Array<IMessage>) =>
        GiftedChat.append(previousMessages, [reply])
      );
    }
  });

  const [getMessages] = useLazyQuery(GET_MESSAGES, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    onCompleted: (data) => {
      const messages: Array<Message> = data.getMessages;

      if (data.getMessages.length === 0) {
        setMessages([
          {
            _id: 1,
            text: bot.welcomeMessage,
            createdAt: new Date(),
            user: botData
          }
        ]);
      } else {
        const formattedMessages: Array<IMessage> = messages.map((message: Message) => {
          return {
            _id: message.id,
            text: message.message,
            createdAt: message.createdAt,
            user: message.role === 'BOT' ? botData : {
              _id: account.id
            }
          };
        });
        setMessages((previousMessages: Array<IMessage>) =>
          GiftedChat.append(previousMessages, formattedMessages)
        );
      }
      setLoading(false);
    }
  });

  React.useEffect(() => {
    if (props.route?.params?.newChat) {
      setIstyping(true);
      newChat({ variables: { botId: props.route.params.bot.id } });
    } else if (props.route?.params?.chatId) {
      setChatId(props.route.params.chatId);
      getMessages({ variables: { chatId: props.route.params.chatId } });
    } else {
      notification.show('Chat id missing, redirecting to home', { type: 'error' });
      setTimeout(() => {
        props.navigation.navigate('Register');
      }, 1000);
    }
  }, []);

  const onSend = useCallback(async (messages: Array<IMessage> = []) => {
    setMessages((previousMessages: Array<IMessage>) =>
      GiftedChat.append(previousMessages, messages)
    );
    setIstyping(true);
    await postMessage(
      { variables: { message: messages[0].text, chatId: chatId ?? props.route.params.chatId } }
    );
    setIstyping(false);
  }, []);

  function renderBubble(props: Readonly<BubbleProps<IMessage>>): JSX.Element {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#7e8bed'
          }
        }}
      />
    );
  }

  if (loading) {
    return (
      <View style={{ marginTop: 150, alignItems: 'center' }}>
        <ButtonSpinner mr="$2" />
        <Text style={{ marginTop: 20 }}>Loading chat</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        name={bot.name}
        nameRomaji={bot.nameRomaji}
        onBack={(): void => props.navigation.navigate('Home')}
      />
      <GiftedChat
        messages={messages}
        user={user}
        renderBubble={renderBubble}
        onSend={(messages): Promise<void> => onSend(messages)}
        isTyping={isTyping}
      />
    </View>
  );
}
