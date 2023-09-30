/* eslint-disable @typescript-eslint/typedef */
import React, { createContext, Context, useEffect, useState, useCallback } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { Theme, dark, light } from '../utils/Theme';
import { getFromStore } from '../utils/expoStore';

const colorScheme: ColorSchemeName = Appearance.getColorScheme();

const initialState: SystemContextType = {
  darkMode: colorScheme === 'dark',
  notifications: true,
  theme: colorScheme === 'dark' ? dark : light,
  toggleDarkMode: () => null,
  toggleNotification: () => null
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
      const storedTheme: string | null = await getFromStore('theme');
      if (storedTheme) {
        setTheme(JSON.parse(storedTheme));
      }

      const storedDarkMode: string | null = await getFromStore('dark');
      if (storedDarkMode) {
        storedDarkMode === 'true' ? setDarkMode(true) : setDarkMode(false);
      }

      const storedNotification: string | null = await getFromStore('notification');
      if (storedNotification) {
        storedNotification === 'true' ? setNotifications(true) : setNotifications(false);
      }
    })();
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevState => !prevState);

    if (darkMode) {
      setTheme(dark);
    } else {
      setTheme(light);
    }
  }, []);

  const toggleNotification = useCallback(() => {
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
