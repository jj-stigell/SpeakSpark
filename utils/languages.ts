export type LanguageSet = {
  label: string,
  value: string
}

export const languages: Array<LanguageSet> = [
  {
    label: '🇧🇬 Български',
    value: 'bg'
  },
  {
    label: '🇨🇿 Čeština',
    value: 'cs'
  },
  {
    label: '🇩🇰 Dansk',
    value: 'da'
  },
  {
    label: '🇩🇪 Deutsch',
    value: 'de'
  },
  {
    label: '🇬🇷 Ελληνικά',
    value: 'el'
  },
  {
    label: '🇬🇧 English',
    value: 'en'
  },
  {
    label: '🇪🇸 Español',
    value: 'es'
  },
  {
    label: '🇫🇮 Suomeksi',
    value: 'fi'
  },
  {
    label: '🇫🇷 Français',
    value: 'fr'
  },
  {
    label: '🇭🇷 Hrvatski',
    value: 'hr'
  },
  {
    label: '🇭🇺 Magyar',
    value: 'hu'
  },
  {
    label: '🇮🇩 Bahasa Indonesia',
    value: 'id'
  },
  {
    label: '🇮🇹 Italiano',
    value: 'it'
  },
  {
    label: '🇯🇵 日本語',
    value: 'jp'
  },
  {
    label: '🇰🇷 한국어',
    value: 'ko'
  },
  {
    label: '🇱🇻 Latviešu',
    value: 'lv'
  },
  {
    label: '🇲🇰 Македонски',
    value: 'mk'
  },
  {
    label: '🇳🇱 Nederlands',
    value: 'nl'
  },
  {
    label: '🇳🇴 Norsk',
    value: 'no'
  },
  {
    label: '🇵🇱 Polski',
    value: 'pl'
  },
  {
    label: '🇵🇹 Português',
    value: 'pt'
  },
  {
    label: '🇷🇴 Română',
    value: 'ro'
  },
  {
    label: '🇷🇺 Русский',
    value: 'ru'
  },
  {
    label: '🇸🇮 Slovenščina',
    value: 'sl'
  },
  {
    label: '🇸🇰 Slovenčina',
    value: 'sk'
  },
  {
    label: '🇸🇪 Svenska',
    value: 'sv'
  },
  {
    label: '🇹🇭 ไทย',
    value: 'th'
  },
  {
    label: '🇹🇷 Türkçe',
    value: 'tr'
  },
  {
    label: '🇹🇼 台灣話',
    value: 'tw'
  },
  {
    label: '🇺🇦 Українська',
    value: 'uk'
  },
  {
    label: '🇻🇳 Tiếng Việt',
    value: 'vi'
  },
  {
    label: '🇨🇳 中文',
    value: 'zh'
  }
];

export function getLabelForValue(value: string): string {
  const language: LanguageSet | undefined = languages
    .find((lang: LanguageSet) => lang.value === value);
  return language ? language.label : '-';
}
