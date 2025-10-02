import { createContext, useState, useContext } from "react";
import { createTheme } from '@mui/material/styles';

// Light theme colors
const lightColors = {
  primary: {
    main: '#4f46e5',
    light: '#6366f1',
    dark: '#3730a3',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#06b6d4',
    light: '#22d3ee',
    dark: '#0891b2',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f7faff',
    paper: '#ffffff',
  },
  text: {
    primary: '#0f172a',
    secondary: 'rgba(15, 23, 42, 0.88)',
    disabled: 'rgba(15, 23, 42, 0.7)',
  },
};

// Dark theme colors
const darkColors = {
  primary: {
    main: '#6366f1',
    light: '#818cf8',
    dark: '#4f46e5',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#22d3ee',
    light: '#67e8f9',
    dark: '#06b6d4',
    contrastText: '#0f172a',
  },
  background: {
    default: '#0f172a',
    paper: '#1e293b',
  },
  text: {
    primary: '#f8fafc',
    secondary: 'rgba(248, 250, 252, 0.88)',
    disabled: 'rgba(248, 250, 252, 0.7)',
  },
};

const createAppTheme = (mode) => {
  const colors = mode === 'dark' ? darkColors : lightColors;
  
  return createTheme({
    palette: {
      mode,
      ...colors,
    },
    typography: {
      fontFamily: '"Inter", "Outfit", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
  });
};

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({children}) => {
    const [mode, setMode] = useState(() => {
      const savedMode = localStorage.getItem('theme-mode');
      return savedMode || 'light';
    });
    
    const currentTheme = createAppTheme(mode);
    
    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme-mode', newMode);
        
        // Update CSS custom properties
        const root = document.documentElement;
        if (newMode === 'dark') {
          root.style.setProperty('--text-strong', '#f8fafc');
          root.style.setProperty('--text', 'rgba(248, 250, 252, 0.88)');
          root.style.setProperty('--text-soft', 'rgba(248, 250, 252, 0.7)');
          root.style.setProperty('--primary', '#6366f1');
          root.style.setProperty('--primary-2', '#22d3ee');
          root.style.setProperty('--background', '#0f172a');
          root.style.setProperty('--background-paper', '#1e293b');
        } else {
          root.style.setProperty('--text-strong', '#0f172a');
          root.style.setProperty('--text', 'rgba(15, 23, 42, 0.88)');
          root.style.setProperty('--text-soft', 'rgba(15, 23, 42, 0.7)');
          root.style.setProperty('--primary', '#4f46e5');
          root.style.setProperty('--primary-2', '#06b6d4');
          root.style.setProperty('--background', '#f7faff');
          root.style.setProperty('--background-paper', '#ffffff');
        }
    };
    
    return (
        <ThemeContext.Provider value={{theme: currentTheme, toggleTheme, mode, isDark: mode === 'dark'}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContextProvider;