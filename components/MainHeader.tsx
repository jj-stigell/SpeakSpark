import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';

import { SystemContextType } from '../context/SystemProvider';
import useSystem from '../hooks/useSystem';

export default function MainHeader(): React.JSX.Element {
  const { theme }: SystemContextType = useSystem();

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.heading, color: theme.font.primary }}>
        SpeakSpark
      </Text>
      <Image
        source={require('../assets/image/logo.png')}
        style={styles.logo}
      />
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 10
  },
  heading: {
    lineHeight: 30,
    fontSize: 24,
    marginTop: 5,
    fontWeight: 'bold'
  },
  logo: {
    width: 35,
    height: 35,
    marginLeft: 10
  }
});
