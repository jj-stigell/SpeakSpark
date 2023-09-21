import React from 'react';
import { VStack, Center } from '@gluestack-ui/themed';

import PreviousChats from '../../components/PreviousChats';
import MainHeader from '../../components/MainHeader';
import Button from '../../components/Button';
import { View } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home(props: { navigation: any }): React.JSX.Element {
  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <VStack space='lg'>
        <Center>
          <MainHeader />
        </Center>
        <VStack space='xs'>
          <PreviousChats navigation={props.navigation} />
        </VStack>
        <Button
          title='New chat'
          onPress={(): void => props.navigation.navigate('NewChat')}
        />
        <Button
          title='Settings'
          onPress={(): void => props.navigation.navigate('Settings')}
        />
      </VStack>
    </View>

  );
}
