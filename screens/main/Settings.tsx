import React, { Dispatch } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet, View, TouchableOpacity,
  Text, Switch, SafeAreaView, Image
} from 'react-native';
import ChatHeader from '../../components/ChatHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AnyAction } from '@reduxjs/toolkit';
import { Account, resetAccount } from '../../redux/features/accountSlice';
import { resetBots } from '../../redux/features/botSlice';
import { resetChats } from '../../redux/features/chatSlice';
import { RootState } from '../../redux/store';
import { deleteFromStore } from '../../utils/expoStore';

interface Item {
  icon: string,
  label: string,
  value?: string | boolean,
  type: string,
  index?: number
}

interface Section {
  header: string,
  items: Array<Item>
}

const SECTIONS: Array<Section> = [
  {
    header: 'Preferences',
    items: [
      { icon: 'language', label: 'Language', value: 'English', type: 'input' },
      { icon: 'moon', label: 'Dark Mode', value: false, type: 'boolean' },
      { icon: 'notifications', label: 'Notifications', value: false, type: 'boolean' }
    ]
  },
  {
    header: 'Help',
    items: [
      { icon: 'bug', label: 'Report Bug', type: 'link' },
      { icon: 'mail', label: 'Contact Us', type: 'link' }
    ]
  },
  {
    header: 'Other',
    items: [
      { icon: 'save', label: 'Logout', type: 'link' }
    ]
  }
];


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
            source={require('../../assets/image/facebook.png')}
            style={styles.profileAvatar}
          />
          <View>
            <Text style={styles.profileName}>{account.email}</Text>
          </View>
        </View>
      </View>

      {SECTIONS.map(({ header, items }) => (
        <View style={styles.section} key={header}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{header}</Text>
          </View>
          <View style={styles.sectionBody}>
            {items.map(({ label, type, value, icon }: Item, index: number) => {
              const isFirst = index === 0;
              const isLast = index === items.length - 1;
              return (
                <View
                  key={index}
                  style={[
                    styles.rowWrapper,
                    index === 0 && { borderTopWidth: 0 },
                    isFirst && styles.rowFirst,
                    isLast && styles.rowLast
                  ]}>
                  <TouchableOpacity
                    onPress={(): void => {
                      // handle onPress
                      console.log(label, type, value);
                    }}>
                    <View style={styles.row}>
                      <Ionicons
                        name={icon as keyof typeof Ionicons.glyphMap}
                        style={{ paddingRight: 8 }}
                        size={20} color="black"
                      />
                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={styles.rowSpacer} />

                      {type === 'input' && (
                        <Text style={styles.rowValue}>{value}</Text>
                      )}

                      {type === 'boolean' && <Switch value={true} />}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
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
    color: '#292929'
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585'
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff'
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
