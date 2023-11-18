import { I18n } from 'i18n-js';

import en from './assets/locales/en.js';
import ja from './assets/locales/ja.js';
import de from './assets/locales/de.js';
import fi from './assets/locales/fi.js';
import ko from './assets/locales/ko.js';
import vi from './assets/locales/vi.js';

const i18n: I18n = new I18n({ en, ja, de, fi, ko, vi });

i18n.enableFallback = true;

export default i18n;
