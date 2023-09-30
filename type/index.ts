export interface Bot {
  id: string,
  name: string,
  nameRomaji: string,
  profileImage: string,
  introduction: string,
  language: string,
  welcomeMessage: string,
  welcomeAudio: string,
  difficulty: number
}

export type ChatRole = 'USER' | 'BOT';

export interface Message {
  id: string,
  message: string,
  audio: string,
  grammarAnalysis: string,
  role: ChatRole,
  createdAt: Date
}

export interface Chat {
  id: string,
  bot: Bot,
  messages: Array<Message>,
  createdAt: string,
  updatedAt: string
}
