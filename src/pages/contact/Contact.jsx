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
  Link
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { toast } from 'react-toastify';

export default function Contact() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      toast.success(t('contact_success'));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      toast.error(t('contact_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <LocationIcon sx={{ fontSize: 32, color: '#4f46e5' }} />,
      title: t('contact_address'),
      value: t('contact_address_value')
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 32, color: '#16a34a' }} />,
      title: t('contact_phone'),
      value: t('contact_phone_value')
    },
    {
      icon: <EmailIcon sx={{ fontSize: 32, color: '#f59e0b' }} />,
      title: t('contact_email'),
      value: t('contact_email_value')
    },
    {
      icon: <TimeIcon sx={{ fontSize: 32, color: '#ef4444' }} />,
      title: t('contact_hours'),
      value: t('contact_hours_value')
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, label: 'Facebook', color: '#1877f2' },
    { icon: <TwitterIcon />, label: 'Twitter', color: '#1da1f2' },
    { icon: <InstagramIcon />, label: 'Instagram', color: '#e4405f' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', color: '#0077b5' },
    { icon: <YouTubeIcon />, label: 'YouTube', color: '#ff0000' }
  ];

  const quickLinks = [
    { label: t('contact_faq'), href: '/faq' },
    { label: t('contact_support'), href: '/support' },
    { label: t('contact_returns'), href: '/returns' },
    { label: t('contact_shipping'), href: '/shipping' },
    { label: t('contact_privacy'), href: '/privacy' },
    { label: t('contact_terms'), href: '/terms' }
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
            fontSize: 32, 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 50%, #f59e0b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {t('contact_title')}
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
            {t('contact_subtitle')}
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
            {t('contact_description')}
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            border: '1px solid rgba(79, 70, 229, 0.15)',
            backdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
            borderRadius: 4,
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 50px rgba(79, 70, 229, 0.2), 0 8px 20px rgba(0,0,0,0.12)'
            }
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 4, 
                mb: 6,
                pb: 5,
                borderBottom: '2px solid',
                borderImage: 'linear-gradient(135deg, rgba(79, 70, 229, 0.4) 0%, rgba(34, 197, 94, 0.4) 100%) 1',
                position: 'relative'
              }}>
                <Box sx={{ 
                  width: 60,
                  height: 60,
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #16a34a 0%, #22d3ee 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 12px 32px rgba(34, 197, 94, 0.4)'
                  }
                }}>
                  <SendIcon sx={{ color: 'white', fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography sx={{ 
                    fontSize: 32, 
                    fontWeight: 900, 
                    color: 'rgba(15,23,42,0.9)',
                    textAlign: dir === 'rtl' ? 'right' : 'left',
                    mb: 1,
                    lineHeight: 1.2
                  }}>
                    <Box component="span" sx={{ color: '#4f46e5' }}>
                      {t('contact_form_title').split(' ').slice(0, -1).join(' ')}
                    </Box>
                    <Box component="span" sx={{ color: '#16a34a', ml: 1 }}>
                      {t('contact_form_title').split(' ').slice(-1)}
                    </Box>
                  </Typography>
                  <Typography sx={{ 
                    fontSize: 16, 
                    color: 'rgba(15,23,42,0.6)',
                    fontWeight: 400,
                    textAlign: dir === 'rtl' ? 'right' : 'left',
                    lineHeight: 1.5,
                    maxWidth: 500
                  }}>
                    {t('contact_form_subtitle')}
                  </Typography>
                </Box>
              </Box>

              {submitStatus === 'success' && (
                <Alert 
                  severity="success" 
                  icon={<CheckCircleIcon />}
                  sx={{ mb: 3, borderRadius: 2 }}
                >
                  {t('contact_success')}
                </Alert>
              )}

              {submitStatus === 'error' && (
                <Alert 
                  severity="error" 
                  icon={<ErrorIcon />}
                  sx={{ mb: 3, borderRadius: 2 }}
                >
                  {t('contact_error')}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
                <Grid container spacing={3}>
                  {/* First Row */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="name"
                      label={t('contact_name_label')}
                      placeholder={t('contact_name_placeholder')}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(79, 70, 229, 0.6)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4f46e5',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(15,23,42,0.7)',
                          fontWeight: 500,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#4f46e5',
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      label={t('contact_email_label')}
                      placeholder={t('contact_email_placeholder')}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(79, 70, 229, 0.6)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4f46e5',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(15,23,42,0.7)',
                          fontWeight: 500,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#4f46e5',
                        },
                      }}
                    />
                  </Grid>
                  
                  {/* Second Row */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="phone"
                      label={t('contact_phone_label')}
                      placeholder={t('contact_phone_placeholder')}
                      value={formData.phone}
                      onChange={handleInputChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(79, 70, 229, 0.6)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4f46e5',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(15,23,42,0.7)',
                          fontWeight: 500,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#4f46e5',
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="subject"
                      label={t('contact_subject_label')}
                      placeholder={t('contact_subject_placeholder')}
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(79, 70, 229, 0.6)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4f46e5',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(15,23,42,0.7)',
                          fontWeight: 500,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#4f46e5',
                        },
                      }}
                    />
                  </Grid>
                  
                  {/* Message Field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="message"
                      label={t('contact_message_label')}
                      placeholder={t('contact_message_placeholder')}
                      value={formData.message}
                      onChange={handleInputChange}
                      multiline
                      rows={5}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(79, 70, 229, 0.6)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#4f46e5',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(15,23,42,0.7)',
                          fontWeight: 500,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#4f46e5',
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 6, textAlign: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                      borderRadius: 3,
                      px: 6,
                      py: 2.5,
                      fontSize: 16,
                      fontWeight: 700,
                      textTransform: 'none',
                      boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #3730a3 0%, #15803d 100%)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 32px rgba(79, 70, 229, 0.5)',
                      },
                      '&:disabled': {
                        background: 'rgba(15, 23, 42, 0.3)',
                        color: 'rgba(15, 23, 42, 0.5)',
                        transform: 'none',
                        boxShadow: 'none',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      minWidth: 180,
                      height: 56
                    }}
                  >
                    {isSubmitting ? t('contact_sending') : t('contact_send_button')}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Info & Quick Links */}
        <Grid item xs={12} lg={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}>
            {/* Contact Information */}
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
              border: '1px solid rgba(79, 70, 229, 0.15)',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
              borderRadius: 4,
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 50px rgba(79, 70, 229, 0.2), 0 8px 20px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography sx={{ 
                  fontSize: 24, 
                  fontWeight: 900, 
                  background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 4,
                  textAlign: 'center'
                }}>
                  {t('contact_info_title')}
                </Typography>
                
                <Grid container spacing={3}>
                  {contactInfo.map((info, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper sx={{ 
                        p: 3, 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                        border: '1px solid rgba(79, 70, 229, 0.2)',
                        borderRadius: 4,
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                          borderColor: 'rgba(79, 70, 229, 0.4)',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 28px rgba(79, 70, 229, 0.2)'
                        }
                      }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                          <Box sx={{ 
                            p: 2, 
                            borderRadius: 3, 
                            background: `linear-gradient(135deg, ${info.icon.props.sx.color}20 0%, ${info.icon.props.sx.color}10 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: `0 8px 20px ${info.icon.props.sx.color}30`
                            }
                          }}>
                            {info.icon}
                          </Box>
                          <Box>
                            <Typography sx={{ 
                              fontSize: 14, 
                              color: 'rgba(15,23,42,0.6)',
                              mb: 1,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            }}>
                              {info.title}
                            </Typography>
                            <Typography sx={{ 
                              fontSize: 15, 
                              fontWeight: 600, 
                              color: 'rgba(15,23,42,0.9)',
                              lineHeight: 1.4
                            }}>
                              {info.value}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Social Media & Quick Links */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 50px rgba(79, 70, 229, 0.2), 0 8px 20px rgba(0,0,0,0.12)'
                  }
                }}>
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ 
                      fontSize: 20, 
                      fontWeight: 900, 
                      background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 3,
                      textAlign: 'center'
                    }}>
                      {t('contact_social_title')}
                    </Typography>
                    
                    <Typography sx={{ 
                      fontSize: 14, 
                      color: 'rgba(15,23,42,0.7)',
                      mb: 4,
                      textAlign: 'center',
                      lineHeight: 1.5
                    }}>
                      {t('contact_follow_us')}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: 2,
                      flexWrap: 'wrap',
                      flex: 1,
                      alignItems: 'center'
                    }}>
                      {socialLinks.map((social, index) => (
                        <IconButton
                          key={index}
                          sx={{
                            width: 48,
                            height: 48,
                            background: `linear-gradient(135deg, ${social.color}20 0%, ${social.color}10 100%)`,
                            border: `2px solid ${social.color}30`,
                            color: social.color,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${social.color}30 0%, ${social.color}20 100%)`,
                              transform: 'translateY(-4px) scale(1.15)',
                              boxShadow: `0 12px 28px ${social.color}50`
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  border: '1px solid rgba(79, 70, 229, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 50px rgba(79, 70, 229, 0.2), 0 8px 20px rgba(0,0,0,0.12)'
                  }
                }}>
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ 
                      fontSize: 20, 
                      fontWeight: 900, 
                      background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 3,
                      textAlign: 'center'
                    }}>
                      {t('contact_quick_links')}
                    </Typography>
                    
                    <Grid container spacing={1} sx={{ flex: 1 }}>
                      {quickLinks.map((link, index) => (
                        <Grid item xs={6} key={index}>
                          <Link 
                            href={link.href} 
                            sx={{ 
                              display: 'block',
                              p: 2,
                              textAlign: 'center',
                              color: 'rgba(15,23,42,0.7)',
                              textDecoration: 'none',
                              borderRadius: 3,
                              fontWeight: 600,
                              fontSize: 12,
                              transition: 'all 0.3s ease',
                              border: '1px solid rgba(79, 70, 229, 0.1)',
                              background: 'rgba(255,255,255,0.5)',
                              '&:hover': {
                                color: '#4f46e5',
                                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                                borderColor: 'rgba(79, 70, 229, 0.3)'
                              }
                            }}
                          >
                            {link.label}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
