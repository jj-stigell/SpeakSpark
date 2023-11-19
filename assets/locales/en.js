const translations = {
  home: {
    newChatButton: 'New Chat',
    settingsButton: 'Settings'
  },
  previousChats: {
    title: 'Latest Chats - Click to continue chatting',
    subtitle: 'Studying ',
    refetch: 'Click to refetch chats',
    noPreviousChats: 'No previous chats found for the language, click "New Chat" button to start a new chat.',
    loading: 'Loading chats, please wait...',
    updated: 'Chats Updated',
  },
  newChat: {
    title: 'Start a New Chat',
    language: 'Chat Language',
    listTitle: 'Chat Partners',
    returnButton: 'Back Home',
    notFound: 'No chatting partners found for selected language',
    loading: 'Loading chat partners...'
  },
  chat: {
    loading: 'Loading chat..',
    loadingNewChat: 'Starting a new chat with %{name}',
    placeholder: 'Type a message...',
    audioError: 'Error fetching or playing audio!',
    idMissing: 'Chat id missing, navigating to home',
    tooLong: 'Maximum message length is %{max}, your message is %{length} characters long',
    grammarModal: {
      translation: 'Translation:',
      loading: 'Loading grammar, please wait...',
      information: 'Information:',
      error: 'Something went wrong, please try again or report a bug!',
      graphQlError: 'Encountered GraphQL error: %{error}',
      closeButton: 'Close'
    }
  },
  card: {
    introduction: 'Introduction',
    language: 'Language',
    difficulty: 'Difficulty',
    startChatButton: 'Start Chat with %{name}',
    beginner: 'Beginner',
    advanced: 'Advanced',
    closeButton: 'Close',
    expand: 'Press for whole introduction',
    chatId: 'Chat id: '
  },
  settings: {
    title: 'Settings',
    account: 'account',
    language: 'Language',
    preferences: 'preferences',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    help: 'help',
    report: 'Report Bug / Feature',
    contact: 'Contact Us',
    other: 'other',
    version: 'App version: 0.0.1',
    logout: 'Logout',
    searchPlaceholder: 'Search...',
    languagePlaceholder: 'Select language'
  },
  auth: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginTitle: 'Login to existing account',
    registerTitle: 'Create new account',
    remember: 'Remember me',
    alternativeLogin: 'or login with',
    facebook: 'Facebook',
    google: 'Google',
    noAccount: 'Don\'t have an account?',
    registerLink: 'Register',
    agreeTerms: 'I agree to the ',
    tosLink: 'terms and conditions',
    emailField: 'Enter your email address',
    passwordField: 'Enter your password',
    confirmPasswordField: 'Confirm your password',
    loginButton: 'Login',
    loginProcess: 'Logging in, please wait...',
    registerButton: 'Sign Up',
    registerProcess: 'Registering, please wait...',
    registerSuccess: 'Account created succesfully. Logging in, please wait...',
    alternativeSignup: 'or sign up with',
    alreadyAccount: 'Already have an account?',
    loginLink: 'Login',
    returnButton: 'Go back',
    TermsAndConditions: 'Terms and Conditions (available only in english)'
  }
};

export default translations;
