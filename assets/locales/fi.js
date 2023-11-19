const translations = {
  home: {
    newChatButton: 'Uusi Keskustelu',
    settingsButton: 'Asetukset'
  },
  previousChats: {
    title: 'Viimeisimmät Keskustelut - Jatka klikkaamalla',
    subtitle: 'Opiskelussa',
    refetch: 'Klikkaa uudelleenladataksesi keskustelut',
    noPreviousChats: 'Aiemmat keskustelut eivät löydy tällä kielellä, aloita uusi keskustelu klikkaamalla "Uusi Keskustelu" -painiketta.',
    loading: 'Ladataan keskusteluja, odota hetki...',
    updated: 'Keskustelut Päivitetty',
  },
  newChat: {
    title: 'Aloita Uusi Keskustelu',
    language: 'Keskustelun Kieli',
    listTitle: 'Keskustelukumppanit',
    returnButton: 'Takaisin Kotiin',
    notFound: 'Keskustelukumppaneita ei löytynyt valitulla kielellä',
    loading: 'Ladataan keskustelukumppaneita...'
  },
  chat: {
    loading: 'Ladataan keskustelua..',
    loadingNewChat: 'Aloitetaan uusi keskustelu henkilön %{name} kanssa',
    placeholder: 'Kirjoita viesti...',
    audioError: 'Virhe äänen noutamisessa tai toistamisessa!',
    idMissing: 'Keskustelun id puuttuu, siirrytään kotiin',
    tooLong: 'Viestin maksimipituus on %{max}, viestisi on %{length} merkkiä pitkä',
    grammarModal: {
      translation: 'Käännös:',
      loading: 'Ladataan kielioppia, odota hetki...',
      information: 'Tiedot:',
      error: 'Jotain meni pieleen, yritä uudelleen tai ilmoita virheestä!',
      graphQlError: 'GraphQL-virhe: %{error}',
      closeButton: 'Sulje'
    }
  },
  card: {
    introduction: 'Esittely',
    language: 'Kieli',
    difficulty: 'Vaikeustaso',
    startChatButton: 'Aloita Keskustelu henkilön %{name} kanssa',
    beginner: 'Aloittelija',
    advanced: 'Edistynyt',
    closeButton: 'Sulje',
    expand: 'Paina nähdäksesi koko esittelyn',
    chatId: 'Keskustelun id: '
  },
  settings: {
    title: 'Asetukset',
    account: 'tili',
    language: 'Kieli',
    preferences: 'asetukset',
    darkMode: 'Tumma Tilaa',
    notifications: 'Ilmoitukset',
    help: 'apua',
    report: 'Ilmoita Bugista / Ominaisuudesta',
    contact: 'Ota Yhteyttä',
    other: 'muut',
    version: 'Sovelluksen versio: 0.0.1',
    logout: 'Kirjaudu Ulos',
    searchPlaceholder: 'Hae...',
    languagePlaceholder: 'Valitse kieli'
  },
  auth: {
    email: 'Sähköposti',
    password: 'Salasana',
    confirmPassword: 'Vahvista Salasana',
    loginTitle: 'Kirjaudu olemassa olevaan tiliin',
    registerTitle: 'Luo uusi tili',
    remember: 'Muista minut',
    alternativeLogin: 'tai kirjaudu sisään käyttäen',
    facebook: 'Facebook',
    google: 'Google',
    noAccount: 'Eikö sinulla ole tiliä?',
    registerLink: 'Rekisteröidy',
    agreeTerms: 'Hyväksyn ',
    tosLink: 'käyttöehdot',
    emailField: 'Anna sähköpostiosoitteesi',
    passwordField: 'Anna salasanasi',
    confirmPasswordField: 'Vahvista salasanasi',
    loginButton: 'Kirjaudu Sisään',
    loginProcess: 'Kirjaudutaan sisään, odota hetki...',
    registerButton: 'Rekisteröidy',
    registerProcess: 'Rekisteröidään, odota hetki...',
    registerSuccess: 'Tili luotu onnistuneesti. Kirjaudutaan sisään, odota hetki...',
    alternativeSignup: 'tai rekisteröidy käyttäen',
    alreadyAccount: 'Onko sinulla jo tili?',
    loginLink: 'Kirjaudu Sisään',
    returnButton: 'Palaa takaisin',
    TermsAndConditions: 'Käyttöehdot (vain englanniksi)'
  }
};

export default translations;
