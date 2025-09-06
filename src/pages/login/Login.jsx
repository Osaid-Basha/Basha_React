import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import loginImg from '../../assets/imager/login.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function Login() {
  const { t, dir } = useLanguage()
  const navigate = useNavigate();
  const { register , handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });
  const [isLoading, setIsLoading] = React.useState(false);


  const onSubmit = async (data) => {
   
    setIsLoading(true);
    try {
      const res = await toast.promise(
        axios.post("http://mytest1.runasp.net/api/Identity/Account/Login", data),
        {
          pending: t('login_pending'),
          success: t('login_success'),
          error: {
            render({ data }) {
              const err = data;
              return err?.response?.data?.message || t('login_failed');
            }
          }
        }
      );
   
     
    localStorage.setItem('auth_token', res.data.token);
    
      
    
      navigate('/');
    } catch (err) {
      
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
              <span className="text-gradient">{t('login_title')}</span>
            </Typography>
            <Typography sx={{ color: 'rgba(15,23,42,0.72)', mb: 3, textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('login_sub')}</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 1.75 }}>
              <TextField
                {...register('email', {
                  required: t('email_label') + ' ' + (dir === 'rtl' ? 'مطلوب' : 'required'),
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('email_label') + ' ' + (dir === 'rtl' ? 'غير صالح' : 'invalid') },
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
                {...register('password', { 
                  required: t('password_label') + ' ' + (dir === 'rtl' ? 'مطلوبة' : 'required'), 
                  minLength: { value: 6, message: dir === 'rtl' ? 'على الأقل 6 أحرف' : 'At least 6 characters' } 
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label={t('password_label')}
                type="password"
                size="medium"
                fullWidth
                placeholder={t('password_placeholder')}
                InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>) }}
                sx={{ 
                  direction: dir,
                  '& .MuiInputBase-input': {
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel control={<Checkbox size="small" />} label={t('remember_me')} />
                <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#4f46e5' }}>{t('forgot_password')}</Link>
              </Box>
              <Button type="submit" variant="contained" disabled={isLoading} sx={{
                textTransform: 'none',
                borderRadius: 999,
                py: 1.1,
                backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                boxShadow: '0 8px 22px rgba(99, 102, 241, 0.35)',
                '&:hover': { backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', boxShadow: '0 10px 26px rgba(99, 102, 241, 0.45)' }
              }}>{isLoading ? t('login_pending') : t('login_btn')}</Button>
              <Typography sx={{ fontSize: '0.95rem', color: 'rgba(15,23,42,0.75)', textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('dont_have_account')} <Link to="/register" style={{ color: '#4f46e5', textDecoration: 'none' }}>{t('register_link')}</Link></Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Box sx={{
              p: 2,
              borderRadius: 3,
              border: '1px solid rgba(15,23,42,0.06)',
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(6px) saturate(140%)',
            }}>
              <img src={loginImg} alt="Secure login" style={{ maxWidth: '520px', width: '100%', height: 'auto' }} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
