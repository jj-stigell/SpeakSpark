import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { SystemContextType } from '../context/SystemProvider';
import useSystem from '../hooks/useSystem';

interface Props {
  title: string,
  onPress: () => void,
  disabled?: boolean,
  color?: string,
  style?: {
    marginTop?: number,
    marginBottom?: number
  }
}

export default function Button(props: Props): React.JSX.Element {
  const { theme }: SystemContextType = useSystem();
  const color: string = props.color ?? theme.button.primary;

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
