/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { Bot } from '../redux/features/botSlice';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Stars from './Stars';
import { ColorScheme } from '../utils/colors';

export default function BotCard(props: { navigation: any, bot: Bot }): React.JSX.Element {
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);

  function newChat(bot: Bot): void {
    props.navigation.navigate('Chat', { bot, newChat: true });
  }

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: theme.background.secondary }]}
      onPress={(): void => newChat(props.bot)}
    >
      <Image source={{ uri: props.bot.profileImage }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{props.bot.name} - {props.bot.nameRomaji}</Text>
        <Stars difficulty={props.bot.difficulty} />
        <Text style={styles.languageText}>{props.bot.welcomeMessage}</Text>
      </View>
    </TouchableOpacity>
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
  }
});
