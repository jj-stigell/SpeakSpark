import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import useSystem from '../hooks/useSystem';
import { SystemContextType } from '../context/SystemProvider';

interface Props {
  title: string,
  onBack: () => void
}

export default function ActionHeader(props: Props): React.JSX.Element {
  const { theme, darkMode }: SystemContextType = useSystem();

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.background.secondary }]}>
      <TouchableOpacity onPress={props.onBack}>
        <Ionicons name="arrow-back" size={24} color={darkMode ? 'white' : 'black'} />
      </TouchableOpacity>
      <Text style={[styles.headerText, { color: theme.font.primary }]}>{props.title}</Text>
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 10,
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
