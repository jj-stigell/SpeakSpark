/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import {
  FormControl, VStack, Heading, Input, InputField, ButtonText, Text, Button, Center, ButtonSpinner
} from '@gluestack-ui/themed';
import React, { JSX, useState, useCallback, useEffect } from 'react';
import { gql, useMutation, DocumentNode } from '@apollo/client';
import { resetAccount } from '../../redux/features/accountSlice';
import { useAppDispatch } from '../../redux/hooks';
import { GiftedChat, IMessage, Bubble, BubbleProps } from 'react-native-gifted-chat';
import { InferProps, Validator, Requireable } from 'prop-types';
import { ViewStyle, StyleProp, TextStyle } from 'react-native';
import { View } from 'react-native';
import ChatHeader from '../../components/ChatHeader';

export default function Chat(props: { navigation: any  }): JSX.Element {
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
      <ChatHeader botName='はなこ' onBack={(): void => props.navigation.navigate('Home')}/>
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