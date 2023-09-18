import React, { Dispatch } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet, View, TouchableOpacity, Text,
  Switch, SafeAreaView, Image, Linking
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Settings({ navigation }: { navigation: any }): React.JSX.Element {
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const account: Account = useAppSelector((state: RootState) => state.account.account);

  async function logout(): Promise<void> {
    deleteFromStore('jwt').then(() => {
      dispatch(resetAccount());
      dispatch(resetBots());
      dispatch(resetChats());
    });
  }

  return (
    <SafeAreaView style={styles.container}>
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
            <TouchableOpacity>
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
              onPress={(): Promise<void> => Linking.openURL('https://forms.gle/9WuAZyxK33fzZchDA')}>
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
              onPress={(): Promise<void> => Linking.openURL('https://forms.gle/hgnTbty7y8ApUQcUA')}>
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
