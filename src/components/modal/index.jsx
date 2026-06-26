import './index.css';
import ThreeJs from '../pages/threeJS';
import WebSite from '../pages/webSite';
import App from '../pages/app';

export default function Modal({ open, onClose }) {
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  if (!open) return null;

  const webView = false;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <div className="modal-header">
          <button
            className="modal-close-button"
            type="button"
            onClick={onClose}
            onPre
            aria-label="Fechar modal"
          >
            Aperte Esc 2 vezes para sair
          </button>
        </div>

        <div className="modal-content">
          {/* <ThreeJs /> */}
          {/* <WebSite /> */}
          {/* <App /> */}
        </div>
      </div>
    </div>
  );
}
