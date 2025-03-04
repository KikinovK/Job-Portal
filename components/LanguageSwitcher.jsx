import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale: activeLocale, pathname, query, asPath } = router;

  const handleLocaleChange = (newLocale) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          disabled={locale === activeLocale}
          className="px-1 mx-1 text-base font-medium transition-all duration-700
             hover:translate-y-2 uppercase
             disabled:pointer-events-none disabled:opacity-50 disabled:text-gray-400"
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </>
  );
};

export default LanguageSwitcher;
