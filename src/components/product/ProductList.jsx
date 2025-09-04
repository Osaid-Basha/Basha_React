import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';


export default function ProductList({ title = 'منتجات مختارة', layout = 'grid', viewAllHref, query = '', minPrice, maxPrice, minRate, sort, hasDiscountOnly = false }) {
  const [favoriteIds, setFavoriteIds] = React.useState(new Set());
  const [addedIds, setAddedIds] = React.useState(new Set());
 
  

  const addToCart = async(id) => {
   
    const token=localStorage.getItem('auth_token')
   
     const response = await axios.post('https://kashop1.runasp.net/api/Customer/Carts', {productId: id },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
     );
     
  };
 

  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://kashop1.runasp.net/api/Customer/Products');
        const data = await res.data;
        console.log(data);
        
       
          setProducts(data);
        
      } catch (e) {
        console.log(e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  const isCarousel = layout === 'carousel';
  const normalizedQuery = String(query || '').trim().toLowerCase();
  const filtered = products
    .filter((p) => !normalizedQuery || String(p.name || '').toLowerCase().includes(normalizedQuery))
    .filter((p) => (minPrice == null || Number(p.price) >= Number(minPrice)))
    .filter((p) => (maxPrice == null || Number(p.price) <= Number(maxPrice)))
    .filter((p) => (minRate == null || Number(p.rate || 0) >= Number(minRate)))
    .filter((p) => (!hasDiscountOnly || Number(p.discount) > 0));
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return Number(a.price) - Number(b.price);
    if (sort === 'price-desc') return Number(b.price) - Number(a.price);
    if (sort === 'rate-desc') return Number(b.rate || 0) - Number(a.rate || 0);
    return 0;
  });
  const itemsToRender = sorted;
  const trackRef = React.useRef(null);
  const scrollByAmount = (amount) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const formatPrice = (n) => `${Number(n).toFixed(2)}$`;
  const getReviewsCount = (p) => (p.reviewsCount ?? (p.id ? 20 + ((p.id * 37) % 180) : 48));
  const renderStars = (rateValue) => {
    const full = Math.round(Number(rateValue || 0));
    return Array.from({ length: 5 }).map((_, i) => (
      i < full ? <StarIcon key={i} sx={{ fontSize: 14, color: '#f59e0b' }} /> : <StarBorderIcon key={i} sx={{ fontSize: 14, color: '#f59e0b' }} />
    ));
  };

  return (
    <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 3, md: 4 } }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 800, letterSpacing: '0.02em' }}>
          {title}
        </Typography>
        {viewAllHref && (
          <Button size="small" href={viewAllHref} sx={{ textTransform: 'none', color: '#4f46e5' }}>عرض المزيد</Button>
        )}
      </Box>

      <Box
        sx={{
          background: 'rgba(255,255,255,0.78)',
          border: '1px solid rgba(15,23,42,0.06)',
          backdropFilter: 'blur(10px) saturate(160%)',
          boxShadow: '0 6px 24px rgba(83,100,173,0.14)',
          borderRadius: 2,
          p: { xs: 0.75, sm: 1.25, md: 1.5 },
        }}
      >
        {isLoading && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: { xs: 1, sm: 1.25, md: 1.5 } }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Box key={i} sx={{ background: '#fff', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ aspectRatio: '4 / 3', background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%)', backgroundSize: '400% 100%', animation: 'shimmer 1.4s ease infinite' }} />
                <Box sx={{ p: 1 }}>
                  <Box sx={{ height: 14, backgroundColor: '#e5e7eb', borderRadius: 1, mb: 0.5 }} />
                  <Box sx={{ height: 12, width: '70%', backgroundColor: '#e5e7eb', borderRadius: 1, mb: 1 }} />
                  <Box sx={{ height: 16, width: '40%', backgroundColor: '#e5e7eb', borderRadius: 1 }} />
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {isCarousel && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 0.5 }}>
            <Button variant="outlined" size="small" onClick={() => scrollByAmount(-320)} sx={{ textTransform: 'none' }}>السابق</Button>
            <Button variant="outlined" size="small" onClick={() => scrollByAmount(320)} sx={{ textTransform: 'none' }}>التالي</Button>
          </Box>
        )}
        {!isLoading && (
        <Box
          ref={isCarousel ? trackRef : undefined}
          sx={{
            display: isCarousel ? 'grid' : 'grid',
            gridAutoFlow: isCarousel ? 'column' : 'row',
            gridAutoColumns: isCarousel ? { xs: '70%', sm: '48%', md: '32%', lg: '24%' } : 'unset',
            gridTemplateColumns: isCarousel ? 'unset' : {
              xs: 'repeat(2, minmax(0, 1fr))',
              sm: 'repeat(3, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
              lg: 'repeat(5, minmax(0, 1fr))',
            },
            gap: { xs: 1, sm: 1.25, md: 1.5 },
            overflowX: isCarousel ? 'auto' : 'visible',
            scrollSnapType: isCarousel ? 'x mandatory' : 'none',
            px: isCarousel ? { xs: 0.5, sm: 1 } : 0,
            '&::-webkit-scrollbar': isCarousel ? { display: 'none' } : undefined,
          }}
        >
          {itemsToRender.map((p) => {
            const hasDiscount = Number(p.discount) > 0;
            const finalPrice = hasDiscount ? (Number(p.price) * (1 - Number(p.discount) / 100)) : Number(p.price);
            const priceColor = hasDiscount ? '#16a34a' : '#111827';
            return (
              <Box
                key={p.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  background: '#fff',
                  border: '1px solid rgba(15,23,42,0.08)',
                  boxShadow: '0 4px 14px rgba(15,23,42,0.06)',
                  overflow: 'hidden',
                  scrollSnapAlign: isCarousel ? 'center' : 'unset',
                  position: 'relative',
                  transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 26px rgba(15,23,42,0.12)', borderColor: 'rgba(15,23,42,0.12)' },
                  '&:hover .actionsBar': { transform: 'translateY(0%)' }
                }}
              >
                <Box component={Link} to={`/product/${p.id}`} sx={{ position: 'relative', aspectRatio: '4 / 3', background: 'linear-gradient(180deg, #f8fbff, #eef4ff)', textDecoration: 'none', color: 'inherit' }}>
                  {hasDiscount && (
                    <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1, px: 0.75, py: 0.25, borderRadius: 1, background: 'linear-gradient(90deg, #ef4444, #f59e0b)', color: '#fff', fontSize: 11, fontWeight: 800 }}>
                      -{Number(p.discount)}%
                    </Box>
                  )}
                  <Box component="img" src={p.mainImageUrl} alt={p.name} sx={{ width: '100%', height: '100%', objectFit: 'contain', p: { xs: 1.25, md: 1.5 }, maxWidth: '92%', maxHeight: '92%', mx: 'auto', transition: 'transform 220ms ease', filter: 'drop-shadow(0 6px 16px rgba(15,23,42,0.08))', '&:hover': { transform: 'scale(1.03)' } }} />
                </Box>
                <Box component={Link} to={`/product/${p.id}`} sx={{ p: 1, display: 'grid', gap: 0.5, textDecoration: 'none', color: 'inherit' }}>
                  <Typography sx={{ fontSize: { xs: 13.5, md: 14.5 }, fontWeight: 800, color: '#0f172a', lineHeight: 1.45, letterSpacing: '0.005em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {p.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.15 }}>
                      {renderStars(p.rate)}
                    </Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'rgba(15,23,42,0.7)' }}>
                      {Number(p.rate || 0).toFixed(1)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                    <Typography sx={{ fontWeight: 900, color: priceColor, fontSize: { xs: 16, md: 17 } }}>{formatPrice(finalPrice)}</Typography>
                    {hasDiscount && (
                      <Typography sx={{ color: 'rgba(15,23,42,0.5)', textDecoration: 'line-through', fontSize: 12 }}>
                        {formatPrice(p.price)}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: 'absolute', left: 0, right: 0, bottom: 0,
                    transform: 'translateY(100%)',
                    transition: 'transform 200ms ease',
                    p: 0.75,
                    background: 'rgba(255,255,255,0.92)',
                    borderTop: '1px solid rgba(15,23,42,0.08)'
                  }}
                  className="actionsBar"
                >
                  <Button onClick={() => addToCart(p.id)} fullWidth startIcon={<AddShoppingCartIcon />} sx={{ textTransform: 'none', background: addedIds.has(p.id) ? 'linear-gradient(90deg, #22c55e, #10b981)' : 'rgba(15,23,42,0.08)', color: addedIds.has(p.id) ? '#fff' : '#0f172a', '&:hover': { background: addedIds.has(p.id) ? 'linear-gradient(90deg, #16a34a, #0ea5a3)' : 'rgba(15,23,42,0.14)' } }}>
                    {addedIds.has(p.id) ? 'تمت الإضافة' : 'أضف إلى السلة'}
                  </Button>
                </Box>
                <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
              </Box>
            );
          })}
        </Box>
        )}
        {!isLoading && itemsToRender.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6, color: 'rgba(15,23,42,0.7)' }}>
            <Typography sx={{ fontWeight: 800, mb: 0.5 }}>لا توجد نتائج مطابقة</Typography>
            <Typography sx={{ fontSize: 13 }}>جرّب تعديل الفلاتر أو مسح البحث</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}


