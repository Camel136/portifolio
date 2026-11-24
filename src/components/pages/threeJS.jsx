import { useTranslation } from '../../i18n/i18nContext';
import TechList from './TechList';

const PROJECT_URL = 'https://camel136.github.io/reactScene/';

export default function ThreeJs() {
  const { messages } = useTranslation();
  const page = messages.pages.threeJs;

  return (
    <div className="page-scroll">
      <div className="page-preview">
        <iframe
          className="page-preview__frame"
          src={PROJECT_URL}
          title={page.previewTitle}
          loading="lazy"
        />
        <span className="page-preview__hint">{page.previewHint}</span>
      </div>

      <h2 className="page-title">{page.title}</h2>
      <p className="page-description">{page.description}</p>
      <TechList items={page.technologies} />
      <a className="page-description" href={PROJECT_URL}>
        {page.link}
      </a>
    </div>
  );
}
