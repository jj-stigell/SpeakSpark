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
      <View style={{ flex: 1 }}>
        <LanguageSelector
          language={auth!.studyLanguage}
          setLanguage={setStudyLanguage}
          languageList={studyLanguages}
        />
      </View>
      <Text style={styles.textCenter}>Chat Partners</Text>
      <View style={styles.scrollView}>
        <ScrollView>
          <BotList navigation={props.navigation} />
        </ScrollView>
      </View>
      <View style={{ flex: 1, marginBottom: 10 }}>
        <Button title='Back Home' onPress={(): void => props.navigation.navigate('Home')} />
      </View>
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 15,
    justifyContent: 'space-between'
  },
  heading: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center'
  },
  textCenter: {
    flex: 1,
    marginTop: 2,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5
  },
  scrollView: {
    flex: 9,
    height: 450,
    marginBottom: 5
  }
});
