/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React, { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { Bot } from '../redux/features/botSlice';
import {
  Image, Modal, Pressable, ScrollView,
  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Stars from './Stars';
import { ColorScheme } from '../utils/colors';
import { getLabelForValue } from '../utils/languages';

interface Props {
  navigation: any,
  bot: Bot
}

export default function BotCard(props: Props): React.JSX.Element {
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);
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
          <View style={styles.modalView}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <Image source={{ uri: props.bot.profileImage }} style={styles.profileImage} />
              <Text style={styles.messageTitle}>{props.bot.name} - {props.bot.nameRomaji}</Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.titleText}>Introduction</Text>
              <Text style={styles.messageText}>{props.bot.introduction}</Text>
              <Text style={styles.titleText}>Language</Text>
              <Text style={styles.messageText}>{getLabelForValue(props.bot.language)}</Text>
              <Text style={styles.titleText}>Difficulty</Text>
              <Text style={styles.messageText}>
                <Stars difficulty={props.bot.difficulty} />
              </Text>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={(): void => newChat(props.bot)}>
                <Text style={styles.textStyle}>Start chat with {props.bot.name}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={(): void => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
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
          <Text style={styles.nameText}>{props.bot.name} - {props.bot.nameRomaji}</Text>
          <Stars difficulty={props.bot.difficulty} />
          <Text style={styles.languageText}>{props.bot.welcomeMessage}</Text>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1
  },
  modalView: {
    margin: 20,
    backgroundColor: '#E0F7FA',  // Light blue color
    borderRadius: 20,
    padding: 35,
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
    width: '75%',  // 75% of the parent width
    height: 1,  // Thin horizontal line
    backgroundColor: '#D3D3D3',  // Light gray color
    marginVertical: 10,  // Margin to separate from both top and bottom content
    alignSelf: 'center'  // Center the line
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  messageTitle: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center'
  },
  messageText: {
    fontSize: 18,
    marginBottom: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,  // To make the image rounded
    alignSelf: 'center',  // To center the image
    marginBottom: 20  // Some margin for spacing
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left'
  },
  infoBox: {
    backgroundColor: '#b6ebf2',  // Light red color
    borderRadius: 10,  // Rounded corners
    padding: 10,  // Padding inside the box
    marginVertical: 10  // Some margin for spacing
  }
});
