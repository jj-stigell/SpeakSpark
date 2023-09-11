import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { View } from 'react-native';
import { ActionCreatorWithPayload, AnyAction, Dispatch } from '@reduxjs/toolkit';

import { useAppDispatch } from '../redux/hooks';
import { styles } from '../styles';
import { LanguageSet, languages } from '../utils/languages';

export default function LanguageSelector(props: {
  language: string,
  setLanguage: ActionCreatorWithPayload<string, string>
}): React.JSX.Element {
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/typedef
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  return (
    <View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={languages}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder='Select Language'
        searchPlaceholder="Search..."
        value={props.language}
        onFocus={(): void => setIsFocus(true)}
        onBlur={(): void => setIsFocus(false)}
        onChange={(item: LanguageSet): void => {
          dispatch(props.setLanguage(item.value));
          setIsFocus(false);
        }}
      />
    </View>
  );
}
