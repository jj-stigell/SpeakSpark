/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import BotCard from './BotCard';
import Loader from './Loader';
import { GET_BOTS } from '../graphql/queries';
import { AuthContextType } from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import { Bot } from '../type';

export default function BotList(props: { navigation: any }): React.JSX.Element {
  const { auth }: AuthContextType = useAuth();
  const [bots, setBots] = useState<Array<Bot>>([]);

  const { loading, data } = useQuery(GET_BOTS, {
    variables: { language: auth!.studyLanguage },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    onCompleted: () => {
      setBots(data.getBots);
    }
  });

  if (loading) {
    return (<Loader marginTop={90} loadingText='Loading chat partners...' />);
  }

  if (bots.length === 0) {
    return (
      <View style={{ marginTop: 90, alignItems: 'center' }}>
        <Text style={{ marginTop: 20 }}>No chatting partners found for selected language</Text>
      </View>
    );
  }

  return (
    <View>
      {bots.map((bot: Bot) => (
        <BotCard key={bot.id} navigation={props.navigation} bot={bot} />
      ))}
    </View>
  );
}
