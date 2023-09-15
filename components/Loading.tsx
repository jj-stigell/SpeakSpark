import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

export default function Loading(): React.JSX.Element {
  const spinValue: Animated.Value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,  // Reduced from 4000ms to 2000ms for faster spinning
        useNativeDriver: true  // Use native animations
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
        source={require('../image/logo.png')}
      />
      <Text style={styles.loadingText}>Loading</Text>
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
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10
  },
  image: {
    position: 'absolute', // Make sure the image doesn't push the text
    width: 100,
    height: 100
  }
});
