export type LanguageSet = {
  label: string,
  value: string,
  english: string
}

export const studyLanguages: Array<LanguageSet> = [
  {
    label: '🇩🇪 Deutsch',
    value: 'de',
    english: 'German'
  },
  {
    label: '🇬🇧 English',
    value: 'en',
    english: 'English'
  },
  {
    label: '🇪🇸 Español',
    value: 'es',
    english: 'Spanish'
  },
  {
    label: '🇫🇷 Français',
    value: 'fr',
    english: 'French'
  },
  {
    label: '🇯🇵 日本語',
    value: 'ja',
    english: 'Japanese'
  },
  {
    label: '🇰🇷 한국어',
    value: 'ko',
    english: 'Korean'
  },
  {
    label: '🇨🇳 中文',
    value: 'zh',
    english: 'Chinese'
  }
];

export const uiLanguages: Array<LanguageSet> = [
  {
    label: '🇩🇪 Deutsch',
    value: 'de',
    english: 'German'
  },
  {
    label: '🇬🇧 English',
    value: 'en',
    english: 'English'
  },
  {
    label: '🇫🇮 Suomeksi',
    value: 'fi',
    english: 'Finnish'
  },
  {
    label: '🇯🇵 日本語',
    value: 'ja',
    english: 'Japanese'
  },
  {
    label: '🇻🇳 Tiếng Việt',
    value: 'vi',
    english: 'Vietnamese'
  }
];

export function getLabelByValue(
  value: string, languages: Array<LanguageSet>, field: keyof LanguageSet
): string {
  const language: LanguageSet | undefined = languages
    .find((lang: LanguageSet) => lang.value === value);
  return language ? language[field] : '-';
}
