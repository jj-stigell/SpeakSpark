import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function Loader(props: { loadingText: string }): React.JSX.Element {
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
    <View style={styles.container}>
      <Animated.Image
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        source={require('../assets/image/logo.png')}
      />
      <Text style={styles.loadingText}>{props.loadingText}</Text>
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
