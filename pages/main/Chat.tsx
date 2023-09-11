/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React, { JSX, useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage, Bubble, BubbleProps } from 'react-native-gifted-chat';
import { View } from 'react-native';

import ChatHeader from '../../components/ChatHeader';

export default function Chat(props: { navigation: any, route: any  }): JSX.Element {
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'こんにちは、私の名前ははなこです。ゲームセンターや秋葉原が大好きで、日本のポップカルチャーに夢中です。よろしくお願いします。',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'はなこ',
          avatar: 'https://i.ibb.co/J3gBPyt/DALL-E-2023-09-11-16-27-46.png'
        }
      }
    ]);
  }, []);

  const onSend = useCallback((messages: Array<IMessage> = []) => {
    setMessages((previousMessages: Array<IMessage>) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  if (props.route?.params?.chatId) {
    console.log('chatting with existing chat id', props.route.params.chatId);
  }

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

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        name='はなこ'
        nameRomaji='Hanako'
        onBack={(): void => props.navigation.navigate('Home')}
      />
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages): void => onSend(messages)}
        user={{
          _id: 1
        }}
      />
    </View>
  );
}