export type LanguageSet = {
  label: string,
  value: string
}

export const studyLanguages: Array<LanguageSet> = [
  {
    label: '🇩🇪 Deutsch',
    value: 'de'
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
    label: '🇫🇷 Français',
    value: 'fr'
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
    label: '🇨🇳 中文',
    value: 'zh'
  }
];

export const uiLanguages: Array<LanguageSet> = [
  {
    label: '🇩🇪 Deutsch',
    value: 'de'
  },
  {
    label: '🇬🇧 English',
    value: 'en'
  },
  {
    label: '🇫🇮 Suomeksi',
    value: 'fi'
  },
  {
    label: '🇯🇵 日本語',
    value: 'jp'
  },
  {
    label: '🇻🇳 Tiếng Việt',
    value: 'vi'
  }
];

export function getLabelForValue(value: string, languages: Array<LanguageSet>): string {
  const language: LanguageSet | undefined = languages
    .find((lang: LanguageSet) => lang.value === value);
  return language ? language.label : '-';
}
