import { useTranslation } from './i18nContext';
import { LOCALES, SUPPORTED_LOCALES } from './locales';

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      className="lang-switcher"
      role="group"
      aria-label={t('languageSwitcher')}
    >
      {SUPPORTED_LOCALES.map(code => (
        <button
          key={code}
          type="button"
          className="lang-switcher__button"
          aria-pressed={code === locale}
          title={LOCALES[code].languageName}
          onClick={() => setLocale(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
