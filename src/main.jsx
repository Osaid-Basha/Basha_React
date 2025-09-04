import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Using Google Fonts (Inter/Outfit) loaded in index.html for a consistent look
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer position="top-right" theme="light" autoClose={1500} closeOnClick newestOnTop pauseOnHover={false} />
  </>
)
