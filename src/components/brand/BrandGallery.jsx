import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import {useQuery} from "@tanstack/react-query"
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function BrandGallery() {
  const { t, dir } = useLanguage();

    const fetchBrands = async () => {
      const response = await AxiosUserInstanse.get('/Brands');
      return response.data;
    };
    const {data,isLoading,isError,error}= useQuery({
      queryKey:['Brands'],
      queryFn:fetchBrands,
      staleTime:1000*60*5
    })
 
    


  return (
    <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 800, letterSpacing: '0.02em' }}>
          {t('featured_brands')}
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
            },
            gap: { xs: 1, sm: 1.25, md: 1.5 },
          }}
        >
          {(data ?? []).map((b, idx) => (
            <Box
              key={b.id ?? idx}
              sx={{
                height: 150,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
                background: '#fff',
                border: '1px solid rgba(15,23,42,0.06)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 220ms ease, box-shadow 220ms ease, background 220ms ease, filter 220ms ease',
                boxShadow: '0 8px 22px rgba(15,23,42,0.08)',
              }}
              title={b.name || 'Brand'}
            >
              <Box sx={{
                width: 72, height: 72, borderRadius: '50%', background: 'rgba(248,250,255,0.9)',
                border: '1px solid rgba(15,23,42,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', mb: 1,
              }}>
               {b.mainImageUrl ? (
  <Box
    component="img"
    src={b.mainImageUrl}
    alt={b.name || 'Brand'}
    sx={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain' }}
  />
) : (
  <Box
    sx={{
      width: '70%',
      height: '70%',
      borderRadius: 1.25,
      background: 'linear-gradient(90deg, rgba(99,102,241,0.15), rgba(34,211,238,0.15))',
      border: '1px solid rgba(15,23,42,0.08)',
    }}
  />
)}

              </Box>
              <Typography sx={{ fontSize: 13, color: 'rgba(15,23,42,0.8)', fontWeight: 700, maxWidth: '90%', textAlign: 'center', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {b.name || 'Brand'}
              </Typography>
              <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(80% 60% at 50% 50%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 60%)' }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}


