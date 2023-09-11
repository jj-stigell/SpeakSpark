import React, { JSX } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // Add the status bar's height to the padding
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1
  }
});

export default function ChatHeader(props: { botName: string, onBack: () => void }): JSX.Element {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={props.onBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.botName}</Text>
    </View>
  );
}
