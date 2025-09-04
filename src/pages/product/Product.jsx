import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import ProductList from '../../components/product/ProductList';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeImage, setActiveImage] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [isInCart, setIsInCart] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const renderStars = (rateValue) => {
    const full = Math.round(Number(rateValue || 0));
    return Array.from({ length: 5 }).map((_, i) => (
      i < full ? <StarIcon key={i} sx={{ fontSize: 18, color: '#f59e0b' }} /> : <StarBorderIcon key={i} sx={{ fontSize: 18, color: '#f59e0b' }} />
    ));
  };

    React.useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://kashop1.runasp.net/api/Customer/Products/${id}`);
        const data = response.data;
        if (isMounted) {
          setProduct(data);
          setActiveImage(data.mainImageUrl || '');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    fetchProduct();
    return () => { isMounted = false; };
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 3, md: 4 } }}>
        <Typography>جارِ التحميل...</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 3, md: 4 } }}>
        <Typography>المنتج غير متاح</Typography>
      </Box>
    );
  }

  const hasDiscount = Number(product.discount) > 0;
  const finalPrice = hasDiscount ? (Number(product.price) * (1 - Number(product.discount) / 100)) : Number(product.price);
  const totalPrice = finalPrice * quantity;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.quantity || 999)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: quantity,
      image: product.mainImageUrl,
      maxQuantity: product.quantity
    };
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setIsInCart(true);
    
    // Show success message
    alert(`تم إضافة ${quantity} قطعة إلى السلة!`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // You can also save to localStorage or API here
  };

  return (
    <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 3, md: 4 }, direction: 'rtl' }}>
      {/* Main Header */}
      <Box sx={{ textAlign: 'center', mb: 4, p: 3, background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(34,197,94,0.1) 50%, rgba(245,158,11,0.1) 100%)', borderRadius: 3, border: '1px solid rgba(99,102,241,0.2)', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -50, right: -50, width: 100, height: 100, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', zIndex: 0 }} />
        <Box sx={{ position: 'absolute', bottom: -30, left: -30, width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', zIndex: 0 }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography sx={{ 
            fontSize: { xs: 24, md: 36 }, 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 50%, #f59e0b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            تفاصيل المنتج
          </Typography>
          <Typography sx={{ 
            fontSize: { xs: 14, md: 16 }, 
            color: 'rgba(15,23,42,0.7)', 
            fontWeight: 500,
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}>
            اكتشف كل التفاصيل والمميزات الخاصة بهذا المنتج المميز
          </Typography>
        </Box>
      </Box>

      {/* Product Header Section */}
      <Box sx={{ mb: 3, p: 2, background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(34,197,94,0.08) 100%)', borderRadius: 2, border: '1px solid rgba(99,102,241,0.15)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
          <Box sx={{ textAlign: 'right', flex: 1 }}>
            <Typography sx={{ fontSize: { xs: 20, md: 28 }, fontWeight: 900, mb: 1 }}>{product.name}</Typography>
            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              {product.categoryName && <Chip label={product.categoryName} size="small" sx={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#4f46e5', fontWeight: 700 }} />}
              {product.brandName && <Chip label={product.brandName} size="small" sx={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#16a34a', fontWeight: 700 }} />}
              {hasDiscount && <Chip label={`خصم ${Number(product.discount)}%`} size="small" sx={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', fontWeight: 800 }} />}
            </Box>
          </Box>
          <IconButton onClick={async () => {
            try {
              if (navigator.share) {
                await navigator.share({ title: product.name, url: window.location.href });
              } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(window.location.href);
                alert('تم نسخ الرابط');
              }
            } catch {}
          }}>
            <ShareIcon />
          </IconButton>
        </Box>
        
        {/* Delivery & Info Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 1.5, mt: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, background: 'rgba(255,255,255,0.6)', borderRadius: 1.5, border: '1px solid rgba(99,102,241,0.1)' }}>
            <LocalShippingIcon sx={{ color: '#4f46e5', fontSize: 20 }} />
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#4f46e5' }}>توصيل سريع</Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(15,23,42,0.7)' }}>خلال 24-48 ساعة</Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, background: 'rgba(255,255,255,0.6)', borderRadius: 1.5, border: '1px solid rgba(34,197,94,0.1)' }}>
            <ReplayIcon sx={{ color: '#16a34a', fontSize: 20 }} />
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#16a34a' }}>استرجاع مجاني</Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(15,23,42,0.7)' }}>خلال 14 يوم</Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, background: 'rgba(255,255,255,0.6)', borderRadius: 1.5, border: '1px solid rgba(245,158,11,0.1)' }}>
            <StarIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>تقييم المنتج</Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(15,23,42,0.7)' }}>{product.rate}/5 نجوم</Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, background: 'rgba(255,255,255,0.6)', borderRadius: 1.5, border: '1px solid rgba(99,102,241,0.1)' }}>
            <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>✓</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#4f46e5' }}>متوفر الآن</Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(15,23,42,0.7)' }}>{product.quantity} قطعة</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 2, md: 3 }, alignItems: 'start' }}>
        <Box sx={{ background: '#fff', border: '1px solid rgba(15,23,42,0.08)', borderRadius: 2, p: { xs: 1.25, md: 1.75 }, boxShadow: '0 8px 22px rgba(15,23,42,0.06)', position: 'relative' }}>
          {hasDiscount && (
            <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1, px: 1, py: 0.5, borderRadius: 1, background: 'linear-gradient(90deg, #ef4444, #f59e0b)', color: '#fff', fontSize: 12, fontWeight: 900 }}>-{Number(product.discount)}%</Box>
          )}
          <Box component="img" src={activeImage || product.mainImageUrl} alt={product.name} sx={{ width: '100%', height: { xs: 300, md: 460 }, objectFit: 'contain', display: 'block' }} />
          <Box sx={{ mt: 1, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[product.mainImageUrl].filter(Boolean).map((src, i) => (
              <Box key={i} onClick={() => setActiveImage(src)} sx={{ width: 64, height: 64, borderRadius: 1, border: '1px solid rgba(15,23,42,0.12)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: activeImage === src ? '2px solid #4f46e5' : 'none' }}>
                <Box component="img" src={src} alt="thumb" sx={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 1, textAlign: 'right' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.15 }}>{renderStars(product.rate)}</Box>
            <Typography sx={{ fontSize: 13, color: 'rgba(15,23,42,0.7)', fontWeight: 800 }}>{Number(product.rate || 0).toFixed(1)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.6, justifyContent: 'flex-end' }}>
            <Typography sx={{ fontWeight: 900, color: hasDiscount ? '#16a34a' : '#111827', fontSize: { xs: 22, md: 24 } }}>{finalPrice.toFixed(2)}$</Typography>
            {hasDiscount && (
              <Typography sx={{ color: 'rgba(15,23,42,0.6)', textDecoration: 'line-through', fontSize: 13 }}>
                {Number(product.price).toFixed(2)}$
              </Typography>
            )}
          </Box>



          <Divider sx={{ my: 1 }} />

          {!!product.description && (
            <Typography sx={{ color: 'rgba(15,23,42,0.9)', fontSize: 14, lineHeight: 1.85, display: '-webkit-box', WebkitLineClamp: { xs: 6, md: 8 }, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {product.description}
            </Typography>
          )}

          <Box sx={{ mt: 2, p: 2, background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(34,197,94,0.05) 100%)', borderRadius: 2, border: '1px solid rgba(99,102,241,0.1)' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#4f46e5', mb: 1, textAlign: 'right' }}>
              لماذا تختار هذا المنتج؟
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'rgba(15,23,42,0.8)', lineHeight: 1.7, textAlign: 'right' }}>
              منتج عالي الجودة من {product.brandName || 'ماركة موثوقة'} في قسم {product.categoryName || 'المتجر'}. 
              يتميز بتصميم عصري وجودة ممتازة مع ضمان الرضا التام. 
              {hasDiscount && ` احصل عليه الآن بخصم ${Number(product.discount)}% ووفر المال!`}
            </Typography>
          </Box>

          {/* Quantity Controls */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: 'rgba(15,23,42,0.8)', mb: 1, textAlign: 'right' }}>
              الكمية:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
              <IconButton 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                sx={{ 
                  width: 40, 
                  height: 40, 
                  border: '2px solid rgba(99,102,241,0.2)', 
                  borderRadius: 2,
                  '&:hover': { background: 'rgba(99,102,241,0.1)' },
                  '&:disabled': { opacity: 0.3 }
                }}
              >
                <RemoveIcon sx={{ fontSize: 18, color: '#4f46e5' }} />
              </IconButton>
              
              <Box sx={{ 
                minWidth: 60, 
                height: 40, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'rgba(99,102,241,0.05)',
                border: '2px solid rgba(99,102,241,0.2)',
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 16,
                color: '#4f46e5'
              }}>
                {quantity}
              </Box>
              
              <IconButton 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (product?.quantity || 999)}
                sx={{ 
                  width: 40, 
                  height: 40, 
                  border: '2px solid rgba(99,102,241,0.2)', 
                  borderRadius: 2,
                  '&:hover': { background: 'rgba(99,102,241,0.1)' },
                  '&:disabled': { opacity: 0.3 }
                }}
              >
                <AddIcon sx={{ fontSize: 18, color: '#4f46e5' }} />
              </IconButton>
            </Box>
            <Typography sx={{ fontSize: 12, color: 'rgba(15,23,42,0.6)', mt: 0.5, textAlign: 'right' }}>
              متوفر: {product?.quantity || 0} قطعة
            </Typography>
          </Box>

          {/* Price Summary */}
          <Box sx={{ 
            p: 2, 
            background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(34,197,94,0.05) 100%)', 
            borderRadius: 2, 
            border: '1px solid rgba(99,102,241,0.1)',
            mb: 2
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontSize: 14, color: 'rgba(15,23,42,0.7)' }}>السعر الإجمالي:</Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 900, color: hasDiscount ? '#16a34a' : '#111827' }}>
                {totalPrice.toFixed(2)}$
              </Typography>
            </Box>
            {hasDiscount && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 12, color: 'rgba(15,23,42,0.6)' }}>وفرت:</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>
                  {((Number(product.price) * quantity) - totalPrice).toFixed(2)}$
                </Typography>
              </Box>
            )}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <Button 
              variant="contained" 
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={isInCart}
              sx={{ 
                textTransform: 'none', 
                borderRadius: 2, 
                px: 3,
                py: 1.5,
                background: isInCart ? 'rgba(34,197,94,0.8)' : 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                '&:hover': {
                  background: isInCart ? 'rgba(34,197,94,0.9)' : 'linear-gradient(135deg, #3730a3 0%, #15803d 100%)'
                },
                boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
              }}
            >
              {isInCart ? 'تم الإضافة' : 'أضف إلى السلة'}
            </Button>
            
            <Button 
              variant="outlined" 
              onClick={() => window.location.href = '/cart'}
              sx={{ 
                textTransform: 'none', 
                borderRadius: 2, 
                px: 3,
                py: 1.5,
                border: '2px solid #4f46e5',
                color: '#4f46e5',
                '&:hover': {
                  background: 'rgba(99,102,241,0.1)',
                  border: '2px solid #3730a3'
                }
              }}
            >
              اشتري الآن
            </Button>
            
            <IconButton 
              onClick={handleToggleFavorite}
              sx={{ 
                border: '2px solid rgba(239,68,68,0.2)', 
                borderRadius: 2,
                width: 48,
                height: 48,
                '&:hover': { 
                  background: 'rgba(239,68,68,0.1)',
                  border: '2px solid rgba(239,68,68,0.4)'
                }
              }}
            >
              {isFavorite ? 
                <FavoriteIcon sx={{ fontSize: 20, color: '#ef4444' }} /> : 
                <FavoriteBorderIcon sx={{ fontSize: 20, color: '#ef4444' }} />
              }
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: { xs: 3, md: 4 } }}>
        <ProductList title="منتجات مشابهة" layout="carousel" query={(product.brandName || product.categoryName || '')} />
      </Box>

      {/* Sticky Mobile Buy Bar */}
      <Box sx={{ 
        position: 'sticky', 
        bottom: 0, 
        display: { xs: 'flex', md: 'none' }, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2, 
        background: 'rgba(255,255,255,0.96)', 
        borderTop: '1px solid rgba(15,23,42,0.08)', 
        backdropFilter: 'blur(6px)',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: 12, color: 'rgba(15,23,42,0.6)' }}>السعر الإجمالي</Typography>
          <Typography sx={{ fontWeight: 900, color: hasDiscount ? '#16a34a' : '#111827', fontSize: 18 }}>
            {totalPrice.toFixed(2)}$
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton 
              size="small"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              sx={{ width: 32, height: 32 }}
            >
              <RemoveIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: 700 }}>{quantity}</Typography>
            <IconButton 
              size="small"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= (product?.quantity || 999)}
              sx={{ width: 32, height: 32 }}
            >
              <AddIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
          <Button 
            variant="contained" 
            size="small" 
            onClick={handleAddToCart}
            disabled={isInCart}
            sx={{ 
              textTransform: 'none', 
              borderRadius: 2,
              background: isInCart ? 'rgba(34,197,94,0.8)' : 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
              px: 2
            }}
          >
            {isInCart ? 'تم' : 'أضف'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}


