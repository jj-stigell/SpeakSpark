/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import BotList from '../../components/BotList';
import Button from '../../components/Button';
import LanguageSelector from '../../components/LanguageSelector';
import { studyLanguages } from '../../utils/languages';
import { AuthContextType } from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';

export default function NewChat(props: { navigation: any }): React.JSX.Element {
  const { auth, setStudyLanguage }: AuthContextType = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Start a New Chat</Text>
      <Text style={styles.textCenter}>Chat Language</Text>
      <LanguageSelector
        language={auth!.studyLanguage}
        setLanguage={setStudyLanguage}
        languageList={studyLanguages}
      />
      <Text style={styles.textCenter}>Chat Partners</Text>
      <ScrollView style={styles.scrollView}>
        <BotList navigation={props.navigation} />
      </ScrollView>
      <Button
        title='Back Home'
        onPress={(): void => props.navigation.navigate('Home')}
      />
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 50,
    justifyContent: 'space-between' // To simulate VStack with 'xl' space
  },
  heading: {
    lineHeight: 24, // Adjust as per design needs
    fontSize: 24, // Adjust as per design needs
    textAlign: 'center',
    marginBottom: 20 // Adjust as per design needs
  },
  textCenter: {
    marginTop: 2,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10 // Adjust as per design needs
  },
  scrollView: {
    height: 450,
    marginBottom: 20 // Adjust as per design needs
  }
});
