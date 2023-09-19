import React from 'react';
import { Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';

import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { ColorScheme } from '../utils/colors';

interface Props {
  title: string,
  image: ImageSourcePropType
}

export default function ThirdPartyButton(props: Props): React.JSX.Element {
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);

  return (
    <TouchableOpacity
      onPress={(): void => console.log(`${props.title} Pressed`)}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 52,
        borderWidth: 1,
        borderColor: theme.container.border,
        marginRight: 4,
        borderRadius: 10
      }}
    >
      <Image
        source={props.image}
        resizeMode='contain'
        style={{
          height: 36,
          width: 36,
          marginRight: 8
        }}
      />
      <Text style={{ color: theme.font.primary }}>{props.title}</Text>
    </TouchableOpacity>
  );
}
