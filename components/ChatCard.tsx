import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Bot } from '../redux/features/botSlice';
import { customDateFormat } from '../utils';
import { getLabelByValue, studyLanguages } from '../utils/languages';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { ColorScheme } from '../utils/colors';

interface Props {
  chatId: string,
  bot: Bot,
  updatedAt: string,
  onPress: (bot: Bot, chatId: string) => void
}

export default function Card(props: Props): React.JSX.Element {
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);

  return (
    <TouchableOpacity
      onPress={(): void => props.onPress(props.bot, props.chatId)}
      style={[
        styles.cardContainer,
        { backgroundColor: theme.background.secondary, borderColor: theme.container.border }
      ]}
    >
      <Image source={{ uri: props.bot.profileImage }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={[styles.nameText, { color: theme.font.primary }]}>
          {props.bot.name} - {props.bot.nameRomaji}
        </Text>
        <Text style={[styles.languageText, { color: theme.font.primary }]}>
          {getLabelByValue(props.bot.language, studyLanguages, 'label') + ' - '}
          {getLabelByValue(props.bot.language, studyLanguages, 'english')}
        </Text>
        <Text style={[styles.subText, { color: theme.font.primary }]}>
          {customDateFormat(props.updatedAt)}
        </Text>
        <Text style={[styles.subText, { color: theme.font.primary }]}>
          Chat id: {props.chatId}
        </Text>
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
    borderRadius: 10,
    marginBottom: 15,
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
    borderWidth: 0.5
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
  subText: {
    fontSize: 14,
    marginBottom: 2
  }
});
