import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import AxiosUserInstanse from '../../api/AxiosUserInstanse.jsx';
import axios from 'axios';

export default function Profile() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();

  // Fetch user profile data
  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://kashop1.runasp.net/api/Users/profile',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };

  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Box sx={{ 
        width: 'min(1400px, 96%)', 
        mx: 'auto', 
        mt: { xs: 3, md: 4 }, 
        p: 2,
        direction: dir 
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '50vh',
          background: 'rgba(255,255,255,0.78)',
          border: '1px solid rgba(15,23,42,0.06)',
          backdropFilter: 'blur(10px) saturate(160%)',
          boxShadow: '0 6px 24px rgba(83,100,173,0.14)',
          borderRadius: 2,
        }}>
          <CircularProgress size={60} sx={{ color: '#4f46e5' }} />
          <Typography sx={{ ml: 2, fontSize: 18, fontWeight: 600, color: 'rgba(15,23,42,0.8)' }}>
            {t('loading')}...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ 
        width: 'min(1400px, 96%)', 
        mx: 'auto', 
        mt: { xs: 3, md: 4 }, 
        p: 2,
        direction: dir 
      }}>
        <Box sx={{
          background: 'rgba(255,255,255,0.78)',
          border: '1px solid rgba(15,23,42,0.06)',
          backdropFilter: 'blur(10px) saturate(160%)',
          boxShadow: '0 6px 24px rgba(83,100,173,0.14)',
          borderRadius: 2,
          p: 3
        }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error?.response?.data?.message || t('profile_load_error')}
          </Alert>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ 
              textTransform: 'none',
              background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #3730a3 0%, #15803d 100%)'
              }
            }}
          >
            {t('back_to_home')}
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: 'min(1400px, 96%)', 
      mx: 'auto', 
      mt: { xs: 3, md: 4 }, 
      p: 2,
      direction: dir,
      '@keyframes pulse': {
        '0%': {
          transform: 'scale(1)',
          opacity: 1
        },
        '50%': {
          transform: 'scale(1.05)',
          opacity: 0.7
        },
        '100%': {
          transform: 'scale(1)',
          opacity: 1
        }
      }
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
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: 120, 
          height: 120, 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%)', 
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
            {t('profile_title')}
          </Typography>
          <Typography sx={{ 
            fontSize: { xs: 15, md: 17 }, 
            color: 'rgba(15,23,42,0.7)', 
            fontWeight: 500,
            textAlign: 'center',
            lineHeight: 1.6,
            maxWidth: 500,
            mx: 'auto'
          }}>
            {t('profile_description')}
          </Typography>
        </Box>
      </Box>

      {/* Profile Content */}
      <Grid container spacing={4} sx={{ minHeight: '600px', alignItems: 'stretch' }}>
        {/* Profile Card */}
        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            border: '1px solid rgba(79, 70, 229, 0.1)',
            backdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(79, 70, 229, 0.12), 0 2px 8px rgba(0,0,0,0.08)',
            borderRadius: 3,
            position: 'sticky',
            top: 20,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px) scale(1.02)',
              boxShadow: '0 20px 40px rgba(79, 70, 229, 0.2), 0 8px 16px rgba(0,0,0,0.12)'
            }
          }}>
            <CardContent sx={{ 
              p: 4, 
              textAlign: 'center', 
              position: 'relative',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              {/* Decorative elements */}
              <Box sx={{ 
                position: 'absolute', 
                top: -20, 
                right: -20, 
                width: 60, 
                height: 60, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)', 
                zIndex: 0 
              }} />
              <Box sx={{ 
                position: 'absolute', 
                bottom: -15, 
                left: -15, 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)', 
                zIndex: 0 
              }} />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ 
                  position: 'relative', 
                  display: 'inline-block', 
                  mb: 3,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -10,
                    left: -10,
                    right: -10,
                    bottom: -10,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(34, 197, 94, 0.2) 100%)',
                    zIndex: -1,
                    animation: 'pulse 2s infinite'
                  }
                }}>
                  <Avatar
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      mx: 'auto', 
                      fontSize: 48,
                      background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                      boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4), 0 4px 12px rgba(34, 197, 94, 0.3)',
                      border: '4px solid rgba(255,255,255,0.8)'
                    }}
                    src={profile?.avatarUrl}
                  >
                    {profile?.fullName?.charAt(0)?.toUpperCase() || <PersonIcon />}
                  </Avatar>
                </Box>
                
                <Typography sx={{ 
                  fontSize: 22, 
                  fontWeight: 900, 
                  color: 'rgba(15,23,42,0.9)',
                  mb: 1,
                  lineHeight: 1.2,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  {profile?.fullName || t('no_name')}
                </Typography>
                
                <Typography sx={{ 
                  fontSize: 15, 
                  color: 'rgba(15,23,42,0.7)',
                  mb: 3,
                  lineHeight: 1.4,
                  fontWeight: 500
                }}>
                  {profile?.email || t('no_email')}
                </Typography>

                <Chip 
                  label={t('member_since')} 
                  size="small" 
                  sx={{ 
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.15) 100%)', 
                    border: '1px solid rgba(34,197,94,0.3)', 
                    color: '#16a34a',
                    fontSize: 12,
                    fontWeight: 700,
                    px: 3,
                    py: 1,
                    boxShadow: '0 2px 8px rgba(34, 197, 94, 0.2)'
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8} sx={{ display: 'flex' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            border: '1px solid rgba(79, 70, 229, 0.1)',
            backdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(79, 70, 229, 0.12), 0 2px 8px rgba(0,0,0,0.08)',
            borderRadius: 3,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 40px rgba(79, 70, 229, 0.18), 0 8px 16px rgba(0,0,0,0.12)'
            }
          }}>
            <CardContent sx={{ 
              p: 4, 
              position: 'relative',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Decorative background elements */}
              <Box sx={{ 
                position: 'absolute', 
                top: -30, 
                right: -30, 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(34, 197, 94, 0.08) 100%)', 
                zIndex: 0 
              }} />
              <Box sx={{ 
                position: 'absolute', 
                bottom: -20, 
                left: -20, 
                width: 60, 
                height: 60, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)', 
                zIndex: 0 
              }} />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3, 
                  mb: 4,
                  pb: 3,
                  borderBottom: '3px solid',
                  borderImage: 'linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(34, 197, 94, 0.3) 100%) 1',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -3,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(34, 197, 94, 0.2) 100%)',
                    borderRadius: '0 0 3px 3px'
                  }
                }}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 3, 
                    background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                    border: '1px solid rgba(79, 70, 229, 0.2)'
                  }}>
                    <PersonIcon sx={{ color: '#4f46e5', fontSize: 28 }} />
                  </Box>
                  <Typography sx={{ 
                    fontSize: 24, 
                    fontWeight: 900, 
                    background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textAlign: dir === 'rtl' ? 'right' : 'left',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {t('profile_information')}
                  </Typography>
                </Box>

              <Box sx={{ 
                display: 'grid', 
                gap: 2.5,
                gridTemplateColumns: { 
                  xs: '1fr', 
                  sm: 'repeat(2, 1fr)', 
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)'
                },
                '& > *': {
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center'
                }
              }}>
                {/* Name */}
                <Paper sx={{ 
                  p: 2.5, 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.8) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    borderColor: 'rgba(79, 70, 229, 0.4)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 12px 24px rgba(79, 70, 229, 0.2), 0 4px 8px rgba(0,0,0,0.1)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    width: '100%',
                    height: '100%'
                  }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                      border: '1px solid rgba(79, 70, 229, 0.2)',
                      transition: 'all 0.3s ease',
                      minWidth: '60px',
                      minHeight: '60px',
                      flexShrink: 0,
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 6px 16px rgba(79, 70, 229, 0.3)'
                      }
                    }}>
                      <PersonIcon sx={{ color: '#4f46e5', fontSize: 24 }} />
                    </Box>
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minHeight: '60px'
                    }}>
                      <Typography sx={{ 
                        fontSize: 12, 
                        color: 'rgba(15,23,42,0.6)',
                        mb: 1,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {t('full_name')}
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 16, 
                        fontWeight: 800, 
                        color: 'rgba(15,23,42,0.9)',
                        lineHeight: 1.3,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                      }}>
                        {profile?.fullName || t('no_name')}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Email */}
                <Paper sx={{ 
                  p: 2.5, 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.8) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    borderColor: 'rgba(79, 70, 229, 0.4)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 12px 24px rgba(79, 70, 229, 0.2), 0 4px 8px rgba(0,0,0,0.1)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    width: '100%',
                    height: '100%'
                  }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                      border: '1px solid rgba(79, 70, 229, 0.2)',
                      transition: 'all 0.3s ease',
                      minWidth: '60px',
                      minHeight: '60px',
                      flexShrink: 0,
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 6px 16px rgba(79, 70, 229, 0.3)'
                      }
                    }}>
                      <EmailIcon sx={{ color: '#4f46e5', fontSize: 24 }} />
                    </Box>
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minHeight: '60px'
                    }}>
                      <Typography sx={{ 
                        fontSize: 12, 
                        color: 'rgba(15,23,42,0.6)',
                        mb: 1,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {t('email_address')}
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 16, 
                        fontWeight: 800, 
                        color: 'rgba(15,23,42,0.9)',
                        lineHeight: 1.3,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                      }}>
                        {profile?.email || t('no_email')}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Phone */}
                <Paper sx={{ 
                  p: 2.5, 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.8) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    borderColor: 'rgba(79, 70, 229, 0.4)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 12px 24px rgba(79, 70, 229, 0.2), 0 4px 8px rgba(0,0,0,0.1)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    width: '100%',
                    height: '100%'
                  }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                      border: '1px solid rgba(79, 70, 229, 0.2)',
                      transition: 'all 0.3s ease',
                      minWidth: '60px',
                      minHeight: '60px',
                      flexShrink: 0,
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 6px 16px rgba(79, 70, 229, 0.3)'
                      }
                    }}>
                      <PhoneIcon sx={{ color: '#4f46e5', fontSize: 24 }} />
                    </Box>
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minHeight: '60px'
                    }}>
                      <Typography sx={{ 
                        fontSize: 12, 
                        color: 'rgba(15,23,42,0.6)',
                        mb: 1,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {t('phone_number')}
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 16, 
                        fontWeight: 800, 
                        color: 'rgba(15,23,42,0.9)',
                        lineHeight: 1.3,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                      }}>
                        {profile?.phoneNumber || t('no_phone')}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>


                {/* Role */}
                <Paper sx={{ 
                  p: 2.5, 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.8) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    borderColor: 'rgba(79, 70, 229, 0.4)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 12px 24px rgba(79, 70, 229, 0.2), 0 4px 8px rgba(0,0,0,0.1)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    width: '100%',
                    height: '100%'
                  }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                      border: '1px solid rgba(79, 70, 229, 0.2)',
                      transition: 'all 0.3s ease',
                      minWidth: '60px',
                      minHeight: '60px',
                      flexShrink: 0,
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 6px 16px rgba(79, 70, 229, 0.3)'
                      }
                    }}>
                      <PersonIcon sx={{ color: '#4f46e5', fontSize: 24 }} />
                    </Box>
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minHeight: '60px'
                    }}>
                      <Typography sx={{ 
                        fontSize: 12, 
                        color: 'rgba(15,23,42,0.6)',
                        mb: 1,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {t('role')}
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 16, 
                        fontWeight: 800, 
                        color: 'rgba(15,23,42,0.9)',
                        lineHeight: 1.3,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                      }}>
                        {profile?.roleName || t('unknown')}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Email Status */}
                <Paper sx={{ 
                  p: 2.5, 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.8) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  borderRadius: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    borderColor: 'rgba(79, 70, 229, 0.4)',
                    transform: 'translateY(-4px) scale(1.02)',
                    boxShadow: '0 12px 24px rgba(79, 70, 229, 0.2), 0 4px 8px rgba(0,0,0,0.1)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    width: '100%',
                    height: '100%'
                  }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      background: profile?.emailConfirmed 
                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: profile?.emailConfirmed 
                        ? '0 2px 8px rgba(34, 197, 94, 0.1)'
                        : '0 2px 8px rgba(239, 68, 68, 0.1)'
                    }}>
                      <EmailIcon sx={{ 
                        color: profile?.emailConfirmed ? '#16a34a' : '#ef4444', 
                        fontSize: 24 
                      }} />
                    </Box>
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minHeight: '60px'
                    }}>
                      <Typography sx={{ 
                        fontSize: 12, 
                        color: 'rgba(15,23,42,0.6)',
                        mb: 1,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {t('email_status')}
                      </Typography>
                      <Typography sx={{ 
                        fontSize: 15, 
                        fontWeight: 700, 
                        color: profile?.emailConfirmed ? '#16a34a' : '#ef4444',
                        lineHeight: 1.4
                      }}>
                        {profile?.emailConfirmed ? t('verified') : t('not_verified')}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}