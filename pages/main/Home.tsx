import React from 'react';
import { FormControl, VStack, ButtonText, Button, Center } from '@gluestack-ui/themed';

import PreviousChats from '../../components/PreviousChats';
import MainHeader from '../../components/MainHeader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home(props: { navigation: any }): React.JSX.Element {
  return (
    <FormControl p='$2' marginTop='$2'>
      <VStack space='xl'>
        <Center>
          <MainHeader />
        </Center>
        <VStack space='xs'>
          <PreviousChats navigation={props.navigation} />
        </VStack>
        <Button onPress={(): void => props.navigation.navigate('NewChat')}>
          <ButtonText color='$white'>New chat</ButtonText>
        </Button>
        <Button onPress={(): void => props.navigation.navigate('Settings')}>
          <ButtonText color='$white'>Settings</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
