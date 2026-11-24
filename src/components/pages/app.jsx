import { useTranslation } from '../../i18n/i18nContext';
import TechList from './TechList';

export default function App() {
  const { messages } = useTranslation();
  const page = messages.pages.app;

  return (
    <>
      <h2 className="page-title">{page.title}</h2>
      <p className="page-description">{page.description}</p>
      <TechList items={page.technologies} />
    </>
  );
}
