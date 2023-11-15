/* eslint-disable @typescript-eslint/typedef */
import React, { createContext, Context, useEffect, useState, useCallback } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

import { Theme, dark, light } from '../utils/theme';
import { getFromStore, saveToStore } from '../utils/expoStore';
import i18n from '../i18n';

const colorScheme: ColorSchemeName = Appearance.getColorScheme();

const initialState: SystemContextType = {
  darkMode: colorScheme === 'dark',
  notifications: true,
  uiLanguage: 'en',
  theme: colorScheme === 'dark' ? dark : light,
  toggleDarkMode: () => {},
  toggleNotification: () => {},
  setUILanguage: () => {}
};

export interface SystemContextType {
  darkMode: boolean,
  notifications: boolean,
  uiLanguage: string,
  theme: Theme,
  toggleDarkMode: () => void,
  toggleNotification: () => void,
  setUILanguage: (language: string) => void
}

export const SystemContext: Context<SystemContextType> =
  createContext<SystemContextType>(initialState);

export default function SystemProvider(props: { children: React.JSX.Element }): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>(initialState.theme);
  const [darkMode, setDarkMode] = useState<boolean>(initialState.darkMode);
  const [notifications, setNotifications] = useState<boolean>(initialState.notifications);
  const [uiLanguage, setUiLanguage] = useState<string>(initialState.uiLanguage);

  useEffect(() => {
    (async (): Promise<void> => {
      const storedDarkMode: string | null = await getFromStore('dark');
      if (storedDarkMode) {
        setDarkMode(storedDarkMode === 'true');
      }

      const storedNotification: string | null = await getFromStore('notification');
      if (storedNotification) {
        setNotifications(storedNotification === 'true');
      }

      setTheme(darkMode ? dark : light);
    })();
  }, []);

  function toggleDarkMode(): void {
    setTheme(darkMode ? light : dark);
    setDarkMode(prevState => !prevState);
    saveToStore('dark', String(!darkMode));
  }

  const toggleNotification = useCallback(() => {
    saveToStore('notification', String(notifications));
    setNotifications(prevState => !prevState);
  }, []);

  const setUILanguage = useCallback(async (language: string) => {
    i18n.locale = language;
    setUiLanguage(language);
    await saveToStore('uiLang', language);
  }, []);

  return (
    <SystemContext.Provider
      value={{
        uiLanguage, darkMode, notifications, theme,
        toggleDarkMode, toggleNotification, setUILanguage
      }}
    >
      {props.children}
    </SystemContext.Provider>
  );
}
