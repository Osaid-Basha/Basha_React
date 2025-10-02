import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
  Container,
  Avatar,
  Chip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  Visibility as VisionIcon,
  Flag as MissionIcon,
  Star as StarIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  HighQuality as QualityIcon,
  Support as SupportIcon,
  Verified as VerifiedIcon,
  Lightbulb as InnovationIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Speed as SpeedIcon,
  Payment as PaymentIcon,
  Inventory as InventoryIcon,
  HeadsetMic as HeadsetIcon,
  Gavel as GavelIcon,
  Computer as ComputerIcon
} from '@mui/icons-material';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { toast } from 'react-toastify';

export default function About() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubscribeStatus('success');
      toast.success(t('about_newsletter_success'));
      setEmail('');
    } catch (error) {
      setSubscribeStatus('error');
      toast.error(t('about_newsletter_error'));
    } finally {
      setIsSubscribing(false);
    }
  };

  const stats = [
    { number: '10,000+', label: t('about_customers'), icon: <PeopleIcon sx={{ fontSize: 40, color: '#4f46e5' }} /> },
    { number: '500+', label: t('about_products'), icon: <InventoryIcon sx={{ fontSize: 40, color: '#16a34a' }} /> },
    { number: '50,000+', label: t('about_orders'), icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#f59e0b' }} /> },
    { number: '4.9/5', label: t('about_rating'), icon: <StarIcon sx={{ fontSize: 40, color: '#ef4444' }} /> }
  ];

  const values = [
    {
      icon: <QualityIcon sx={{ fontSize: 32, color: '#4f46e5' }} />,
      title: t('about_quality'),
      description: t('about_quality_desc'),
      color: '#4f46e5'
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 32, color: '#16a34a' }} />,
      title: t('about_trust'),
      description: t('about_trust_desc'),
      color: '#16a34a'
    },
    {
      icon: <InnovationIcon sx={{ fontSize: 32, color: '#f59e0b' }} />,
      title: t('about_innovation'),
      description: t('about_innovation_desc'),
      color: '#f59e0b'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 32, color: '#ef4444' }} />,
      title: t('about_service'),
      description: t('about_service_desc'),
      color: '#ef4444'
    }
  ];

  const whyChooseUs = [
    {
      icon: <ShippingIcon sx={{ fontSize: 32, color: '#4f46e5' }} />,
      title: t('about_fast_delivery'),
      description: t('about_fast_delivery_desc'),
      color: '#4f46e5'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32, color: '#16a34a' }} />,
      title: t('about_secure_payment'),
      description: t('about_secure_payment_desc'),
      color: '#16a34a'
    },
    {
      icon: <QualityIcon sx={{ fontSize: 32, color: '#f59e0b' }} />,
      title: t('about_quality_products'),
      description: t('about_quality_products_desc'),
      color: '#f59e0b'
    },
    {
      icon: <HeadsetIcon sx={{ fontSize: 32, color: '#ef4444' }} />,
      title: t('about_customer_support'),
      description: t('about_customer_support_desc'),
      color: '#ef4444'
    },
    {
      icon: <GavelIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />,
      title: t('about_guarantee'),
      description: t('about_guarantee_desc'),
      color: '#8b5cf6'
    },
    {
      icon: <ComputerIcon sx={{ fontSize: 32, color: '#06b6d4' }} />,
      title: t('about_innovation_tech'),
      description: t('about_innovation_tech_desc'),
      color: '#06b6d4'
    }
  ];

  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Chief Executive Officer',
      avatar: 'J',
      color: '#4f46e5'
    },
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      avatar: 'S',
      color: '#16a34a'
    },
    {
      name: 'Michael Brown',
      role: 'Technology Director',
      avatar: 'M',
      color: '#f59e0b'
    },
    {
      name: 'Emily Davis',
      role: 'Operations Director',
      avatar: 'E',
      color: '#ef4444'
    }
  ];

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
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
        border: '1px solid rgba(79, 70, 229, 0.1)',
        backdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(79, 70, 229, 0.12), 0 2px 8px rgba(0,0,0,0.08)',
        borderRadius: 3,
        p: 4,
        mb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}>
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
          
          <Typography sx={{ 
            fontSize: { xs: 24, md: 32 }, 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 50%, #f59e0b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {t('about_title')}
          </Typography>
          
          <Typography sx={{ 
            fontSize: { xs: 15, md: 17 }, 
            color: 'rgba(15,23,42,0.7)', 
            fontWeight: 500,
            textAlign: 'center',
            lineHeight: 1.6,
            maxWidth: 600,
            mx: 'auto',
            mb: 1
          }}>
            {t('about_subtitle')}
          </Typography>
          
          <Typography sx={{ 
            fontSize: { xs: 14, md: 16 }, 
            color: 'rgba(15,23,42,0.6)', 
            fontWeight: 400,
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: 500,
            mx: 'auto'
          }}>
            {t('about_description')}
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ px: 2 }}>
        {/* Stats Section */}
        <Box sx={{ mb: 8 }}>
          <Typography sx={{ 
            fontSize: 32, 
            fontWeight: 900, 
            textAlign: 'center',
            mb: 6,
            background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {t('about_stats_title')}
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
                  borderRadius: 4,
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.03)',
                    boxShadow: '0 24px 60px rgba(79, 70, 229, 0.25), 0 8px 20px rgba(0,0,0,0.15)'
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ 
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography sx={{ 
                      fontSize: 36, 
                      fontWeight: 900, 
                      color: 'rgba(15,23,42,0.9)',
                      mb: 2,
                      lineHeight: 1.1
                    }}>
                      {stat.number}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: 16, 
                      color: 'rgba(15,23,42,0.7)',
                      fontWeight: 700,
                      lineHeight: 1.3
                    }}>
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Story, Mission, Vision */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
              border: '1px solid rgba(79, 70, 229, 0.1)',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(79, 70, 229, 0.12), 0 2px 8px rgba(0,0,0,0.08)',
              borderRadius: 3,
              height: '100%',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 40px rgba(79, 70, 229, 0.18), 0 8px 16px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  alignSelf: 'flex-start'
                }}>
                  <BusinessIcon sx={{ color: '#4f46e5', fontSize: 32 }} />
                </Box>
                <Typography sx={{ 
                  fontSize: 20, 
                  fontWeight: 900, 
                  color: 'rgba(15,23,42,0.9)',
                  mb: 2
                }}>
                  {t('about_our_story')}
                </Typography>
                <Typography sx={{ 
                  fontSize: 15, 
                  color: 'rgba(15,23,42,0.7)',
                  lineHeight: 1.6,
                  flex: 1
                }}>
                  {t('about_our_story_content')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
              border: '1px solid rgba(79, 70, 229, 0.1)',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(79, 70, 229, 0.12), 0 2px 8px rgba(0,0,0,0.08)',
              borderRadius: 3,
              height: '100%',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 40px rgba(79, 70, 229, 0.18), 0 8px 16px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  alignSelf: 'flex-start'
                }}>
                  <MissionIcon sx={{ color: '#16a34a', fontSize: 32 }} />
                </Box>
                <Typography sx={{ 
                  fontSize: 20, 
                  fontWeight: 900, 
                  color: 'rgba(15,23,42,0.9)',
                  mb: 2
                }}>
                  {t('about_our_mission')}
                </Typography>
                <Typography sx={{ 
                  fontSize: 15, 
                  color: 'rgba(15,23,42,0.7)',
                  lineHeight: 1.6,
                  flex: 1
                }}>
                  {t('about_our_mission_content')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
              border: '1px solid rgba(79, 70, 229, 0.1)',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(79, 70, 229, 0.12), 0 2px 8px rgba(0,0,0,0.08)',
              borderRadius: 3,
              height: '100%',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 40px rgba(79, 70, 229, 0.18), 0 8px 16px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.15) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  alignSelf: 'flex-start'
                }}>
                  <VisionIcon sx={{ color: '#f59e0b', fontSize: 32 }} />
                </Box>
                <Typography sx={{ 
                  fontSize: 20, 
                  fontWeight: 900, 
                  color: 'rgba(15,23,42,0.9)',
                  mb: 2
                }}>
                  {t('about_our_vision')}
                </Typography>
                <Typography sx={{ 
                  fontSize: 15, 
                  color: 'rgba(15,23,42,0.7)',
                  lineHeight: 1.6,
                  flex: 1
                }}>
                  {t('about_our_vision_content')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Values Section */}
        <Box sx={{ mb: 8 }}>
          <Typography sx={{ 
            fontSize: 32, 
            fontWeight: 900, 
            textAlign: 'center',
            mb: 6,
            background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {t('about_our_values')}
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
                  borderRadius: 4,
                  height: '100%',
                  minHeight: '280px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.03)',
                    boxShadow: '0 24px 60px rgba(79, 70, 229, 0.25), 0 8px 20px rgba(0,0,0,0.15)'
                  }
                }}>
                  <CardContent sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Box sx={{ 
                      width: 80,
                      height: 80,
                      borderRadius: '50%', 
                      background: `linear-gradient(135deg, ${value.color} 0%, ${value.color}CC 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 4,
                      boxShadow: `0 8px 24px ${value.color}40`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: `0 12px 32px ${value.color}60`
                      }
                    }}>
                      {value.icon}
                    </Box>
                    <Typography sx={{ 
                      fontSize: 22, 
                      fontWeight: 900, 
                      color: 'rgba(15,23,42,0.9)',
                      mb: 3,
                      lineHeight: 1.2
                    }}>
                      {value.title}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: 15, 
                      color: 'rgba(15,23,42,0.7)',
                      lineHeight: 1.6,
                      textAlign: 'center',
                      maxWidth: '200px'
                    }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us */}
        <Box sx={{ mb: 8 }}>
          <Typography sx={{ 
            fontSize: 32, 
            fontWeight: 900, 
            textAlign: 'center',
            mb: 3,
            background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {t('about_why_choose')}
          </Typography>
          
          <Typography sx={{ 
            fontSize: 18, 
            color: 'rgba(15,23,42,0.7)',
            textAlign: 'center',
            mb: 6,
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}>
            {t('about_why_choose_subtitle')}
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {whyChooseUs.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
                  borderRadius: 4,
                  height: '100%',
                  minHeight: '300px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.03)',
                    boxShadow: '0 24px 60px rgba(79, 70, 229, 0.25), 0 8px 20px rgba(0,0,0,0.15)'
                  }
                }}>
                  <CardContent sx={{ 
                    p: 4, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                  }}>
                    <Box sx={{ 
                      width: 70,
                      height: 70,
                      borderRadius: 3, 
                      background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 4,
                      boxShadow: `0 8px 24px ${item.color}40`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: `0 12px 32px ${item.color}60`
                      }
                    }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ 
                      fontSize: 20, 
                      fontWeight: 900, 
                      color: 'rgba(15,23,42,0.9)',
                      mb: 3,
                      lineHeight: 1.2
                    }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: 15, 
                      color: 'rgba(15,23,42,0.7)',
                      lineHeight: 1.6,
                      flex: 1
                    }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography sx={{ 
            fontSize: 32, 
            fontWeight: 900, 
            textAlign: 'center',
            mb: 3,
            background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {t('about_team_title')}
          </Typography>
          
          <Typography sx={{ 
            fontSize: 18, 
            color: 'rgba(15,23,42,0.7)',
            textAlign: 'center',
            mb: 2,
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}>
            {t('about_team_subtitle')}
          </Typography>
          
          <Typography sx={{ 
            fontSize: 15, 
            color: 'rgba(15,23,42,0.6)',
            textAlign: 'center',
            mb: 6,
            maxWidth: 500,
            mx: 'auto',
            lineHeight: 1.5
          }}>
            {t('about_team_desc')}
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
                  borderRadius: 4,
                  height: '100%',
                  minHeight: '320px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.05)',
                    boxShadow: '0 24px 60px rgba(79, 70, 229, 0.25), 0 8px 20px rgba(0,0,0,0.15)'
                  }
                }}>
                  <CardContent sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Avatar sx={{ 
                      width: 100, 
                      height: 100, 
                      mx: 'auto', 
                      mb: 3,
                      fontSize: 40,
                      fontWeight: 900,
                      background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}CC 100%)`,
                      boxShadow: `0 12px 32px ${member.color}50`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: `0 16px 40px ${member.color}70`
                      }
                    }}>
                      {member.avatar}
                    </Avatar>
                    <Typography sx={{ 
                      fontSize: 20, 
                      fontWeight: 900, 
                      color: 'rgba(15,23,42,0.9)',
                      mb: 2,
                      lineHeight: 1.2
                    }}>
                      {member.name}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: 14, 
                      color: 'rgba(15,23,42,0.7)',
                      fontWeight: 600,
                      lineHeight: 1.4
                    }}>
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Newsletter Section */}
        <Card sx={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
          border: '1px solid rgba(79, 70, 229, 0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(79, 70, 229, 0.12), 0 2px 8px rgba(0,0,0,0.08)',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 40px rgba(79, 70, 229, 0.18), 0 8px 16px rgba(0,0,0,0.12)'
          }
        }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ 
              fontSize: 24, 
              fontWeight: 900, 
              color: 'rgba(15,23,42,0.9)',
              mb: 2
            }}>
              {t('about_join_us')}
            </Typography>
            
            <Typography sx={{ 
              fontSize: 16, 
              color: 'rgba(15,23,42,0.7)',
              mb: 1
            }}>
              {t('about_join_us_subtitle')}
            </Typography>
            
            <Typography sx={{ 
              fontSize: 14, 
              color: 'rgba(15,23,42,0.6)',
              mb: 4,
              maxWidth: 500,
              mx: 'auto'
            }}>
              {t('about_join_us_desc')}
            </Typography>

            {subscribeStatus === 'success' && (
              <Alert 
                severity="success" 
                icon={<CheckCircleIcon />}
                sx={{ mb: 3, borderRadius: 2, maxWidth: 400, mx: 'auto' }}
              >
                {t('about_newsletter_success')}
              </Alert>
            )}

            {subscribeStatus === 'error' && (
              <Alert 
                severity="error" 
                icon={<ErrorIcon />}
                sx={{ mb: 3, borderRadius: 2, maxWidth: 400, mx: 'auto' }}
              >
                {t('about_newsletter_error')}
              </Alert>
            )}

            <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  type="email"
                  placeholder={t('about_newsletter_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(79, 70, 229, 0.5)',
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubscribing}
                  startIcon={isSubscribing ? <CircularProgress size={20} /> : <EmailIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #3730a3 0%, #15803d 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(79, 70, 229, 0.5)',
                    },
                    '&:disabled': {
                      background: 'rgba(15, 23, 42, 0.3)',
                      color: 'rgba(15, 23, 42, 0.5)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: { xs: '100%', sm: 'auto' }
                  }}
                >
                  {isSubscribing ? t('contact_sending') : t('about_newsletter_button')}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
