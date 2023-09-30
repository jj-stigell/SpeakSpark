import React from 'react';
import { View, StyleSheet } from 'react-native';

import PreviousChats from '../../components/PreviousChats';
import MainHeader from '../../components/MainHeader';
import Button from '../../components/Button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Home(props: { navigation: any }): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <MainHeader />
      </View>
      <PreviousChats navigation={props.navigation} />
      <Button
        title='New chat'
        onPress={(): void => props.navigation.navigate('NewChat')}
      />
      <Button
        title='Settings'
        onPress={(): void => props.navigation.navigate('Settings')}
      />
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: 'space-between' // To simulate VStack with 'lg' space
  },
  centered: {
    alignItems: 'center',
    marginVertical: 10 // Adjust as needed
  },
  spaceXS: {
    marginVertical: 5 // Adjust as needed to simulate 'xs' space
  }
});
