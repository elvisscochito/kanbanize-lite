import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import global_es from './assets/translations/es/global.json'
import global_en from './assets/translations/en/global.json'

i18next.init({
  interpolate: { escapeValue: false },
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
  },
  lng: localStorage.getItem('language') || 'es',
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
)
