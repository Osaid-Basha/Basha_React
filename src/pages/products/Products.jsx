import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Slider,
  MenuItem,
  Button
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';
import ProductList from '../../components/product/ProductList';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Products() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [minRate, setMinRate] = React.useState(0);
  const [sort, setSort] = React.useState('rate-desc');
  const [hasDiscountOnly, setHasDiscountOnly] = React.useState(false);
  const [pricePreset, setPricePreset] = React.useState('all');
  const [ratePreset, setRatePreset] = React.useState('any');

  
  return (
    <Box sx={{ 
      width: 'min(1400px, 96%)', 
      mx: 'auto', 
      mt: { xs: 3, md: 4 }, 
      p: 2,
      direction: dir,
      minHeight: '100vh'
    }}>
      {/* Header */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        border: '1px solid rgba(79, 70, 229, 0.15)',
        backdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 4,
        p: 6,
        mb: 6,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <Box sx={{ 
          position: 'absolute', 
          top: -30, 
          right: -30, 
          width: 80, 
          height: 80, 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)', 
          zIndex: 0 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: -20, 
          left: -20, 
          width: 60, 
          height: 60, 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(245, 158, 11, 0.15) 100%)', 
          zIndex: 0 
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              textTransform: 'none', 
              color: 'rgba(15,23,42,0.8)',
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(79, 70, 229, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderColor: 'rgba(79, 70, 229, 0.3)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {t('back')}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Box sx={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
              mb: 3,
              boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 12px 32px rgba(79, 70, 229, 0.6)'
              }
            }}>
              <ShoppingBagIcon sx={{ color: 'white', fontSize: 40 }} />
            </Box>
            
            <Typography sx={{ 
              fontSize: 32, 
              fontWeight: 900, 
              color: '#16a34a',
              mb: 3,
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {t('explore_products')}
            </Typography>
            
            <Typography sx={{ 
              fontSize: 18, 
              color: 'rgba(15,23,42,0.7)', 
              fontWeight: 500,
              textAlign: 'center',
              lineHeight: 1.6,
              maxWidth: 600,
              mx: 'auto',
              mb: 2
            }}>
              {t('explore_products_subtitle')}
            </Typography>
            
            <Typography sx={{ 
              fontSize: 15, 
              color: 'rgba(15,23,42,0.6)', 
              fontWeight: 400,
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: 500,
              mx: 'auto'
            }}>
              {t('explore_products_description') || 'اكتشف مجموعة واسعة من المنتجات عالية الجودة بأسعار تنافسية'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 2, md: 3 }, mb: { xs: 1, md: 2 } }}>
        <Box sx={{ position: 'sticky', top: 72, zIndex: 5, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr 1fr' }, gap: 1.25, alignItems: 'center', background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 2, p: { xs: 1, md: 1.25 }, boxShadow: '0 8px 24px rgba(15,23,42,0.08)', backdropFilter: 'blur(6px)', direction: dir }}>
          <TextField size="small" label={t('search')} value={query} onChange={(e) => setQuery(e.target.value)} />
          <Box sx={{ px: 1 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5, textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('price')}</Typography>
            <Slider value={priceRange} onChange={(_, v) => { setPricePreset('custom'); setPriceRange(v); }} valueLabelDisplay="auto" max={2000} step={10} />
          </Box>
          <TextField size="small" select label={t('min_rating')} value={minRate} onChange={(e) => { setRatePreset('custom'); setMinRate(Number(e.target.value)); }}>
            {[0, 3, 4, 4.5].map((r) => (
              <MenuItem key={r} value={r}>{r}+</MenuItem>
            ))}
          </TextField>
          <TextField size="small" select label={t('sort')} value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="rate-desc">{t('highest_rated')}</MenuItem>
            <MenuItem value="price-asc">{t('price_low_to_high')}</MenuItem>
            <MenuItem value="price-desc">{t('price_high_to_low')}</MenuItem>
          </TextField>
          <Button variant={hasDiscountOnly ? 'contained' : 'outlined'} onClick={() => setHasDiscountOnly(v => !v)} sx={{ textTransform: 'none' }}>
            {t('offers_only')}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, justifyContent: dir === 'rtl' ? 'flex-end' : 'flex-start' }}>
          <Button size="small" variant={pricePreset === 'all' ? 'contained' : 'outlined'} onClick={() => { setPricePreset('all'); setPriceRange([0, 2000]); }}>{t('all')}</Button>
          <Button size="small" variant={pricePreset === 'low' ? 'contained' : 'outlined'} onClick={() => { setPricePreset('low'); setPriceRange([0, 100]); }}>0 - 100</Button>
          <Button size="small" variant={pricePreset === 'mid' ? 'contained' : 'outlined'} onClick={() => { setPricePreset('mid'); setPriceRange([100, 300]); }}>100 - 300</Button>
          <Button size="small" variant={pricePreset === 'high' ? 'contained' : 'outlined'} onClick={() => { setPricePreset('high'); setPriceRange([300, 700]); }}>300 - 700</Button>
          <Button size="small" variant={ratePreset === '4' ? 'contained' : 'outlined'} onClick={() => { setRatePreset('4'); setMinRate(4); }}>4+ {t('stars')}</Button>
          <Button size="small" variant={ratePreset === '4.5' ? 'contained' : 'outlined'} onClick={() => { setRatePreset('4.5'); setMinRate(4.5); }}>4.5+ {t('stars')}</Button>
        </Box>
      </Box>

      <Box sx={{ my: { xs: 2, md: 3 } }}>
        <ProductList title={t('results')} layout="grid" query={query} minPrice={priceRange[0]} maxPrice={priceRange[1]} minRate={minRate} sort={sort} hasDiscountOnly={hasDiscountOnly} />
      </Box>

      <Box sx={{ my: { xs: 1, md: 2 } }}>
        <ProductList title={t('our_new')} layout="grid" />
      </Box>
    </Box>
  );
}

