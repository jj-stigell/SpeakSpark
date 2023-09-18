import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from './constants/colors';

interface Props {
  title: string,
  disabled?: boolean,
  filled?: boolean,
  color?: string,
  onPress: () => void,
  style?: {
    marginTop?: number,
    marginBottom?: number
  }
}

export default function Button(props: Props): React.JSX.Element {
  const filledBgColor: string = props.color || COLORS.primary;
  const outlinedColor: string = COLORS.white;
  const bgColor: string = props.filled ? filledBgColor : outlinedColor;
  const textColor: string = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={{
        ...styles.button,
        ...{
          backgroundColor: props.disabled ? '#d2d4d3' : bgColor,
          borderColor: props.disabled ? '#d2d4d3' : bgColor
        },
        ...props.style
      }}
    >
      <Text style={{ fontSize: 18, ... { color: textColor } }}>{props.title}</Text>
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
