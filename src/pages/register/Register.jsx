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
      .required(t('full_name_required'))
      .min(3, t('full_name_min_length')),
    userName: yup
      .string()
      .required(t('username_required'))
      .min(3, t('username_min_length')),
    email: yup
      .string()
      .required(t('email_required'))
      .email(t('email_invalid')),
    phoneNumber: yup
      .string()
      .required(t('phone_required'))
      .matches(/^05\d{8}$/, t('phone_invalid')),
    password: yup
      .string()
      .required(t('password_required'))
      .min(6, t('password_min_length')),
    acceptTerms: yup
      .boolean()
      .oneOf([true], t('terms_required'))
  })
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched', resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async(data) => { 
    setIsLoading(true);
    try {
      const res = await toast.promise(
        axios.post("https://kashop1.runasp.net/api/Identity/Account/Register", data),
        {
          pending: t('register_pending'),
          success: t('register_success'),
          error: {
            render({ data }) {
              const err = data;
              return err?.response?.data?.message || t('register_failed');
            }
          }
        }
      );
      
      // If registration is successful and returns a token, login automatically
      if (res.data && res.data.token) {
        localStorage.setItem('auth_token', res.data.token);
        if (res.data.user) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
        
        // Trigger custom event to update navbar
        window.dispatchEvent(new CustomEvent('userLogin', { 
          detail: { user: res.data.user } 
        }));
        
        // Navigate to home page
        navigate('/', { replace: true });
      } else {
        // If no token, go to login page
        navigate('/login');
      }
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
                {...register('fullName')}
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
                {...register('userName')}
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
                {...register('email')}
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
                {...register('phoneNumber')}
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
                {...register('password')}
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
