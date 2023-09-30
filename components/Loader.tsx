import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { SystemContextType } from '../context/SystemProvider';
import useSystem from '../hooks/useSystem';

interface Props {
  loadingText: string,
  backgroundColor?: string,
  marginTop?: number
}

export default function Loader(props: Props): React.JSX.Element {
  const { theme }: SystemContextType = useSystem();
  const spinValue: Animated.Value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true
      })
    ).start();
  }, []);

  const spin: Animated.AnimatedInterpolation<string | number> = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: props.backgroundColor ?? theme.background.primary,
        marginTop: props.marginTop ?? 0
      }
    ]}>
      <Animated.Image
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        source={require('../assets/image/logo.png')}
      />
      <Text style={[styles.loadingText, { color: theme.font.primary }]}>{props.loadingText}</Text>
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 120
  },
  image: {
    position: 'absolute', // Make sure the image doesn't push the text.
    width: 80,
    height: 80
  }
});
