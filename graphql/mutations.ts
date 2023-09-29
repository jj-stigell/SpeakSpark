import { DocumentNode, gql } from '@apollo/client';

export const CREATE_ACCOUNT: DocumentNode = gql`
mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    user {
      id
      uiLanguage
      studyLanguage
    }
    token
  }
}`;

export const LOGIN: DocumentNode = gql`
mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    user {
      id
      uiLanguage
      studyLanguage
    }
    token
  }
}`;

export const NEW_CHAT: DocumentNode = gql`
mutation Mutation($botId: String!) {
  newChat(botId: $botId) {
    id
    bot {
      id
      name
      nameRomaji
      profileImage
      language
      welcomeMessage
      welcomeAudio
    }
  }
}`;

export const POST_MESSAGE: DocumentNode = gql`
mutation PostMessage($message: String!, $chatId: String!) {
  postMessage(message: $message, chatId: $chatId) {
    id
    createdAt
    message
    role
    audio
  }
}`;
