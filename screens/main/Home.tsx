import React from 'react';
import { View } from 'react-native';

import PreviousChats from '../../components/PreviousChats';
import MainHeader from '../../components/MainHeader';
import Button from '../../components/Button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home(props: { navigation: any }): React.JSX.Element {
  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <View style={{ flex: 1, alignItems: 'center', marginVertical: 10 }}>
        <MainHeader />
      </View>
      <View style={{ flex: 7 }}>
        <PreviousChats navigation={props.navigation} />
      </View>
      <View style={{ flex: 1 }}>
        <Button title='New chat' onPress={(): void => props.navigation.navigate('NewChat')} />
      </View>
      <View style={{ flex: 1 }}>
        <Button title='Settings' onPress={(): void => props.navigation.navigate('Settings')} />
      </View>
    </View>
  );
}
