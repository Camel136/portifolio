import { useCallback, useEffect, useMemo, useState } from 'react';
import { I18nContext } from './i18nContext';
import { DEFAULT_LOCALE, LOCALES, SUPPORTED_LOCALES } from './locales';

const STORAGE_KEY = 'portfolio.locale';

function isSupported(locale) {
  return typeof locale === 'string' && SUPPORTED_LOCALES.includes(locale);
}

function readStoredLocale() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('[i18n] could not read stored locale', error);
    return null;
  }
}

function detectInitialLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const stored = readStoredLocale();
  if (isSupported(stored)) return stored;

  const browserLocales = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  const match = browserLocales
    .map(tag => String(tag).slice(0, 2).toLowerCase())
    .find(isSupported);

  return match ?? DEFAULT_LOCALE;
}

function resolveKey(messages, key) {
  return key
    .split('.')
    .reduce((node, part) => (node == null ? undefined : node[part]), messages);
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(detectInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch (error) {
      console.warn('[i18n] could not persist locale', error);
    }
  }, [locale]);

  const setLocale = useCallback(next => {
    if (!isSupported(next)) {
      console.error(`[i18n] unsupported locale: ${next}`);
      return;
    }
    setLocaleState(next);
  }, []);

  const value = useMemo(() => {
    const messages = LOCALES[locale];
    const t = key => {
      const text =
        resolveKey(messages, key) ?? resolveKey(LOCALES[DEFAULT_LOCALE], key);
      if (typeof text !== 'string') {
        console.warn(`[i18n] missing string for key "${key}" (${locale})`);
        return key;
      }
      return text;
    };
    return { locale, setLocale, t, messages };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
