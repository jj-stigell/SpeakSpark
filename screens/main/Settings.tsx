import React, { Dispatch, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet, View, TouchableOpacity, Modal,
  Text, Switch, SafeAreaView, Image, Pressable
} from 'react-native';
import ChatHeader from '../../components/ActionHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AnyAction } from '@reduxjs/toolkit';
import {
  Account, resetAccount, setUiLanguage, toggleDarkMode, toggleNotifications
} from '../../redux/features/accountSlice';
import { resetBots } from '../../redux/features/botSlice';
import { resetChats } from '../../redux/features/chatSlice';
import { RootState } from '../../redux/store';
import { deleteFromStore } from '../../utils/expoStore';
import LanguageSelector from '../../components/LanguageSelector';





//https://forms.gle/hgnTbty7y8ApUQcUA




function LangModal(props: {
  modalVisible: boolean,
  setModalVisible: (value: boolean) => void,
  language: string
}): React.JSX.Element {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={(): void => {
        props.setModalVisible(!props.modalVisible);
      }}>
      <View style={styless.centeredView}>
        <View style={styless.modalView}>
          <View>
            <LanguageSelector language={props.language} setLanguage={setUiLanguage} />
            <Pressable
              style={[styless.button, styless.buttonClose]}
              onPress={(): void => props.setModalVisible(!props.modalVisible)}>
              <Text style={styless.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styless = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    width: '90%',          // 90% of screen width
    maxWidth: 400,         // won't exceed 400 units (e.g., pixels) in width
    marginHorizontal: 10, // 10 units margin on the left and right
    backgroundColor: 'white',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  messageText: {
    fontSize: 18,        // Larger font size for the message text
    marginBottom: 10    // Some margin to create space between text and line
  },
  grammarAnalysis: {
    fontSize: 14        // Smaller font size for the grammar analysis
  },
  horizontalLine: {
    height: 10,          // Thin horizontal line
    backgroundColor: '#D3D3D3',   // Light gray color
    marginVertical: 10 // Margin to separate from both top and bottom content
  }
});






























// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Settings({ navigation }: { navigation: any }): React.JSX.Element {
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const account: Account = useAppSelector((state: RootState) => state.account.account);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  async function logout(): Promise<void> {
    deleteFromStore('jwt').then(() => {
      dispatch(resetAccount());
      dispatch(resetBots());
      dispatch(resetChats());
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <LangModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        language={account.uiLanguage}
      />
      <ChatHeader title={'Settings'} onBack={(): void => navigation.navigate('Home')}/>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Account</Text>
        </View>
        <View style={styles.profile}>
          <Image
            alt="profile-photo"
            source={require('../../assets/image/profile.png')}
            style={styles.profileAvatar}
          />
          <View>
            <Text style={styles.profileName}>{account.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Preferences</Text>
        </View>
        <View style={styles.sectionBody}>
          <View
            style={[styles.rowWrapper, { borderTopWidth: 0 }, styles.rowFirst]}>
            <TouchableOpacity
              onPress={(): void => setModalVisible(false)}>
              <View style={styles.row}>
                <Ionicons
                  name='language'
                  style={styles.icon}
                  size={styles.icon.size}
                  color={styles.icon.color}
                />
                <Text style={styles.rowLabel}>Language</Text>
                <View style={styles.rowSpacer}/>
                <LanguageSelector language={account.uiLanguage} setLanguage={setUiLanguage} half />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowWrapper]}>
            <TouchableOpacity
              onPress={(): void => dispatch(toggleDarkMode())}>
              <View style={styles.row}>
                <Ionicons
                  name='moon'
                  style={styles.icon}
                  size={styles.icon.size}
                  color={styles.icon.color}
                />
                <Text style={styles.rowLabel}>Dark Mode</Text>
                <View style={styles.rowSpacer}/>
                <Switch
                  value={account.darkMode}
                  onValueChange={(): void => dispatch(toggleDarkMode())}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowWrapper, styles.rowLast]}>
            <TouchableOpacity
              onPress={(): void => dispatch(toggleNotifications())}>
              <View style={styles.row}>
                <Ionicons
                  name='notifications'
                  style={styles.icon}
                  size={styles.icon.size}
                  color={styles.icon.color}
                />
                <Text style={styles.rowLabel}>Notifications</Text>
                <View style={styles.rowSpacer}/>
                <Switch
                  value={account.notifications}
                  onValueChange={(): void => dispatch(toggleNotifications())}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Help</Text>
        </View>
        <View style={styles.sectionBody}>
          <View
            style={[styles.rowWrapper, { borderTopWidth: 0 }, styles.rowFirst]}>
            <TouchableOpacity
              onPress={(): void => console.log('bugggg')}>
              <View style={styles.row}>
                <Ionicons
                  name='bug'
                  style={styles.icon}
                  size={styles.icon.size}
                  color={styles.icon.color}
                />
                <Text style={styles.rowLabel}>Report Bug</Text>
                <View style={styles.rowSpacer}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowWrapper, styles.rowLast]}>
            <TouchableOpacity
              onPress={(): void => console.log('mailmailmailmail')}>
              <View style={styles.row}>
                <Ionicons
                  name='mail'
                  style={styles.icon}
                  size={styles.icon.size}
                  color={styles.icon.color}
                />
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Other</Text>
        </View>
        <View style={styles.sectionBody}>
          <View
            style={[styles.rowWrapper, { borderTopWidth: 0 }, styles.rowFirst]}>
            <TouchableOpacity onPress={logout}>
              <View style={styles.row}>
                <Ionicons
                  name='md-log-out'
                  style={styles.icon}
                  size={styles.icon.size}
                  color={styles.icon.color}
                />
                <Text style={styles.rowLabel}>Logout</Text>
                <View style={styles.rowSpacer}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f1f1f'
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  sectionHeader: {
    padding: 8,
    paddingLeft: 12
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#adadad',
    textTransform: 'uppercase'
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
    paddingLeft: 4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 0
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0'
  },
  rowLabel: {
    fontSize: 17,
    color: '#000'
  },
  rowValue: {
    fontSize: 17,
    color: '#ababab'
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  },
  icon: {
    paddingRight: 8,
    size: 20,
    color: 'black'
  }
});
