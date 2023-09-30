/* eslint-disable @typescript-eslint/typedef */
import React, { createContext, useCallback, useState } from 'react';
import { deleteFromStore } from '../utils/expoStore';

export interface Account {
  id: string,
  email: string,
  uiLanguage: string,
  studyLanguage: string
}

export interface AuthContextType {
  auth: Account | null,
  setAuth: (auth: Account | null) => void,
  setUILanguage: (language: string) => void,
  setStudyLanguage: (language: string) => void,
  logout: () => void
}

export const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>({
  auth: null,
  setAuth: () => null,
  setUILanguage: () => null,
  setStudyLanguage: () => null,
  logout: () => null
});

interface Props {
  children: React.JSX.Element
}

export default function AuthProvider(props: Props): React.JSX.Element {
  const [auth, setAuth] = useState<Account | null>(null);

  const logout = useCallback(() => {
    deleteFromStore('jwt').then(() => {
      setAuth(null);
    });
  }, []);

  const setUILanguage = useCallback((language: string) => {
    setAuth(prevState => ({ ...prevState, uiLanguage: language }));
  }, []);

  const setStudyLanguage = useCallback((language: string) => {
    setAuth((prevState) => ({ ...prevState, studyLanguage: language }));
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, setUILanguage, setStudyLanguage, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
