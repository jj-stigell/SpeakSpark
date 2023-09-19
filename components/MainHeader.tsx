import React from 'react';
import { HStack, Heading, Image } from '@gluestack-ui/themed';
import { StatusBar } from 'react-native';
import { RootState } from '../redux/store';
import { ColorScheme } from '../redux/features/systemSlice';
import { useAppSelector } from '../redux/hooks';

export default function MainHeader(): React.JSX.Element {
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);

  return (
    <HStack
      alignItems="center"
      marginTop={StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 10}
    >
      <Heading
        lineHeight={30}
        fontSize={24}
        marginTop={5}
        color={theme.font.primary}
        fontWeight="bold"
      >SpeakSpark</Heading>
      <Image
        source={require('../assets/image/logo.png')}
        alt="SpeakSpark Logo"
        width={35}
        height={35}
      />
    </HStack>
  );
}
