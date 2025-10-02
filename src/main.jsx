import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Using Google Fonts (Inter/Outfit) loaded in index.html for a consistent look
import 'react-toastify/dist/ReactToastify.css'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import CounterContextProvider from './context/CounterContext.jsx'
import ThemeContextProvider, { useTheme } from './context/ThemeContext.jsx'

function AppWithMuiTheme() {
  const { theme } = useTheme();
  
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <LanguageProvider>
        <CounterContextProvider>
          <AppWithMuiTheme />
          <ToastContainer />
        </CounterContextProvider>
      </LanguageProvider>
    </ThemeContextProvider>
  </StrictMode>
)
