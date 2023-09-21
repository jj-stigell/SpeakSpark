/* eslint-disable @typescript-eslint/typedef */
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Toast as notification } from 'react-native-toast-notifications';
import { useLazyQuery } from '@apollo/client';

import { Message } from '../redux/features/chatSlice';
import { GET_MESSAGE } from '../graphql/queries';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { System } from '../redux/features/systemSlice';
import { CustomMessage } from '../screens/main/Chat';

interface Props {
  message: CustomMessage
}

export default function PlayButton(props: Props): React.JSX.Element {
  const system: System = useAppSelector((state: RootState) => state.system);
  const [playing, setPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const [getMessage] = useLazyQuery(GET_MESSAGE, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  });

  async function playAudio(messageId: string): Promise<void> {
    if (playing && sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(undefined);
      setPlaying(false);
      return;
    }
    setLoading(true);

    // Wrap the query in a promise
    const fetchMessage = new Promise((resolve, reject) => {
      getMessage({
        variables: { messageId: String(messageId) },
        onCompleted: (data) => resolve(data.getMessage),
        onError: (error) => reject(error)
      });
    });

    try {
      // Unload previous sound if it exists
      if (sound) {
        await sound.unloadAsync();
      }

      let audioUri: string;

      // Welcome message has audio already generated.
      if (messageId == '1') {
        audioUri = props.message.messageAudio as string;
      } else {
        const message: Message = await fetchMessage as Message;
        audioUri = message.audio;
      }

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(newSound);

      // Set the playback status update listener, stop after finished.
      newSound.setOnPlaybackStatusUpdate(playbackStatus => {
        if (playbackStatus.isLoaded && playbackStatus.didJustFinish) {
          setPlaying(false);
        }
      });

      setPlaying(true);
      await newSound.playAsync();
    } catch (error) {
      notification.show('Error fetching or playing audio!', { type: 'warning' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <TouchableOpacity onPress={(): Promise<void> => playAudio(String(props.message._id))}>
      <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Ionicons
          name={playing ? 'stop-circle' : 'play-circle'}
          size={34}
          style={{
            paddingRight: 8,
            color: system.darkMode ? 'white' : 'black',
            opacity: loading ? 0.5 : 1
          }}
        />
        {loading && (
          <ActivityIndicator
            size="large"
            color='#00ff00'
            style={{ position: 'absolute' }} // Absolute positioning on top of the Ionicons.
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
