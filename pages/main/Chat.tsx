/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React, { useState, useCallback } from 'react';
import { GiftedChat, IMessage, Bubble, BubbleProps, User } from 'react-native-gifted-chat';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Toast as notification } from 'react-native-toast-notifications';
import { Audio } from 'expo-av';

import ChatHeader from '../../components/ChatHeader';
import { NEW_CHAT, POST_MESSAGE } from '../../graphql/mutations';
import { ButtonSpinner } from '@gluestack-ui/themed';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Bot } from '../../redux/features/botSlice';
import { Message } from '../../redux/features/chatSlice';
import { GET_MESSAGE, GET_MESSAGES } from '../../graphql/queries';
import { Account } from '../../redux/features/accountSlice';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../redux/hooks';
import GrammarModal from '../../components/GrammarModal';

export default function Chat(props: { navigation: any, route: any  }): React.JSX.Element {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isTyping, setIstyping] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<IMessage | undefined>(undefined);
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
        setMessages(GiftedChat.append([], formattedMessages));
      }
      setLoading(false);
    }
  });

  const [getMessage] = useLazyQuery(GET_MESSAGE, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
    /*
    onCompleted: async (data) => {
      const { sound } = await Audio.Sound.createAsync({ uri: data.getMessage.audio });
      await sound.playAsync();
    }
    */
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

  async function playAudio(messageId: string | number | undefined): Promise<void> {
    if (!messageId) {
      return;
    }
    console.log('fetching audio', messageId);
    // Wrap the query in a promise
    const fetchMessage = new Promise((resolve, reject) => {
      getMessage({
        variables: { messageId: String(messageId) },
        onCompleted: (data) => resolve(data.getMessage),
        onError: (error) => reject(error)
      });
    });

    try {
      const message: Message = await fetchMessage as Message;
      console.log('playing audio', messageId);
      if (message && message.audio) {
        const { sound } = await Audio.Sound.createAsync({ uri: message.audio });
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error fetching or playing audio:', error);
    }
  }

  function renderBubble(props: Readonly<BubbleProps<IMessage>>): JSX.Element {
    //console.log(props.currentMessage?._id);
    return (
      <View
        style={{ flex: 1, flexDirection: 'row' }}>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#7e8bed' // User bubble color.
            },
            left: {
              backgroundColor: '#ffe6a1' // Bot bubble color.
            }
          }}
        />
        { props.currentMessage?.user._id != account.id && (
          <View style={{ flexDirection: 'column', marginLeft: 0 }}>
            <TouchableOpacity onPress={(): void => {
              if (props.currentMessage && props.currentMessage._id) {
                setMessage(message);
                setModalVisible(true);
              }
            }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginTop: 'auto',
                  marginBottom: 10,  // spacing between the buttons
                  bottom: 0
                }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/5387/5387375.png'
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={(): Promise<void> => playAudio(props.currentMessage?._id)}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginTop: 'auto',
                  bottom: 0
                }}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/1024px-Speaker_Icon.svg.png'
                }}
              />
            </TouchableOpacity>
          </View>
        ) }
      </View>
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
      <GrammarModal
        message={message as IMessage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
        scrollToBottom={true}
      />
    </View>
  );
}
