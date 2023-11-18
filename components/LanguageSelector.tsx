import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { styles } from '../styles';
import { LanguageSet } from '../utils/languages';
import i18n from '../i18n';
import { SystemContextType } from '../context/SystemProvider';
import useSystem from '../hooks/useSystem';

interface Props {
  language: string,
  setLanguage: (language: string) => void,
  half?: boolean,
  languageList: Array<LanguageSet>
}

export default function LanguageSelector(props: Props): React.JSX.Element {
  // eslint-disable-next-line @typescript-eslint/typedef
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const { theme }: SystemContextType = useSystem();

  return (
    <Dropdown
      style={[
        styles.dropdown,
        { backgroundColor: theme.background.secondary },
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
      placeholder={i18n.t('settings.languagePlaceholder')}
      searchPlaceholder={i18n.t('settings.searchPlaceholder')}
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
