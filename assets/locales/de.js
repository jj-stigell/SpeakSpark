const translations = {
  home: {
    newChatButton: 'Neuer Chat',
    settingsButton: 'Einstellungen'
  },
  previousChats: {
    title: 'Letzte Chats - Zum Fortsetzen klicken',
    subtitle: 'Lernen',
    refetch: 'Klicken, um Chats neu zu laden',
    noPreviousChats: 'Keine früheren Chats für diese Sprache gefunden, klicken Sie auf "Neuer Chat", um einen neuen Chat zu starten.',
    loading: 'Chats werden geladen, bitte warten...',
    updated: 'Chats aktualisiert',
  },
  newChat: {
    title: 'Einen neuen Chat starten',
    language: 'Chat-Sprache',
    listTitle: 'Chat-Partner',
    returnButton: 'Zurück nach Hause',
    notFound: 'Keine Chat-Partner für die ausgewählte Sprache gefunden',
    loading: 'Chat-Partner werden geladen...'
  },
  chat: {
    loading: 'Chat wird geladen..',
    loadingNewChat: 'Neuer Chat mit %{name} wird gestartet',
    placeholder: 'Eine Nachricht schreiben...',
    audioError: 'Fehler beim Abrufen oder Abspielen von Audio!',
    idMissing: 'Chat-ID fehlt, Navigation nach Hause',
    tooLong: 'Maximale Nachrichtenlänge ist %{max}, Ihre Nachricht ist %{length} Zeichen lang',
    grammarModal: {
      translation: 'Übersetzung:',
      loading: 'Grammatik wird geladen, bitte warten...',
      information: 'Information:',
      error: 'Etwas ist schiefgelaufen, bitte versuchen Sie es erneut oder melden Sie einen Fehler!',
      graphQlError: 'GraphQL-Fehler aufgetreten: %{error}',
      closeButton: 'Schließen'
    }
  },
  card: {
    introduction: 'Einführung',
    language: 'Sprache',
    difficulty: 'Schwierigkeitsgrad',
    startChatButton: 'Chat mit %{name} starten',
    beginner: 'Anfänger',
    advanced: 'Fortgeschritten',
    closeButton: 'Schließen',
    expand: 'Für vollständige Einführung drücken',
    chatId: 'Chat-ID: '
  },
  settings: {
    title: 'Einstellungen',
    account: 'Konto',
    language: 'Sprache',
    preferences: 'Präferenzen',
    darkMode: 'Dunkler Modus',
    notifications: 'Benachrichtigungen',
    help: 'Hilfe',
    report: 'Fehler/Bug melden',
    contact: 'Kontaktieren Sie uns',
    other: 'Andere',
    version: 'App-Version: 0.0.1',
    logout: 'Abmelden',
    searchPlaceholder: 'Suchen...',
    languagePlaceholder: 'Sprache auswählen'
  },
  auth: {
    email: 'E-Mail',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen',
    loginTitle: 'In bestehendes Konto einloggen',
    registerTitle: 'Neues Konto erstellen',
    remember: 'Angemeldet bleiben',
    alternativeLogin: 'oder einloggen mit',
    facebook: 'Facebook',
    google: 'Google',
    noAccount: 'Noch kein Konto?',
    registerLink: 'Registrieren',
    agreeTerms: 'Ich stimme den ',
    tosLink: 'Geschäftsbedingungen zu',
    emailField: 'Geben Sie Ihre E-Mail-Adresse ein',
    passwordField: 'Geben Sie Ihr Passwort ein',
    confirmPasswordField: 'Bestätigen Sie Ihr Passwort',
    loginButton: 'Einloggen',
    loginProcess: 'Einloggen, bitte warten...',
    registerButton: 'Anmelden',
    registerProcess: 'Registrierung läuft, bitte warten...',
    registerSuccess: 'Konto erfolgreich erstellt. Einloggen, bitte warten...',
    alternativeSignup: 'oder anmelden mit',
    alreadyAccount: 'Bereits ein Konto vorhanden?',
    loginLink: 'Einloggen',
    returnButton: 'Zurückgehen',
    TermsAndConditions: 'Geschäftsbedingungen (nur auf Englisch verfügbar)'
  }
};

export default translations;
