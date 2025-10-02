import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ThemeToggle() {
  const { toggleTheme, mode } = useTheme();
  const { t, dir } = useLanguage();

  return (
    <Tooltip title={mode === 'light' ? 'الوضع الداكن' : 'Light Mode'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: 'inherit',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        {mode === 'light' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
