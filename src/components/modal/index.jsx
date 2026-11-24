import './index.css';
import ThreeJs from '../pages/threeJS';
import WebSite from '../pages/webSite';
import App from '../pages/app';
import { useContext, useEffect } from 'react';
import { Context } from '../context/context';
import { useTranslation } from '../../i18n/i18nContext';

const PAGES = {
  0: ThreeJs,
  1: WebSite,
  2: App,
};

export default function Modal({ open, onClose }) {
  const { destiny, isMobile } = useContext(Context);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const Page = PAGES[destiny];

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <div className="modal-header">
          <button
            className="modal-close-button"
            type="button"
            onClick={onClose}
            aria-label={t('modal.closeLabel')}
          >
            {t(isMobile ? 'modal.closeMobile' : 'modal.closeDesktop')}
          </button>
        </div>

        <div className="modal-content">
          {Page ? <Page /> : <p>{t('modal.notFound')}</p>}
        </div>
      </div>
    </div>
  );
}
