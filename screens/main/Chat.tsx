/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React, { useState, useCallback } from 'react';
import { GiftedChat, IMessage, Bubble, BubbleProps, User } from 'react-native-gifted-chat';
import { View, TouchableOpacity } from 'react-native';
import { Toast as notification } from 'react-native-toast-notifications';
import { Ionicons } from '@expo/vector-icons';

import ChatHeader from '../../components/ActionHeader';
import Loader from '../../components/Loader';
import PlayButton from '../../components/PlayButton';
import GrammarModal from '../../components/GrammarModal';
import { NEW_CHAT, POST_MESSAGE } from '../../graphql/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Bot } from '../../redux/features/botSlice';
import { Message } from '../../redux/features/chatSlice';
import { GET_MESSAGES } from '../../graphql/queries';
import { Account } from '../../redux/features/accountSlice';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import { System } from '../../redux/features/systemSlice';
import { ColorScheme } from '../../utils/colors';

export interface CustomMessage extends IMessage {
  messageAudio: string
}

export default function Chat(props: { navigation: any, route: any  }): React.JSX.Element {
  const system: System = useAppSelector((state: RootState) => state.system);
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [grammarModalVisible, setGrammarModalVisible] = useState<boolean>(false);
  const [isTyping, setIstyping] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<CustomMessage | undefined>(undefined);
  const [chatId, setChatId] = React.useState<string>('');
  const [messages, setMessages] = useState<Array<CustomMessage>>([]);
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
          messageAudio: bot.welcomeAudio,
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

      const reply: CustomMessage = {
        _id: botReply.id,
        text: botReply.message,
        createdAt: botReply.createdAt,
        messageAudio: botReply.audio,
        user: botData
      };

      setMessages((previousMessages: Array<CustomMessage>) =>
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
            user: botData,
            messageAudio: bot.welcomeAudio
          }
        ]);
      } else {
        const formattedMessages: Array<CustomMessage> = messages.map((message: Message) => {
          return {
            _id: message.id,
            text: message.message,
            createdAt: message.createdAt,
            messageAudio: message.audio,
            user: message.role === 'BOT' ? botData : {
              _id: account.id
            }
          };
        });
        setMessages(GiftedChat.append([], formattedMessages));
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
      //console.log('existing chat id', chatId);
      //console.log('existing chat id', props.route.params.chatId);

      getMessages({ variables: { chatId: props.route.params.chatId } });
    } else {
      notification.show('Chat id missing, redirecting to home', { type: 'error' });
      setTimeout(() => {
        props.navigation.navigate('Home');
      }, 1000);
    }
  }, []);

  const onSend = useCallback(async (messages: Array<CustomMessage> = []) => {

    if (messages[0].text.length > 160) {
      notification.show(`Maximum message length is 160, your message is ${messages[0].text.length} characters long`, { type: 'warning' });
    }

    setMessages((previousMessages: Array<CustomMessage>) =>
      GiftedChat.append(previousMessages, messages)
    );
    setIstyping(true);
    //console.log('posting to id', props.route.params.chatId, 'and', chatId);

    await postMessage({ variables: {
      message: messages[0].text,
      chatId: chatId ?? props.route.params.chatId
    } }
    );
    setIstyping(false);
  }, []);

  function renderBubble(props: Readonly<BubbleProps<IMessage>>): JSX.Element {
    return (
      <View
        style={{ flex: 1, flexDirection: 'row' }}>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#7e8bed' //theme.chat.userBubble
            },
            left: {
              backgroundColor: '#ffe6a1' //theme.chat.botBubble
            }
          }}
        />
        { props.currentMessage?.user._id != account.id && props.currentMessage?._id && (
          <View style={{ flexDirection: 'column', marginLeft: 0 }}>
            <TouchableOpacity onPress={(): void => {
              setMessage(props.currentMessage as CustomMessage);
              setGrammarModalVisible(true);
            }}>
              <Ionicons
                name='information-circle'
                style={{
                  paddingRight: 8,
                  color: system.darkMode ? 'white' : 'black'
                }}
                size={34}
              />
            </TouchableOpacity>
            <PlayButton message={props.currentMessage as CustomMessage} />
          </View>
        ) }
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ marginTop: 300, alignItems: 'center' }}>
        <Loader loadingText='Loading chat..'/>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <GrammarModal
        message={message as IMessage}
        modalVisible={grammarModalVisible}
        setModalVisible={setGrammarModalVisible}
      />
      <ChatHeader
        title={bot.name === bot.nameRomaji ? bot.name : `${bot.name} - ${bot.nameRomaji}`}
        onBack={(): void => props.navigation.navigate('Home')}
      />
      <GiftedChat
        messages={messages}
        user={user}
        renderBubble={renderBubble}
        onSend={(messages): Promise<void> => onSend(messages as Array<CustomMessage>)}
        isTyping={isTyping}
        scrollToBottom={true}
      />
    </View>
  );
}
