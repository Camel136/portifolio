import { useTranslation } from '../../i18n/i18nContext';
import TechList from './TechList';

const PROJECT_URL = 'https://www.rider.com.br/';

export default function WebSite() {
  const { messages } = useTranslation();
  const page = messages.pages.webSite;

  return (
    <>
      <h2 className="page-title">{page.title}</h2>
      <p className="page-description">{page.description}</p>
      <TechList items={page.technologies} />
      <a href={PROJECT_URL}>{page.link}</a>
    </>
  );
}
