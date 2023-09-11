/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import {
  FormControl, VStack, Heading, ButtonText,
  Text, Button, Center, HStack, Switch
} from '@gluestack-ui/themed';
import React, { JSX, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { Account, resetAccount } from '../../redux/features/accountSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { styles } from '../../styles';
import { languages } from '../../utils/languages';
import { deleteFromStore } from '../../utils/expoStore';

export default function Settings({ navigation }: { navigation: any }): JSX.Element {
  const dispatch = useAppDispatch();
  const account: Account = useAppSelector((state: RootState) => state.account.account);
  const [darkMode, setDarkMode] = useState<boolean>(account.darkMode);
  const [value, setValue] = useState<string>(account.uiLanguage);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  async function logout(): Promise<void> {
    deleteFromStore('jwt');
    dispatch(resetAccount());
  }

  return (
    <FormControl p='$4' marginTop='$32'>
      <VStack space='xl'>
        <Center>
          <Heading lineHeight='$md' marginBottom='$4'>Settings</Heading>
        </Center>
        <VStack space='xs'>
          <HStack space="md" marginBottom='$1' alignItems='center'>
            <Text size="lg">Email: {account.email}</Text>
          </HStack>
        </VStack>
        <VStack space='xs'>
          <HStack space="md" marginBottom='$1' alignItems='center'>
            <Switch
              value={darkMode}
              onToggle={(value: boolean): void => setDarkMode(value)}
            />
            <Text size="lg">Dark mode</Text>
          </HStack>
        </VStack>
        <VStack space='xs' marginBottom='$5'>
          <Text size="lg">UI Language</Text>
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
            value={value}
            onFocus={(): void => setIsFocus(true)}
            onBlur={(): void => setIsFocus(false)}
            onChange={(item): void => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </VStack>
        <Button onPress={(): void => navigation.navigate('Home')} marginBottom='$5'>
          <ButtonText color='$white'>Go Back</ButtonText>
        </Button>
        <Button onPress={logout}>
          <ButtonText color='$white'>logout</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
