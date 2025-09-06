import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import loginImg from '../../assets/imager/register.png'
import InputAdornment from '@mui/material/InputAdornment'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function Register() {
  const { t, dir } = useLanguage()
  // نموذج التسجيل الجديد يتطلب الحقول التالية:
  // email, userName, fullName, phoneNumber, password, confirmPassword, acceptTerms
  const schema = yup.object({
    fullName: yup
      .string()
      .required('Full name is required')
      .min(3, 'At least 3 characters'),
    userName: yup
      .string()
      .required('Username is required')
      .min(3, 'At least 3 characters'),
    email: yup
      .string()
      .required('Email is required')
      .email('Enter a valid email'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^05\d{8}$/, 'Enter a valid Saudi phone number'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'At least 6 characters'),
    acceptTerms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms')
  })
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' },{resolver:yupResolver(schema)});
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async(data) => { 
    setIsLoading(true);
    try {
      await toast.promise(
        axios.post("http://mytest1.runasp.net/api/Identity/Account/Register", data),
        {
          pending: 'Processing... ',
          success: 'Registered successfully',
          error: {
            render({ data }) {
              const err = data;
              return err?.response?.data?.message || 'Registration failed';
            }
          }
        }
      );
      navigate('/login');
    } catch (error) {
      console.log('catch error', error);
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 3, md: 6 }, direction: dir }}>
      <Paper elevation={0} sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        border: '1px solid rgba(15,23,42,0.08)',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 12px 36px rgba(83,100,173,0.22)'
      }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' }, gap: { xs: 3, md: 5 }, alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.75, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              {t('register_title')}
            </Typography>
            <Typography sx={{ color: 'rgba(15,23,42,0.72)', mb: 3, textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('register_sub')}</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 1.75 }}>
              <TextField
                {...register('fullName', {
                  required: t('full_name_label') + ' ' + 'مطلوب',
                  minLength: { value: 3, message: 'على الأقل 3 أحرف' },
                })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                label={t('full_name_label')}
                size="medium"
                fullWidth
                placeholder={t('full_name_placeholder')}
                InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>) }}
                sx={{ 
                  direction: dir,
                  '& .MuiInputBase-input': {
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }
                }}
              />
              <TextField
                {...register('userName', {
                  required: t('username_label') + ' ' + 'مطلوب',
                  minLength: { value: 3, message: 'على الأقل 3 أحرف' },
                  pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'حروف وأرقام وشرطة سفلية فقط' },
                })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                label={t('username_label')}
                size="medium"
                fullWidth
                placeholder={t('username_placeholder')}
                InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>) }}
                sx={{ 
                  direction: dir,
                  '& .MuiInputBase-input': {
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }
                }}
              />
              <TextField
                {...register('email', {
                  required: t('email_label') + ' ' + 'مطلوب',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('email_label') + ' ' + 'غير صالح' },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                label={t('email_label')}
                type="email"
                size="medium"
                fullWidth
                placeholder={t('email_placeholder')}
                InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>) }}
                sx={{ 
                  direction: dir,
                  '& .MuiInputBase-input': {
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }
                }}
              />
              <TextField
                {...register('phoneNumber', {
                  required: t('phone_label') + ' ' + 'مطلوب',
                  pattern: { value: /^0\d{9}$/, message: 'الصيغة: 0XXXXXXXXX' },
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                label={t('phone_label')}
                type="tel"
                size="medium"
                fullWidth
                placeholder={t('phone_placeholder')}
                InputProps={{ startAdornment: (<InputAdornment position="start">+970</InputAdornment>) }}
                sx={{ 
                  direction: dir,
                  '& .MuiInputBase-input': {
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }
                }}
              />
              <TextField
                {...register('password', {
                  required: t('password_label') + ' ' + 'مطلوبة',
                  minLength: { value: 8, message: 'على الأقل 8 أحرف' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label={t('password_label')}
                type="password"
                size="medium"
                fullWidth
                placeholder={t('create_password_placeholder')}
                InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>) }}
                sx={{ 
                  direction: dir,
                  '& .MuiInputBase-input': {
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }
                }}
              />
              <FormControlLabel control={<Checkbox size="small" required />} label={<span>{t('terms_text')}</span>} />
              <Button type="submit" variant="contained" disabled={isLoading} sx={{
                textTransform: 'none', borderRadius: 999, py: 1.1,
                backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)', boxShadow: '0 8px 22px rgba(99, 102, 241, 0.35)',
                '&:hover': { backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', boxShadow: '0 10px 26px rgba(99, 102, 241, 0.45)' }
              }}>{isLoading ? t('register_pending') : t('register_btn')}</Button>
              <Typography sx={{ fontSize: '0.95rem', color: 'rgba(15,23,42,0.75)', textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('already_have_account')} <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none' }}>{t('login_link')}</Link></Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <img
              src={loginImg}
              alt="Secure login"
              style={{
                maxWidth: '560px',
                width: '100%',
                height: 'auto',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.02) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.02) 100%)',
                mixBlendMode: 'multiply'
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
