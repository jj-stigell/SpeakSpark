import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet, View, TouchableOpacity, Text,
  Switch, ScrollView, Image, Linking
} from 'react-native';

import SettingsHeader from '../../components/ActionHeader';
import LanguageSelector from '../../components/LanguageSelector';
import { uiLanguages } from '../../utils/languages';
import { AuthContextType } from '../../context/AuthProvider';
import { SystemContextType } from '../../context/SystemProvider';
import useAuth from '../../hooks/useAuth';
import useSystem from '../../hooks/useSystem';
import i18n from '../../i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Settings({ navigation }: { navigation: any }): React.JSX.Element {
  const { auth, logout }: AuthContextType = useAuth();
  const { setUILanguage, uiLanguage }: SystemContextType = useSystem();
  const {
    theme, darkMode, notifications,
    toggleNotification, toggleDarkMode
  }: SystemContextType = useSystem();

  return (
    <ScrollView style={styles.container}>
      <SettingsHeader
        title={i18n.t('settings.title')}
        onTouch={(): void => navigation.navigate('Home')}
      />
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{i18n.t('settings.account')}</Text>
        </View>
        <View style={[styles.profile, { backgroundColor: theme.container.primary }]}>
          <Image
            alt="profile-photo"
            source={require('../../assets/image/profile.png')}
            style={styles.profileAvatar}
          />
          <View>
            <Text style={[styles.profileName, { color: theme.font.primary }]}>
              { auth?.email ?? 'Anonymous' }
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{i18n.t('settings.preferences')}</Text>
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
                    color: darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>{
                  i18n.t('settings.language')}
                </Text>
                <View style={styles.rowSpacer}/>
                <LanguageSelector
                  language={uiLanguage}
                  setLanguage={setUILanguage}
                  languageList={uiLanguages}
                  half
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowWrapper, { backgroundColor: theme.container.primary }]}>
            <TouchableOpacity
              onPress={(): void => toggleDarkMode()}>
              <View style={[
                styles.row,
                { backgroundColor: theme.container.primary }
              ]}>
                <Ionicons
                  name='moon'
                  style={{
                    paddingRight: 8,
                    color: darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  {i18n.t('settings.darkMode')}
                </Text>
                <View style={styles.rowSpacer}/>
                <Switch
                  value={darkMode}
                  onValueChange={(): void => toggleDarkMode()}
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
              onPress={(): void => toggleNotification()}>
              <View style={styles.row}>
                <Ionicons
                  name='notifications'
                  style={{
                    paddingRight: 8,
                    color: darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  {i18n.t('settings.notifications')}
                </Text>
                <View style={styles.rowSpacer}/>
                <Switch
                  value={notifications}
                  onValueChange={(): void => toggleNotification()}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{i18n.t('settings.help')}</Text>
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
                    color: darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  {i18n.t('settings.report')}
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
                    color: darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  {i18n.t('settings.contact')}
                </Text>
                <View style={styles.rowSpacer}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{i18n.t('settings.other')}</Text>
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
                  color: darkMode ? 'white' : 'black'
                }}
                size={20}
              />
              <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                {i18n.t('settings.version')}
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
                    color: darkMode ? 'white' : 'black'
                  }}
                  size={20}
                />
                <Text style={[styles.rowLabel, { color: theme.font.primary }]}>
                  {i18n.t('settings.logout')}
                </Text>
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
