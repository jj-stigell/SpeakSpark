/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import BotCard from './BotCard';
import Loader from './Loader';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { Bot } from '../redux/features/botSlice';
import { GET_BOTS } from '../graphql/queries';

export default function BotList(props: { navigation: any }): React.JSX.Element {
  const [bots, setBots] = useState<Array<Bot>>([]);
  const language: string = useAppSelector(
    (state: RootState) => state.account.account.studyLanguage);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/typedef
  const { loading, data } = useQuery(GET_BOTS, {
    variables: { language },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    onCompleted: () => {
      setBots(data.getBots);
    }
  });

  if (loading) {
    return (
      <View style={{ marginTop: 90, alignItems: 'center' }}>
        <Loader loadingText='Loading chat partners...' />
      </View>
    );
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
