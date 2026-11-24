import { useTranslation } from '../../i18n/i18nContext';

export default function TechList({ items }) {
  const { t } = useTranslation();

  return (
    <p>
      <strong>{t('pages.technologiesLabel')}</strong>
      {items.map(item => (
        <span key={item}>
          <br />• {item}
        </span>
      ))}
    </p>
  );
}
