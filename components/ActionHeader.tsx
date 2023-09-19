import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { System } from '../redux/features/systemSlice';

interface Props {
  title: string,
  onBack: () => void
}

export default function ActionHeader(props: Props): React.JSX.Element {
  const system: System = useAppSelector((state: RootState) => state.system);

  return (
    <View style={[styles.headerContainer, { backgroundColor: system.theme.background.secondary }]}>
      <TouchableOpacity onPress={props.onBack}>
        <Ionicons name="arrow-back" size={24} color={system.darkMode ? 'white' : 'black'} />
      </TouchableOpacity>
      <Text style={[styles.headerText, { color: system.theme.font.primary }]}>{props.title}</Text>
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
