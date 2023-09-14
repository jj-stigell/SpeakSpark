/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useQuery } from '@apollo/client';
import { Bot } from '../redux/features/botSlice';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ButtonSpinner } from '@gluestack-ui/themed';
import { GET_BOTS } from '../graphql/queries';
import Stars from './Stars';

export default function BotList(props: { navigation: any }): React.JSX.Element {
  const [bots, setBots] = React.useState<Array<Bot>>([]);
  const language: string = useAppSelector(
    (state: RootState) => state.account.account.studyLanguage);

  function newChat(bot: Bot): void {
    props.navigation.navigate('Chat', { bot, newChat: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/typedef
  const { loading, data } = useQuery(GET_BOTS, {
    variables: { language },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    onCompleted: () => {
      setBots(data.getBots);
    }
  });

  if (loading || bots.length === 0) {
    return (
      <View style={{ marginTop: 90, alignItems: 'center' }}>
        { loading && <ButtonSpinner mr="$2" /> }
        <Text style={{ marginTop: 20 }}>
          {loading ? 'Loading bots' : 'No bots found for selected language' }
        </Text>
      </View>
    );
  }

  return (
    <View>
      {bots.map((bot: Bot) => (
        <TouchableOpacity
          key={bot.id}
          style={styles.cardContainer}
          onPress={(): void => newChat(bot)}
        >
          <Image source={{ uri: bot.profileImage }} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{bot.name} - {bot.nameRomaji}</Text>
            <Stars difficulty={bot.difficulty} />
            <Text style={styles.languageText}>{bot.welcomeMessage}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: '#e6f0ec', // subtle background color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 0.5,
    borderColor: '#ddd'
  },
  textContainer: {
    flex: 1
  },
  nameText: {
    fontSize: 20,
    marginBottom: 5
  },
  languageText: {
    fontSize: 14,
    marginBottom: 4
  },
  dateText: {
    color: '#777',
    fontSize: 14,
    marginBottom: 2
  }
});
