import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { styles } from '../styles';
import { LanguageSet } from '../utils/languages';

interface Props {
  language: string,
  setLanguage: (language: string) => void,
  half?: boolean,
  languageList: Array<LanguageSet>
}

export default function LanguageSelector(props: Props): React.JSX.Element {
  // eslint-disable-next-line @typescript-eslint/typedef
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  return (
    <Dropdown
      style={[
        styles.dropdown,
        { width: props.half ? '50%' : '100%' },
        isFocus && { borderColor: 'blue' }
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={props.languageList}
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
        props.setLanguage(item.value);
        setIsFocus(false);
      }}
    />
  );
}
