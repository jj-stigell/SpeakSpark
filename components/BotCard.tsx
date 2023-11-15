/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from './Button';
import Stars from './Stars';
import { getLabelByValue, studyLanguages } from '../utils/languages';
import { Bot } from '../type';
import { SystemContextType } from '../context/SystemProvider';
import useSystem from '../hooks/useSystem';
import i18n from '../i18n';

interface Props {
  navigation: any,
  bot: Bot
}

export default function BotCard(props: Props): React.JSX.Element {
  const { theme }: SystemContextType = useSystem();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function newChat(bot: Bot): void {
    props.navigation.navigate('Chat', { bot, newChat: true });
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={(): void => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: theme.background.secondary }]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <Image source={{ uri: props.bot.profileImage }} style={styles.profileImage} />
              <Text style={styles.messageTitle}>
                {props.bot.name}
                {props.bot.nameRomaji !== props.bot.name ? `- ${props.bot.nameRomaji}` : '' }
              </Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.titleText}>{i18n.t('card.introduction')}</Text>
              <Text style={styles.messageText}>{props.bot.introduction}</Text>
              <Text style={styles.titleText}>{i18n.t('card.language')}</Text>
              <Text style={styles.messageText}>
                {getLabelByValue(props.bot.language, studyLanguages, 'label') + ' - '}
                {getLabelByValue(props.bot.language, studyLanguages, 'english')}
              </Text>
              <Text style={styles.titleText}>{i18n.t('card.difficulty')}</Text>
              <Text style={styles.messageText}>
                <Stars difficulty={props.bot.difficulty} renderLabels={true} starSize={30} />
              </Text>
              <View style={styles.horizontalLine} />
              <Button
                title={i18n.t('card.startChatButton', { name: props.bot.name })}
                //{`Start chat with ${props.bot.name}`}
                onPress={(): void => newChat(props.bot)}
                style={{ marginTop: 10, marginBottom: 15 }}
              />
              <Button
                title={i18n.t('card.closeButton')}
                onPress={(): void => setModalVisible(!modalVisible)}
                color={theme.button.secondary}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.cardContainer, { backgroundColor: theme.background.secondary }]}
        onPress={(): void => setModalVisible(true)}
      >
        <Image source={{ uri: props.bot.profileImage }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{props.bot.nameRomaji}</Text>
          <Stars difficulty={props.bot.difficulty} starSize={24} />
          { props.bot.introduction.length > 120 ? (
            <React.Fragment>
              <Text style={styles.languageText}>
                {props.bot.introduction.substring(0, 100)}...
              </Text>
              <Text style={[styles.languageText, { fontWeight: 'bold' }]}>
                {i18n.t('card.expand')}
              </Text>
            </React.Fragment>
          ) : (
            <Text style={styles.languageText}>{props.bot.introduction}</Text>
          )}
        </View>
      </TouchableOpacity>
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
    marginBottom: 10,
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
    width: 80,
    height: 80,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  horizontalLine: {
    width: '75%',
    height: 2,
    backgroundColor: '#D3D3D3', // Light gray
    marginVertical: 10,
    alignSelf: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  messageTitle: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  messageText: {
    fontSize: 18,
    marginBottom: 10
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 15
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left'
  }
});
