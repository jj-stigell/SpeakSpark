import { DocumentNode, gql } from '@apollo/client';

export const GET_BOTS: DocumentNode = gql`
query GetBots($language: String!) {
  getBots(language: $language) {
    id
    name
    nameRomaji
    profileImage
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
  }
}`;

export const GET_MESSAGE: DocumentNode = gql`
query GetMessage(
  $generateTranslation: Boolean!,
  $generateGrammarAnalysis: Boolean!,
  $generateAudio: Boolean!,
  $messageId: String!,
  $botId: String!,
  $uiLanguage: String!
) {
  getMessage(
    generateTranslation: $generateTranslation,
    generateGrammarAnalysis: $generateGrammarAnalysis,
    generateAudio: $generateAudio,
    messageId: $messageId,
    botId: $botId,
    uiLanguage: $uiLanguage
  ) {
    translation
    grammarAnalysis
    audio
  }
}`;
