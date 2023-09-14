import { DocumentNode, gql } from '@apollo/client';

export const GET_BOTS: DocumentNode = gql`
query GetBots($language: String!) {
  getBots(language: $language) {
    id
    name
    nameRomaji
    profileImage
    persona
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
