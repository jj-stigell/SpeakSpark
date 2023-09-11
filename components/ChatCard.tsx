import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { getLabelForValue } from '../utils/languages';

export interface CardData {
  chatId: string,
  name: string,
  nameRomaji: string,
  avatar: string,
  language: string,
  updatedAt: Date
}

interface props extends CardData {
  onPress: (chatId: string) => void
}

export default function Card(props: props): React.JSX.Element {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={(): void => props.onPress(props.chatId)}
    >
      <Image source={{ uri: props.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{props.name} - {props.nameRomaji}</Text>
        <Text style={styles.languageText}>{getLabelForValue(props.language)}</Text>
        <Text style={styles.dateText}>{props.updatedAt.toLocaleDateString()}</Text>
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
    marginBottom: 15,
    backgroundColor: '#f5f5f5', // subtle background color
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
