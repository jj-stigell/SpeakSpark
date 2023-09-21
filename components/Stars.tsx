import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export default function Stars({ difficulty }: { difficulty: number }): React.JSX.Element {
  // Ensure difficulty is within the 0 to 4 range.
  difficulty = Math.min(4, Math.max(0, difficulty));
  const remainingStars: number = 4 - difficulty;

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Beginner</Text>
      {Array(difficulty).fill(null).map((_: number, idx: number) => (
        <AntDesign key={`star_${idx}`} name="star" size={30} color="#a84432" />
      ))}
      {Array(remainingStars).fill(null).map((_: number, idx: number) => (
        <AntDesign key={`staro_${idx}`} name="staro" size={30} color="#a84432" />
      ))}
      <Text style={styles.labelText}>Advanced</Text>
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelText: {
    color: 'gray',
    fontSize: 10,
    marginRight: 5,
    marginLeft: 5
  }
});
