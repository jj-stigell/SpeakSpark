/* eslint-disable @typescript-eslint/typedef */
import {
  ApolloClient, ApolloLink, createHttpLink,
  from, InMemoryCache, NormalizedCacheObject
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Toast as notification } from 'react-native-toast-notifications';

import { getFromStore } from '../utils/expoStore';

// More info on links: https://www.apollographql.com/docs/react/api/link/introduction
const httpLink: ApolloLink = createHttpLink({
  uri: 'http://192.168.0.12:4000/graphql'
});

const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
  let message = 'Error occured';
  if (graphQLErrors) {
    message = graphQLErrors[0].message;
  }

  if (networkError) {
    message = networkError.message;
  }

  console.log('Apollo Link Error:', message);
  notification.show(message, { type: 'warning' });
});

const authLink: ApolloLink = setContext(async (_, { headers }) => {
  try {
    const token: string | null = await getFromStore('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  } catch (error) {
    console.log(error);
    return {
      headers
    };
  }
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});
