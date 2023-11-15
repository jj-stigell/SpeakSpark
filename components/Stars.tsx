import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../i18n';

interface Props {
  difficulty: number,
  starSize: number,
  renderLabels?: boolean
}

export default function Stars(props: Props): React.JSX.Element {
  // Ensure difficulty is within the 0 to 4 range.
  const difficulty: number = Math.min(4, Math.max(0, props.difficulty));
  const remainingStars: number = 4 - difficulty;

  return (
    <View style={styles.container}>
      { props.renderLabels && <Text style={styles.labelText}>{i18n.t('card.beginner')}</Text> }
      {Array(props.difficulty).fill(null).map((_: number, idx: number) => (
        <AntDesign key={`star_${idx}`} name="star" size={props.starSize} color="#a84432" />
      ))}
      {Array(remainingStars).fill(null).map((_: number, idx: number) => (
        <AntDesign key={`staro_${idx}`} name="staro" size={props.starSize} color="#a84432" />
      ))}
      { props.renderLabels && <Text style={styles.labelText}>{i18n.t('card.advanced')}</Text> }
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
