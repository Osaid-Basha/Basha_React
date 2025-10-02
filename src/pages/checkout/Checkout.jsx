import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  IconButton
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import AxiosUserInstanse from '../../api/AxiosUserInstanse.jsx';
import { toast } from 'react-toastify';


export default function Checkout() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const processPayment = async () => {
    if (!paymentMethod) {
      toast.error(t('please_select_payment_method'));
      return;
    }

    setIsProcessing(true);
    
    try {
      // Map payment method to API format
      const apiPaymentMethod = paymentMethod === 'credit' ? 'Visa' : 'Cash';

      const response = await AxiosUserInstanse.post('/CheckOut/payment', {
        paymentMethod: apiPaymentMethod
      });
      
      
      console.log('Payment response:', response.data);

      if (response.data) {
        // If Visa payment, check for payment URL
        if (paymentMethod === 'credit') {
          if (response.data.paymentUrl) {
            toast.info(t('redirecting_to_payment'));
            setTimeout(() => {
              window.location.href = response.data.paymentUrl;
            }, 1000);
          } else if (response.data.url) {
            // Alternative field name for payment URL
            toast.info(t('redirecting_to_payment'));
            setTimeout(() => {
              window.location.href = response.data.url;
            }, 1000);
          } else if (response.data.redirectUrl) {
            // Another alternative field name
            toast.info(t('redirecting_to_payment'));
            setTimeout(() => {
              window.location.href = response.data.redirectUrl;
            }, 1000);
          } else {
            // No payment URL found, show error
            toast.error(t('payment_url_not_found'));
            console.error('Expected payment URL but got:', response.data);
          }
        } else {
          // Cash on delivery - success
          toast.success(t('payment_successful'));
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(t('payment_failed'));
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          {t('checkout')}
        </Typography>
      </Box>

      {/* Payment Method */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          {t('payment_method')}
        </Typography>
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
            <Card sx={{ mb: 2, border: '2px solid #e0e0e0', '&:hover': { borderColor: '#6366f1' } }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                <Radio value="credit" />
                <CreditCardIcon sx={{ mr: 2, color: '#6366f1' }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{t('credit_card')}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('credit_card_description')}
                  </Typography>
                </Box>
                <SecurityIcon sx={{ color: '#4caf50' }} />
              </CardContent>
            </Card>
           
            <Card sx={{ mb: 2, border: '2px solid #e0e0e0', '&:hover': { borderColor: '#6366f1' } }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                <Radio value="cod" />
                <LocalShippingIcon sx={{ mr: 2, color: '#ff9800' }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{t('cash_on_delivery')}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('cod_description')}
                  </Typography>
                </Box>
                <SecurityIcon sx={{ color: '#4caf50' }} />
              </CardContent>
            </Card>
          </RadioGroup>
        </FormControl>
      </Paper>

      {/* Order Summary */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          {t('order_summary')}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Product 1 x 2</Typography>
            <Typography variant="body2">$199.98</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Product 2 x 1</Typography>
            <Typography variant="body2">$99.99</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>{t('subtotal')}</Typography>
          <Typography>$299.97</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>{t('shipping')}</Typography>
          <Typography>$15.00</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography>{t('tax')}</Typography>
          <Typography>$25.00</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">{t('total')}</Typography>
          <Typography variant="h6" color="primary">$339.97</Typography>
        </Box>

        {/* Place Order Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={processPayment}
          disabled={isProcessing || !paymentMethod}
          size="large"
          sx={{ 
            py: 1.5,
            backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
            '&:hover': {
              backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)'
            }
          }}
        >
          {isProcessing ? t('processing') : t('place_order')}
        </Button>
      </Paper>
    </Container>
  );
}