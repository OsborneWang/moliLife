import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入语言资源
import en from './locales/en.json';
import zh from './locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'zh-CN', // 默认语言
    fallbackLng: 'zh-CN',
    debug: __DEV__,
    resources: {
      'zh-CN': { translation: zh },
      'en': { translation: en }
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;