import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from './components/context/provider';
import { I18nProvider } from './i18n/I18nProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <Provider>
        <App />
      </Provider>
    </I18nProvider>
  </StrictMode>
);
