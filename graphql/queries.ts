import { DocumentNode, gql } from '@apollo/client';

export const GET_BOTS: DocumentNode = gql`
query GetBots($language: String!) {
  getBots(language: $language) {
    id
    name
    nameRomaji
    profileImage
    persona
    introduction
    language
    welcomeMessage
    welcomeAudio
    difficulty
  }
}`;

export const GET_LATEST_CHATS: DocumentNode = gql`
query Chats($language: String!) {
  chats(language: $language) {
    id
    createdAt
    updatedAt
    bot {
      id
      name
      nameRomaji
      profileImage
      persona
      introduction
      language
      welcomeMessage
      welcomeAudio
      difficulty
    }
  }
}`;

export const GET_MESSAGES: DocumentNode = gql`
query GetMessages($chatId: String!) {
  getMessages(chatId: $chatId) {
    id
    createdAt
    message
    role
    audio
  }
}`;

export const GET_MESSAGE: DocumentNode = gql`
query GetMessage($messageId: String!) {
  getMessage(messageId: $messageId) {
    audio
    grammarAnalysis
  }
}`;
