/* eslint-disable @typescript-eslint/typedef */
import React, { createContext, Context, useEffect, useState, useCallback } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

import { Theme, dark, light } from '../utils/theme';
import { getFromStore, saveToStore } from '../utils/expoStore';

const colorScheme: ColorSchemeName = Appearance.getColorScheme();

const initialState: SystemContextType = {
  darkMode: colorScheme === 'dark',
  notifications: true,
  theme: colorScheme === 'dark' ? dark : light,
  toggleDarkMode: () => {},
  toggleNotification: () => {}
};

export interface SystemContextType {
  darkMode: boolean,
  notifications: boolean,
  theme: Theme,
  toggleDarkMode: () => void,
  toggleNotification: () => void
}

export const SystemContext: Context<SystemContextType> =
  createContext<SystemContextType>(initialState);

export default function SystemProvider(props: { children: React.JSX.Element }): React.JSX.Element {
  const [theme, setTheme] = useState<Theme>(initialState.theme);
  const [darkMode, setDarkMode] = useState<boolean>(initialState.darkMode);
  const [notifications, setNotifications] = useState<boolean>(initialState.notifications);

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

  return (
    <SystemContext.Provider
      value={{ darkMode, notifications, theme, toggleDarkMode, toggleNotification }}
    >
      {props.children}
    </SystemContext.Provider>
  );
}
