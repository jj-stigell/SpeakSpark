/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { VStack, Heading, Text, Center } from '@gluestack-ui/themed';
import { ScrollView, View } from 'react-native';

import BotList from '../../components/BotList';
import Button from '../../components/Button';
import LanguageSelector from '../../components/LanguageSelector';
import { setStudyLanguage } from '../../redux/features/accountSlice';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';

export default function NewChat(props: { navigation: any }): React.JSX.Element {
  const language: string = useAppSelector(
    (state: RootState) => state.account.account.studyLanguage);

  return (
    <View style={{ marginHorizontal: 16, marginTop: 50 }}>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md'>Start a New Chat</Heading>
        </Center>
        <VStack space='xs'>
          <Text marginTop='$2' style={{ fontSize: 20, textAlign: 'center' }}>Chat Language</Text>
          <LanguageSelector language={language} setLanguage={setStudyLanguage} />
          <Text
            marginTop='$2'
            style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}
          >Chat Partners</Text>
          <ScrollView style={{ height: 400 }}>
            <BotList navigation={props.navigation} />
          </ScrollView>
        </VStack>
        <Button
          title='Back Home'
          onPress={(): void => props.navigation.navigate('Home')}
        />
      </VStack>
    </View>
  );
}
