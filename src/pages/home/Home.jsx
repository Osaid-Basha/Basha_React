
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import HeroSlider from '../../components/hero/HeroSlider';
import BrandGallery from '../../components/brand/BrandGallery';
import Categories from '../../components/category/Categories';
import ProductList from '../../components/product/ProductList';
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function Home() {
  const { t, dir } = useLanguage();
  return (
    <Box sx={{ direction: dir }}>
      <HeroSlider />
      <BrandGallery maxItems={4} />
      <Categories />

      {/* Features Section */}
      <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 3, md: 6 } }}>
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Typography sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 900, color: '#0f172a' }}>
            {t('home_why_us')}
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'rgba(15,23,42,0.7)' }}>
            {t('home_features_desc')}
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 1.5 }}>
          {[{
            icon: <LocalShippingIcon sx={{ fontSize: 28, color: '#4f46e5' }} />, title: t('feature_fast_shipping'), desc: t('feature_fast_shipping_desc')
          },{
            icon: <SecurityIcon sx={{ fontSize: 28, color: '#16a34a' }} />, title: t('feature_secure_payment'), desc: t('feature_secure_payment_desc')
          },{
            icon: <AutorenewIcon sx={{ fontSize: 28, color: '#f59e0b' }} />, title: t('feature_easy_returns'), desc: t('feature_easy_returns_desc')
          },{
            icon: <SupportAgentIcon sx={{ fontSize: 28, color: '#0ea5a3' }} />, title: t('feature_support'), desc: t('feature_support_desc')
          }].map((f, i) => (
            <Card key={i} sx={{
              background: 'linear-gradient(180deg, rgba(255,255,255,1), rgba(245,247,255,0.9))',
              border: '1px solid rgba(15,23,42,0.08)',
              boxShadow: '0 10px 24px rgba(15,23,42,0.08)',
              borderRadius: 3,
              transition: 'transform 180ms ease, box-shadow 180ms ease',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 36px rgba(15,23,42,0.12)' }
            }}>
              <CardContent sx={{ p: 2.25 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, background: 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(16,185,129,0.12))', border: '1px solid rgba(79,70,229,0.2)', display: 'grid', placeItems: 'center' }}>
                    {f.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 900, fontSize: 15.5, color: '#0f172a' }}>{f.title}</Typography>
                    <Typography sx={{ fontSize: 13.2, color: 'rgba(15,23,42,0.7)' }}>{f.desc}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Promo Banner */}
      <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 4, md: 6 } }}>
        <Box sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          p: { xs: 2, md: 3 },
          background: 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(16,185,129,0.12))',
          border: '1px solid rgba(79,70,229,0.25)'
        }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 900, color: '#0f172a', mb: 0.5 }}>
              {t('promo_title')}
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'rgba(15,23,42,0.7)', mb: 2 }}>
              {t('promo_subtitle')}
            </Typography>
            <Button href="/products" variant="contained" sx={{ textTransform: 'none', borderRadius: 2, px: 3, py: 1.2 }}>
              {t('promo_cta')}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Featured Products */}
      <ProductList />

      {/* About Me Section - enhanced */}
      <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 4, md: 6 } }}>
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Typography sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 900, color: '#0f172a' }}>
            {t('about_title')}
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'rgba(15,23,42,0.7)', lineHeight: 1.9 }}>
            {t('about_p1')} {t('about_p2')}
          </Typography>
        </Box>
        <Card sx={{
          background: 'linear-gradient(180deg, rgba(255,255,255,1), rgba(245,247,255,0.9))',
          border: '1px solid rgba(15,23,42,0.08)',
          borderRadius: 3,
          boxShadow: '0 10px 24px rgba(15,23,42,0.08)'
        }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr 1fr' }, gap: 2, alignItems: 'center' }}>
              <Box sx={{
                height: 140,
                borderRadius: 2,
                background: 'radial-gradient(700px 180px at 100% 0%, rgba(79,70,229,0.18), transparent), linear-gradient(135deg, rgba(79,70,229,0.18), rgba(16,185,129,0.18))',
                border: '1px solid rgba(79,70,229,0.25)'
              }} />
              <Typography sx={{ fontSize: 15.5, color: 'rgba(15,23,42,0.85)', textAlign: 'right', lineHeight: 2 }}>
                {t('about_p1')} {t('about_p2')}
              </Typography>
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ px: 2, py: 1, borderRadius: 2, background: 'rgba(79,70,229,0.08)', color: '#4f46e5', fontWeight: 900, fontSize: 13, textAlign: 'center' }}>{t('about_stats_products')}</Box>
                <Box sx={{ px: 2, py: 1, borderRadius: 2, background: 'rgba(16,185,129,0.08)', color: '#16a34a', fontWeight: 900, fontSize: 13, textAlign: 'center' }}>{t('about_stats_customers')}</Box>
                <Box sx={{ px: 2, py: 1, borderRadius: 2, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', fontWeight: 900, fontSize: 13, textAlign: 'center' }}>{t('about_stats_rating')}</Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Contact Me Section */}
      <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 4, md: 6 }, mb: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'right', mb: 2 }}>
          <Typography sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 900, color: '#0f172a' }}>
            {t('contact_title')}
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'rgba(15,23,42,0.7)' }}>
            {t('contact_subtitle')}
          </Typography>
        </Box>
        <Card sx={{
          overflow: 'hidden',
          borderRadius: 3,
          border: '1px solid rgba(15,23,42,0.08)',
          boxShadow: '0 12px 30px rgba(15,23,42,0.08)'
        }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <CardContent sx={{ p: 0 }}>
                <Box component="form" onSubmit={(e) => { e.preventDefault(); alert('تم إرسال الرسالة بنجاح'); }} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 1.5 }}>
                  <TextField label={t('contact_name')} size="small" fullWidth sx={{ direction: dir }} />
                  <TextField label={t('contact_email')} size="small" type="email" fullWidth sx={{ direction: dir }} />
                  <TextField label={t('contact_subject')} size="small" fullWidth sx={{ direction: dir, gridColumn: { md: '1 / span 2' } }} />
                  <TextField label={t('contact_message')} size="small" fullWidth multiline minRows={4} sx={{ gridColumn: { md: '1 / span 2' }, direction: dir }} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button type="submit" variant="contained" sx={{ textTransform: 'none', borderRadius: 2, px: 3 }}>
                      {t('contact_send')}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Box>
            <Box sx={{
              minHeight: 260,
              background: 'radial-gradient(1200px 280px at 100% 0%, rgba(79,70,229,0.18), transparent), linear-gradient(135deg, rgba(79,70,229,0.12), rgba(16,185,129,0.12))',
              borderLeft: { md: '1px solid rgba(79,70,229,0.25)' }
            }} />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
