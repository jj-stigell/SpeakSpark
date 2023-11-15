import { I18n } from 'i18n-js';

import en from './assets/locales/en.js';
import ja from './assets/locales/ja.js';

const i18n: I18n = new I18n({
  en,
  ja
});

i18n.locale = 'en';

i18n.enableFallback = true;

export default i18n;
