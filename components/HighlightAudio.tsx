/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/typedef */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import useSystem from '../hooks/useSystem';

interface Props {
  text: string,
  audioUrl: string
}

function getNgrams(text: string, n: number): Array<string> {
  const ngrams = [];
  for (let i = 0; i < text.length; i += n) {
    ngrams.push(text.slice(i, i + n));
  }
  return ngrams;
}

export default function HighlightAudioText(props: Props): React.JSX.Element {
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const { darkMode } = useSystem();

  // Use n-gram segmentation
  const segments = getNgrams(props.text, 5);

  useEffect(() => {
    return sound
      ? (): void => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  async function handlePlay(): Promise<void> {
    const { sound } = await Audio.Sound.createAsync(
      { uri: props.audioUrl }
    );
    setSound(sound);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        if (status.isPlaying) {
          const duration = status.durationMillis ?? 0;
          const currentTime = status.positionMillis ?? 0;
          const segmentDuration = duration / segments.length;

          const currentSegment = Math.round(currentTime / segmentDuration);
          setHighlightIndex(currentSegment);
        }

        // Check if the audio just finished playing
        if (status.didJustFinish) {
          setHighlightIndex(-1);  // Reset the highlight
          setPlaying(false);      // Update the playing state
        }
      }
    });

    setPlaying(true);  // Set playing state to true when the audio starts
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {segments.map((segment: string, index: number) => (
          <Text key={index} style={index === highlightIndex ? styles.highlight : styles.regular}>
            {segment}
          </Text>
        ))}
      </View>
      <TouchableOpacity onPress={handlePlay}>
        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Ionicons
            name={playing ? 'stop-circle' : 'play-circle'}
            size={40}
            style={{
              paddingRight: 8,
              color: darkMode ? 'white' : 'black',
              opacity: loading ? 0.5 : 1
            }}
          />
          {loading && (
            <ActivityIndicator
              size="large"
              color='#00ff00'
              style={{ position: 'absolute' }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  regular: {
    fontSize: 16
  },
  highlight: {
    fontSize: 16,
    backgroundColor: '#D8BFD8',  // Light purple color
    paddingHorizontal: 4,        // Some padding for better visual effect
    borderRadius: 5              // Rounded corners
  }
});
