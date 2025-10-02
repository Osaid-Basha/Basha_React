import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../i18n/LanguageContext.jsx';


export default function Categories() {
  const { t, dir } = useLanguage();
 
  const fetchCategories = async () => {
    const response = await AxiosUserInstanse.get('/Categories');
    return response.data;
  };
  const {data,isLoading,isError,error}= useQuery({
    queryKey:['Categories'],
    queryFn:fetchCategories,
    staleTime:1000*60*5
  })

  return (
    <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 800, letterSpacing: '0.02em' }}>
          {t('categories')}
        </Typography>
      </Box>

      <Box
        sx={{
          background: 'rgba(255,255,255,0.78)',
          border: '1px solid rgba(15,23,42,0.06)',
          backdropFilter: 'blur(10px) saturate(160%)',
          boxShadow: '0 6px 24px rgba(83,100,173,0.14)',
          borderRadius: 2,
          p: { xs: 1, sm: 1.5, md: 2 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              sm: 'repeat(3, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
              lg: 'repeat(6, minmax(0, 1fr))',
            },
            gap: { xs: 1, sm: 1.25, md: 1.5 },
          }}
        >
          {(data ?? []).map((c) => (
            <Box
              key={c.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 64,
                borderRadius: 2,
                background: '#fff',
                border: '1px solid rgba(15,23,42,0.12)',
                px: 1.5,
                textAlign: 'center',
                transition: 'background 140ms ease, border-color 140ms ease',
                '&:hover': { background: 'rgba(15,23,42,0.035)', borderColor: 'rgba(15,23,42,0.18)' }
              }}
            >
              <Typography sx={{ fontWeight: 700, color: '#0f172a', letterSpacing: '0.02em', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', maxWidth: '100%' }}>
                {c.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}


