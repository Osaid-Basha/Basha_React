import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { toast } from 'react-toastify';
import AxiosUserInstanse from '../../api/AxiosUserInstanse.jsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';




export default function Cart() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [productImages, setProductImages] = React.useState({});
  
  
  
  const fetchCart = async () => {
    try {
      const res = await AxiosUserInstanse.get(`/Carts`);
      return res.data;
    } catch (err) {
      console.error("Error fetching cart:", err);
      throw err;
    }
  };

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['Cart'],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });

  // Get cart items and total from data
  const cartItems = data?.items || [];
  const cartTotal = data?.total || 0;
  

 
  


 

  const handleQuantityChange = async (itemId, newQuantity) => {
    const current = cartItems.find(x => x.productId === itemId);
    if (!current) return;
    if (newQuantity < 1) return;
    
    try {
      if (newQuantity === current.count + 1) {
        await AxiosUserInstanse.post(`/Carts/increment/${itemId}`);
        toast.success(t('quantity_increased'));
      } else if (newQuantity === current.count - 1) {
        await AxiosUserInstanse.post(`/Carts/decrement/${itemId}`);
        toast.success(t('quantity_decreased'));
      } else {
        // For other quantity changes, update directly
        await AxiosUserInstanse.put(`/Carts/${itemId}`, { count: newQuantity });
        toast.success(t('quantity_increased'));
      }
      
      // Invalidate and refetch cart data
      queryClient.invalidateQueries(['Cart']);
    } catch (err) {
      console.error('Error updating quantity:', err);
      toast.error(t('quantity_update_failed'));
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await AxiosUserInstanse.delete(`/Carts/${itemId}`);
      
      // Invalidate and refetch cart data
      queryClient.invalidateQueries(['Cart']);
      
      toast.success(t('item_removed_success'));
    } catch (err) {
      console.error('Error removing item:', err);
      toast.error(t('item_remove_failed'));
    }
  };

  const handleClearCart = async () => {
    const confirmClear = window.confirm(
      dir === 'rtl' 
        ? 'هل أنت متأكد من مسح السلة؟' 
        : 'Are you sure you want to clear the cart?'
    );
    
    if (!confirmClear) return;
    
    try {
      await AxiosUserInstanse.delete(`/Carts/clear`);
      
      // Invalidate and refetch cart data
      queryClient.invalidateQueries(['Cart']);
      
      toast.success(t('cart_cleared_success'));
    } catch (err) {
      console.error('Error clearing cart:', err);
      toast.error(t('cart_clear_failed'));
    }
  };

  const calculateSubtotal = () => {
    
    if (cartTotal > 0) {
      return cartTotal;
    }
    return cartItems.reduce((total, item) => total + (item.totalPrice || (item.price * item.count)), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 100 ? 0 : 10;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.count, 0);
  };

  if (false) {
    return (
      <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 3, md: 4 }, p: 2 }}>
        <Typography>جارِ التحميل...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 3, md: 4 }, p: 2, direction: dir }}>
      {/* Header */}
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
            {t('cart_title')}
          </Typography>
          <Typography sx={{ 
            fontSize: { xs: 14, md: 16 }, 
            color: 'rgba(15,23,42,0.7)', 
            fontWeight: 500,
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}>
            {cartItems.length === 0 ? t('cart_management_text') : `${t('items_in_cart')(getTotalItems())} - ${t('total')}: ${calculateTotal().toFixed(2)}$`}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' }}>
          </Box>
        </Box>
      </Box>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingCartIcon sx={{ fontSize: 80, color: 'rgba(15,23,42,0.3)', mb: 2 }} />
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: 'rgba(15,23,42,0.8)', mb: 1 }}>
            {t('cart_empty')}
          </Typography>
          <Typography sx={{ fontSize: 16, color: 'rgba(15,23,42,0.6)', mb: 3 }}>
            {t('cart_empty_description')}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
            sx={{ 
              textTransform: 'none', 
              borderRadius: 2, 
              px: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #3730a3 0%, #15803d 100%)'
              }
            }}
          >
            {t('browse_products')}
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
          {/* Cart Items */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Button 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ textTransform: 'none', color: 'rgba(15,23,42,0.7)' }}
              >
                {t('back')}
              </Button>
              <Button 
                variant="outlined" 
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClearCart}
                sx={{ textTransform: 'none' }}
              >
                {t('clear_cart')}
              </Button>
            </Box>

            <Box sx={{ display: 'grid', gap: 2 }}>
              {cartItems.map((item) => (
                <Card key={item.productId} sx={{ 
                  background: '#fff', 
                  border: '1px solid rgba(15,23,42,0.08)', 
                  borderRadius: 2, 
                  boxShadow: '0 4px 12px rgba(15,23,42,0.06)',
                  overflow: 'hidden'
                }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr auto' }, gap: 2, alignItems: 'center' }}>
                      {/* Product Image */}
                      <Box sx={{ 
                        width: { xs: '100%', sm: 120 }, 
                        height: { xs: 200, sm: 120 }, 
                        borderRadius: 2, 
                        overflow: 'hidden',
                        background: 'rgba(15,23,42,0.04)'
                      }}>
                        <Box 
                          component="img" 
                          src={item.image || item.mainImageUrl || productImages[item.productId] || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0MEg2MFY2MEg0MFY0MFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHN2Zz4K'} 
                          alt={item.productName}
                          sx={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            display: 'block'
                          }} 
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0MEg2MFY2MEg0MFY0MFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHN2Zz4K';
                          }}
                        />
                      </Box>

                      {/* Product Info */}
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ 
                          fontSize: { xs: 16, md: 18 }, 
                          fontWeight: 700, 
                          color: 'rgba(15,23,42,0.9)',
                          mb: 0.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {item.productName}
                        </Typography>
                        <Typography sx={{ 
                          fontSize: 18, 
                          fontWeight: 900, 
                          color: '#16a34a',
                          mb: 1
                        }}>
                          {item.price.toFixed(2)}$
                        </Typography>
                        <Chip 
                          label={`${t('quantity')}: ${item.count}`} 
                          size="small" 
                          sx={{ 
                            background: 'rgba(15,23,42,0.04)', 
                            border: '1px solid rgba(15,23,42,0.12)', 
                            color: 'rgba(15,23,42,0.7)',
                            fontSize: 12
                          }} 
                        />
                      </Box>

                      {/* Quantity Controls & Actions */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton 
                            onClick={() => handleQuantityChange(item.productId, item.count - 1)}
                            disabled={item.count <= 1}
                            sx={{ 
                              width: 36, 
                              height: 36, 
                              border: '2px solid rgba(99,102,241,0.2)', 
                              borderRadius: 1.5,
                              '&:hover': { background: 'rgba(99,102,241,0.1)' },
                              '&:disabled': { opacity: 0.3 }
                            }}
                          >
                            <RemoveIcon sx={{ fontSize: 16, color: '#4f46e5' }} />
                          </IconButton>
                          
                          <Box sx={{ 
                            minWidth: 50, 
                            height: 36, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            background: 'rgba(99,102,241,0.05)',
                            border: '2px solid rgba(99,102,241,0.2)',
                            borderRadius: 1.5,
                            fontWeight: 700,
                            fontSize: 14,
                            color: '#4f46e5'
                          }}>
                            {item.count}
                          </Box>
                          
                          <IconButton 
                            onClick={() => handleQuantityChange(item.productId, item.count + 1)}
                            disabled={item.count >= 999}
                            sx={{ 
                              width: 36, 
                              height: 36, 
                              border: '2px solid rgba(99,102,241,0.2)', 
                              borderRadius: 1.5,
                              '&:hover': { background: 'rgba(99,102,241,0.1)' },
                              '&:disabled': { opacity: 0.3 }
                            }}
                          >
                            <AddIcon sx={{ fontSize: 16, color: '#4f46e5' }} />
                          </IconButton>
                        </Box>

                        <Typography sx={{ 
                          fontSize: 16, 
                          fontWeight: 900, 
                          color: '#16a34a',
                          textAlign: 'center'
                        }}>
                          {item.totalPrice.toFixed(2)}$
                        </Typography>

                        <IconButton 
                          onClick={() => handleRemoveItem(item.productId)}
                          sx={{ 
                            color: '#ef4444',
                            '&:hover': { background: 'rgba(239,68,68,0.1)' }
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Order Summary */}
          <Box>
            <Card sx={{ 
              background: '#fff', 
              border: '1px solid rgba(15,23,42,0.08)', 
              borderRadius: 2, 
              boxShadow: '0 4px 12px rgba(15,23,42,0.06)',
              position: 'sticky',
              top: 20
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ 
                  fontSize: 20, 
                  fontWeight: 900, 
                  color: 'rgba(15,23,42,0.9)',
                  mb: 2,
                  textAlign: dir === 'rtl' ? 'right' : 'left'
                }}>
                  {t('order_summary')}
                </Typography>

                <Box sx={{ display: 'grid', gap: 1.5, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 14, color: 'rgba(15,23,42,0.7)' }}>
                      {t('subtotal')} ({getTotalItems()} {t('items')})
                    </Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'rgba(15,23,42,0.9)' }}>
                      {calculateSubtotal().toFixed(2)}$
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 14, color: 'rgba(15,23,42,0.7)' }}>
                      {t('shipping_fee')}
                    </Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 700, color: calculateShipping() === 0 ? '#16a34a' : 'rgba(15,23,42,0.9)' }}>
                      {calculateShipping() === 0 ? t('free') : `${calculateShipping().toFixed(2)}$`}
                    </Typography>
                  </Box>

                  {calculateSubtotal() < 100 && (
                    <Chip 
                      label={t('add_for_free_shipping')((100 - calculateSubtotal()).toFixed(2))}
                      size="small"
                      sx={{ 
                        background: 'rgba(34,197,94,0.1)', 
                        border: '1px solid rgba(34,197,94,0.2)', 
                        color: '#16a34a',
                        fontSize: 11,
                        mt: 1
                      }}
                    />
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 900, color: 'rgba(15,23,42,0.9)' }}>
                      {t('total')}
                    </Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: 900, color: '#16a34a' }}>
                      {calculateTotal().toFixed(2)}$
                    </Typography>
                  </Box>
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth
                  startIcon={<PaymentIcon />}
                  onClick={() => navigate('/checkout')}
                  sx={{ 
                    textTransform: 'none', 
                    borderRadius: 2, 
                    py: 1.5,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #3730a3 0%, #15803d 100%)'
                    },
                    boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
                    mb: 2
                  }}
                >
                  {t('proceed_checkout')}
                </Button>

                <Button 
                  variant="outlined" 
                  fullWidth
                  startIcon={<LocalShippingIcon />}
                  onClick={() => navigate('/products')}
                  sx={{ 
                    textTransform: 'none', 
                    borderRadius: 2, 
                    py: 1.5,
                    border: '2px solid #4f46e5',
                    color: '#4f46e5',
                    '&:hover': {
                      background: 'rgba(99,102,241,0.1)',
                      border: '2px solid #3730a3'
                    }
                  }}
                >
                  {t('continue_shopping')}
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Box>
  );
}
