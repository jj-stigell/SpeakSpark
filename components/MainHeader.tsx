import React from 'react';
import { HStack, Heading, Image } from '@gluestack-ui/themed';
import { StatusBar } from 'react-native';

export default function MainHeader(): React.JSX.Element {
  return (
    <HStack
      alignItems="center"
      paddingTop={StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 10}
    >
      <Heading lineHeight={30} fontSize={24} fontWeight="bold" marginTop={5}>SpeakSpark</Heading>
      <Image
        source={require('../assets/image/logo.png')}
        alt="SpeakSpark Logo"
        width={35}
        height={35}
      />
    </HStack>
  );
}
