const translations = {
  home: {
    newChatButton: '新しいチャット',
    settingsButton: '設定'
  },
  previousChats: {
    title: '最新のチャット - 続けるにはクリックしてください',
    subtitle: '勉強中',
    refetch: 'チャットを再取得するにはクリック',
    noPreviousChats: '選択した言語で以前のチャットは見つかりませんでした。「新しいチャット」ボタンをクリックして新しいチャットを開始してください。',
    loading: 'チャットを読み込み中、お待ちください...',
    updated: 'チャット更新済み',
  },
  newChat: {
    title: '新しいチャットを始める',
    language: 'チャット言語',
    listTitle: 'チャットパートナー',
    returnButton: 'ホームに戻る',
    notFound: '選択した言語のチャットパートナーが見つかりません',
    loading: 'チャットパートナーを読み込み中...'
  },
  chat: {
    loading: 'チャットを読み込み中...',
    loadingNewChat: '%{name}との新しいチャットを開始中',
    placeholder: 'メッセージを入力...',
    audioError: 'オーディオの取得または再生中にエラーが発生しました！',
    idMissing: 'チャットIDがありません、ホームに戻ります',
    tooLong: '最大メッセージ長は%{max}です。あなたのメッセージは%{length}文字です',
    grammarModal: {
      translation: '翻訳：',
      loading: '文法を読み込み中、お待ちください...',
      information: '情報：',
      error: '何か問題が発生しました。もう一度試すか、バグを報告してください！',
      graphQlError: 'GraphQLエラーが発生しました：%{error}',
      closeButton: '閉じる'
    }
  },
  card: {
    introduction: '紹介',
    language: '言語',
    difficulty: '難易度',
    startChatButton: '%{name}とチャットを始める',
    beginner: '初心者',
    advanced: '上級者',
    closeButton: '閉じる',
    expand: '全体の紹介を表示するには押してください',
    chatId: 'チャットID：'
  },
  settings: {
    title: '設定',
    account: 'アカウント',
    language: '言語',
    preferences: '設定',
    darkMode: 'ダークモード',
    notifications: '通知',
    help: 'ヘルプ',
    report: 'バグ/機能を報告する',
    contact: 'お問い合わせ',
    other: 'その他',
    version: 'アプリバージョン：0.0.1',
    logout: 'ログアウト',
    searchPlaceholder: '検索...',
    languagePlaceholder: '言語を選択'
  },
  auth: {
    email: 'メール',
    password: 'パスワード',
    confirmPassword: 'パスワードの確認',
    loginTitle: '既存のアカウントにログイン',
    registerTitle: '新しいアカウントを作成',
    remember: 'ログイン状態を保持する',
    alternativeLogin: 'またはこれでログイン',
    facebook: 'Facebook',
    google: 'Google',
    noAccount: 'アカウントをお持ちでないですか？',
    registerLink: '登録する',
    agreeTerms: '利用規約に同意する',
    tosLink: '利用規約',
    emailField: 'メールアドレスを入力',
    passwordField: 'パスワードを入力',
    confirmPasswordField: 'パスワードを確認',
    loginButton: 'ログイン',
    loginProcess: 'ログイン中、お待ちください...',
    registerButton: 'サインアップ',
    registerProcess: '登録中、お待ちください...',
    registerSuccess: 'アカウントが正常に作成されました。ログイン中、お待ちください...',
    alternativeSignup: 'またはこれでサインアップ',
    alreadyAccount: 'すでにアカウントをお持ちですか？',
    loginLink: 'ログイン',
    returnButton: '戻る',
    TermsAndConditions: '利用規約（英語のみ）'
  }
};

export default translations;
