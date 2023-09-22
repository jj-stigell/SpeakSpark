import React, { Dispatch } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet, View, TouchableOpacity, Text,
  Switch, ScrollView, Image, Linking
} from 'react-native';
import { AnyAction } from '@reduxjs/toolkit';

import ChatHeader from '../../components/ActionHeader';
import LanguageSelector from '../../components/LanguageSelector';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Account, resetAccount, setUiLanguage } from '../../redux/features/accountSlice';
import { resetBots } from '../../redux/features/botSlice';
import { resetChats } from '../../redux/features/chatSlice';
import { RootState } from '../../redux/store';
import { deleteFromStore } from '../../utils/expoStore';
import { System, toggleDarkMode, toggleNotifications } from '../../redux/features/systemSlice';
import { ColorScheme } from '../../utils/colors';
import { uiLanguages } from '../../utils/languages';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Settings({ navigation }: { navigation: any }): React.JSX.Element {
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const account: Account = useAppSelector((state: RootState) => state.account.account);
  const system: System = useAppSelector((state: RootState) => state.system);
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);

  async function logout(): Promise<void> {
    deleteFromStore('jwt').then(() => {
      dispatch(resetAccount());
      dispatch(resetBots());
      dispatch(resetChats());
    });
  }

  return (
    <ScrollView style={styles.container}>
      <ChatHeader title={'Settings'} onBack={(): void => navigation.navigate('Home')}/>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Account</Text>
        </View>
        <View style={[styles.profile, { backgroundColor: theme.container.primary }]}>
          <Image
            alt="profile-photo"
            source={require('../../assets/image/profile.png')}
            style={styles.profileAvatar}
          />
          <View>
            <Text style={[styles.profileName, { color: theme.font.primary }]}>
              {account.email}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Preferences</Text>
        </View>
        <View style={styles.sectionBody}>
          <View
            style={[
              styles.rowWrapper,
              styles.rowFirst,
              { borderTopWidth: 0, backgroundColor: theme.container.primary }
            ]}>
            <TouchableOpacity>
              <View style={styles.row}>
                <Ionicons
                  name='language'
                  style={{
                    paddingRight: 8,
                    color: system.darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  Language
                </Text>
                <View style={styles.rowSpacer}/>
                <LanguageSelector
                  language={account.uiLanguage}
                  setLanguage={setUiLanguage}
                  languageList={uiLanguages}
                  half
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowWrapper, { backgroundColor: theme.container.primary }]}>
            <TouchableOpacity
              onPress={(): void => dispatch(toggleDarkMode())}>
              <View style={[
                styles.row,
                { backgroundColor: theme.container.primary }
              ]}>
                <Ionicons
                  name='moon'
                  style={{
                    paddingRight: 8,
                    color: system.darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  Dark Mode
                </Text>
                <View style={styles.rowSpacer}/>
                <Switch
                  value={system.darkMode}
                  onValueChange={(): void => dispatch(toggleDarkMode())}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[
            styles.rowWrapper,
            styles.rowLast,
            { backgroundColor: theme.container.primary }
          ]}>
            <TouchableOpacity
              onPress={(): void => dispatch(toggleNotifications())}>
              <View style={styles.row}>
                <Ionicons
                  name='notifications'
                  style={{
                    paddingRight: 8,
                    color: system.darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  Notifications
                </Text>
                <View style={styles.rowSpacer}/>
                <Switch
                  value={system.notifications}
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
            style={[
              styles.rowWrapper,
              styles.rowFirst,
              { borderTopWidth: 0, backgroundColor: theme.container.primary }
            ]}>
            <TouchableOpacity
              onPress={(): Promise<void> => Linking.openURL('https://forms.gle/9WuAZyxK33fzZchDA')}>
              <View style={styles.row}>
                <Ionicons
                  name='bug'
                  style={{
                    paddingRight: 8,
                    color: system.darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  Report Bug / Feature
                </Text>
                <View style={styles.rowSpacer}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[
            styles.rowWrapper,
            styles.rowLast,
            { backgroundColor: theme.container.primary }
          ]}>
            <TouchableOpacity
              onPress={(): Promise<void> => Linking.openURL('https://forms.gle/hgnTbty7y8ApUQcUA')}>
              <View style={styles.row}>
                <Ionicons
                  name='mail'
                  style={{
                    paddingRight: 8,
                    color: system.darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  Contact Us
                </Text>
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
            style={[
              styles.rowWrapper,
              styles.rowFirst,
              { borderTopWidth: 0, backgroundColor: theme.container.primary }
            ]}>
            <View style={styles.row}>
              <Ionicons
                name='information-circle'
                style={{
                  paddingRight: 8,
                  color: system.darkMode ? 'white' : 'black'
                }}
                size={20}
              />
              <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                App version: 0.1.1 (K202309221)
              </Text>
              <View style={styles.rowSpacer}/>
            </View>
          </View>
          <View
            style={[
              styles.rowWrapper,
              styles.rowLast,
              { borderTopWidth: 0, backgroundColor: theme.container.primary }
            ]}>
            <TouchableOpacity onPress={logout}>
              <View style={styles.row}>
                <Ionicons
                  name='md-log-out'
                  style={{
                    paddingRight: 8,
                    color: system.darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>Logout</Text>
                <View style={styles.rowSpacer}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  }
});
