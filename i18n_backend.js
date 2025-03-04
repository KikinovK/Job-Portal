// i18n.js
import i18next from 'i18next';
import Backend from 'i18next-http-backend';

const loadPath = process.env.NEXT_APP_I18N_LOAD_PATH
  ? `${process.env.NEXT_APP_I18N_LOAD_PATH}/locales/{{lng}}/{{ns}}.json`
  : `${process.env.NEXT_PUBLIC_API_BASE_URL}/locales/{{lng}}/{{ns}}.json`;

i18next
  .use(Backend)
  .init({
    // initImmediate: false,
    backend: {
      loadPath: loadPath,
    },
    // debug: true, // Включение режима отладки
    fallbackLng: 'en',
    preload: ['en', 'uk'],
    ns: ['common_be'],
    defaultNS: 'common_be',
    interpolation: {
      escapeValue: false,
    },
  },
  // (err, t) => {
  //   if (err) console.error(err);
  //   console.log('i18next инициализирован.');
  //   console.log('Загруженные ресурсы:', i18next.store.data);
  // }
);

export default i18next;
