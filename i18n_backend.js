// i18n.js
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';

i18next
  .use(Backend)
  .init({
    initImmediate: false,
    backend: {
      loadPath: path.join(process.cwd(), '/locales/{{lng}}/{{ns}}.json'),
    },
    // debug: true, // Включение режима отладки
    fallbackLng: 'en',
    preload: ['en', 'uk'],
    ns: ['common'],
    defaultNS: 'common',
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
