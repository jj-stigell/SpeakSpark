/* eslint-disable @typescript-eslint/typedef */
import React, { createContext, useCallback, useEffect, useState } from 'react';

import { deleteFromStore, getFromStore, saveToStore } from '../utils/expoStore';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

export interface Account {
  id: string,
  email: string,
  uiLanguage: string,
  studyLanguage: string
}

export interface AuthContextType {
  auth: Account | null,
  loading: boolean,
  setAuth: (auth: Account | null) => void,
  setUILanguage: (language: string) => void,
  setStudyLanguage: (language: string) => void,
  logout: () => void,
  login: (email: string, password: string, saveCreds: boolean) => void
}

export const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>({
  auth: null,
  loading: false,
  setAuth: () => {},
  setUILanguage: () => {},
  setStudyLanguage: () => {},
  logout: () => {},
  login: () => {}
});

export default function AuthProvider(props: { children: React.JSX.Element }): React.JSX.Element {
  const [auth, setAuth] = useState<Account | null>(null);

  const [loginAccount, { data, loading }] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onCompleted: async () => {
      await saveToStore('token', data.login.token);
      await saveToStore('auth', JSON.stringify(data.login.user));
      setAuth(data.login.user);
    }
  });

  useEffect(() => {
    (async (): Promise<void> => {
      const storedAuth: string | null = await getFromStore('auth');
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth));
      }
    })();
  }, []);

  const login = useCallback(
    async (email: string, password: string, saveCreds: boolean) => {
      if (saveCreds) {
        await saveToStore('email', email);
        await saveToStore('password', password);
        await saveToStore('rememberMe', 'true');
      } else {
        await deleteFromStore('email');
        await deleteFromStore('password');
        await deleteFromStore('rememberMe');
      }
      await loginAccount({ variables: { email, password } });
    }, []);

  const logout = useCallback(async () => {
    await deleteFromStore('token');
    await deleteFromStore('auth');
    setAuth(null);
  }, []);

  const setUILanguage = useCallback(async (language: string) => {

    setAuth((previousState: Account | null) => ({
      id: previousState!.id,
      email: previousState!.email,
      studyLanguage: previousState!.studyLanguage,
      uiLanguage: language
    }));
    await saveToStore('auth', JSON.stringify({ ...auth, uiLanguage: language }));
  }, []);

  const setStudyLanguage = useCallback(async (language: string) => {
    setAuth((previousState: Account | null) => ({
      id: previousState!.id,
      email: previousState!.email,
      studyLanguage: language,
      uiLanguage: previousState!.uiLanguage
    }));
    await saveToStore('auth', JSON.stringify({ ...auth, studyLanguage: language }));
  }, []);

  return (
    <AuthContext.Provider value={{
      auth, setAuth, setUILanguage, loading,
      setStudyLanguage, logout, login
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}
