import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Using Google Fonts (Inter/Outfit) loaded in index.html for a consistent look
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LanguageProvider } from './i18n/LanguageContext.jsx'


createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <App />
    <ToastContainer position="top-right" theme="light" autoClose={1500} closeOnClick newestOnTop pauseOnHover={false} />
  </LanguageProvider>
)
