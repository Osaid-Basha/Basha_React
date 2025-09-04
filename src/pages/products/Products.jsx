import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductList from '../../components/product/ProductList';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export default function Products() {
  const [query, setQuery] = React.useState('');
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [minRate, setMinRate] = React.useState(0);
  const [sort, setSort] = React.useState('rate-desc');
  const [hasDiscountOnly, setHasDiscountOnly] = React.useState(false);
  const [pricePreset, setPricePreset] = React.useState('all');
  const [ratePreset, setRatePreset] = React.useState('any');

  
  return (
    <>
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(135deg, #eef2ff 0%, #fff 40%)',
          borderBottom: '1px solid rgba(15,23,42,0.06)',
        }}
      >
        <Box
          sx={{
            width: 'min(1400px, 96%)',
            mx: 'auto',
            py: { xs: 4, md: 6 },
            display: 'grid',
            gap: 1,
            textAlign: 'right',
          }}
        >
          <Typography sx={{ fontSize: { xs: 24, md: 36 }, fontWeight: 900, letterSpacing: '0.01em' }}>
            استكشف منتجاتنا
          </Typography>
          <Typography sx={{ color: 'rgba(15,23,42,0.7)', fontSize: { xs: 13.5, md: 15 } }}>
            تشكيلات مختارة بعناية بتصاميم عصرية وجودة عالية.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 2, md: 3 }, mb: { xs: 1, md: 2 } }}>
        <Box sx={{ position: 'sticky', top: 72, zIndex: 5, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr 1fr' }, gap: 1.25, alignItems: 'center', background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 2, p: { xs: 1, md: 1.25 }, boxShadow: '0 8px 24px rgba(15,23,42,0.08)', backdropFilter: 'blur(6px)', direction: 'rtl' }}>
          <TextField size="small" label="بحث" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Box sx={{ px: 1 }}>
            <Typography sx={{ fontSize: 12, mb: 0.5, textAlign: 'right' }}>السعر</Typography>
            <Slider value={priceRange} onChange={(_, v) => { setPricePreset('custom'); setPriceRange(v); }} valueLabelDisplay="auto" max={2000} step={10} />
          </Box>
          <TextField size="small" select label="الحد الأدنى للتقييم" value={minRate} onChange={(e) => { setRatePreset('custom'); setMinRate(Number(e.target.value)); }}>
            {[0, 3, 4, 4.5].map((r) => (
              <MenuItem key={r} value={r}>{r}+</MenuItem>
            ))}
          </TextField>
          <TextField size="small" select label="ترتيب" value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="rate-desc">الأعلى تقييمًا</MenuItem>
            <MenuItem value="price-asc">السعر: من الأقل للأعلى</MenuItem>
            <MenuItem value="price-desc">السعر: من الأعلى للأقل</MenuItem>
          </TextField>
          <Button variant={hasDiscountOnly ? 'contained' : 'outlined'} onClick={() => setHasDiscountOnly(v => !v)} sx={{ textTransform: 'none' }}>
            عروض فقط
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, justifyContent: 'flex-end' }}>
          <Button size="small" variant={pricePreset === 'all' ? 'contained' : 'outlined'} onClick={() => { setPricePreset('all'); setPriceRange([0, 2000]); }}>الكل</Button>
          <Button size="small" variant={pricePreset === 'low' ? 'contained' : 'outlined'} onClick={() => { setPricePreset('low'); setPriceRange([0, 100]); }}>0 - 100</Button>
          <Button size="small" variant={pricePreset === 'mid' ? 'contained' : 'outlined'} onClick={() => { setPricePreset('mid'); setPriceRange([100, 300]); }}>100 - 300</Button>
          <Button size="small" variant={pricePreset === 'high' ? 'contained' : 'outlined'} onClick={() => { setPricePreset('high'); setPriceRange([300, 700]); }}>300 - 700</Button>
          <Button size="small" variant={ratePreset === '4' ? 'contained' : 'outlined'} onClick={() => { setRatePreset('4'); setMinRate(4); }}>4+ نجوم</Button>
          <Button size="small" variant={ratePreset === '4.5' ? 'contained' : 'outlined'} onClick={() => { setRatePreset('4.5'); setMinRate(4.5); }}>4.5+ نجوم</Button>
        </Box>
      </Box>

      <Box sx={{ my: { xs: 2, md: 3 } }}>
        <ProductList title="النتائج" layout="grid" query={query} minPrice={priceRange[0]} maxPrice={priceRange[1]} minRate={minRate} sort={sort} hasDiscountOnly={hasDiscountOnly} />
      </Box>

      <Box sx={{ my: { xs: 1, md: 2 } }}>
        <ProductList title="جديدنا" layout="grid" />
      </Box>
    </>
  );
}


