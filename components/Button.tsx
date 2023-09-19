import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { ColorScheme } from '../utils/colors';

interface Props {
  title: string,
  disabled?: boolean,
  color?: string,
  onPress: () => void,
  style?: {
    marginTop?: number,
    marginBottom?: number
  }
}

export default function Button(props: Props): React.JSX.Element {
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);
  const color: string = props.color ?? '#007260';

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[
        styles.button,
        props.style,
        {
          backgroundColor: props.disabled ? theme.disabled : color,
          borderColor: props.disabled ? theme.disabled : color
        }
      ]}
    >
      <Text style={{ fontSize: 18, color: theme.font.secondary }}>{props.title}</Text>
    </TouchableOpacity>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
