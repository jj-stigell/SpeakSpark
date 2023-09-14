import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export default function Stars({ difficulty }: { difficulty: number }): React.JSX.Element {
  // Ensure difficulty is within the 0 to 4 range.
  difficulty = Math.min(4, Math.max(0, difficulty));
  const remainingStars: number = 4 - difficulty;

  return (
    <View style={styles.container}>
      <Text style={styles.difficultyText}>Difficulty: </Text>
      {Array(difficulty).fill(null).map((_: number, idx: number) => (
        <AntDesign key={`star_${idx}`} name="star" size={20} color="#a84432" />
      ))}
      {Array(remainingStars).fill(null).map((_: number, idx: number) => (
        <AntDesign key={`staro_${idx}`} name="staro" size={20} color="#a84432" />
      ))}
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  difficultyText: {
    fontSize: 18, // same size as the stars
    marginRight: 5 // add some spacing between the text and the stars
  }
});
