import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import loginImg from '../../assets/imager/login.png'
import axios from 'axios'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { useNavigate, useLocation, Link } from 'react-router-dom'

export default function ResetPassword() {
  const { t, dir } = useLanguage()
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: 'onTouched' })
  const [isLoading, setIsLoading] = React.useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const emailFromState = location.state?.email || ''

  const onSubmit = async ({ email, code, newPassword }) => {
    setIsLoading(true)
    try {
      await toast.promise(
        axios.patch('https://kashop1.runasp.net/api/Identity/Account/reset-password', { 
          email, 
          code, 
          newPassword 
        }),
        {
          pending: t('reset_pending'),
          success: t('reset_success'),
          error: {
            render({ data }) {
              const err = data
              return err?.response?.data?.message || t('reset_failed')
            }
          }
        }
      )
      navigate('/login')
    } catch (_) {
      // Error handled by toast
    } finally {
      setIsLoading(false)
    }
  }

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
              <span className="text-gradient">{t('reset_title')}</span>
            </Typography>
            <Typography sx={{ color: 'rgba(15,23,42,0.72)', mb: 3, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
              {t('reset_sub')}
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 1.75 }}>
              <TextField
                {...register('email', { 
                  required: t('email_label') + ' ' + (dir === 'rtl' ? 'مطلوب' : 'required'),
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('email_label') + ' ' + (dir === 'rtl' ? 'غير صالح' : 'invalid') }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                label={t('email_label')}
                type="email"
                size="medium"
                fullWidth
                placeholder={t('email_placeholder')}
                defaultValue={emailFromState}
                InputProps={{ 
                  startAdornment: (<InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>) 
                }}
                sx={{ 
                  direction: dir,
                  '& .MuiInputBase-input': {
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }
                }}
              />
              <TextField
                {...register('code', { 
                  required: t('code_label') + ' ' + (dir === 'rtl' ? 'مطلوب' : 'required'),
                  minLength: { value: 4, message: dir === 'rtl' ? '4 أرقام فأكثر' : 'At least 4 characters' }
                })}
                error={!!errors.code}
                helperText={errors.code?.message}
                label={t('code_label')}
                type="text"
                size="medium"
                fullWidth
                placeholder={t('code_placeholder')}
                InputProps={{ 
                  startAdornment: (<InputAdornment position="start"><VpnKeyIcon fontSize="small" /></InputAdornment>) 
                }}
                sx={{ 
                  direction: dir,
                  '& .MuiInputBase-input': {
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }
                }}
              />
              <TextField
                {...register('newPassword', { 
                  required: t('new_password_label') + ' ' + (dir === 'rtl' ? 'مطلوبة' : 'required'),
                  minLength: { value: 6, message: dir === 'rtl' ? 'على الأقل 6 أحرف' : 'At least 6 characters' }
                })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                label={t('new_password_label')}
                type="password"
                size="medium"
                fullWidth
                placeholder={t('new_password_placeholder')}
                InputProps={{ 
                  startAdornment: (<InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>) 
                }}
                sx={{ 
                  direction: dir,
                  '& .MuiInputBase-input': {
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }
                }}
              />
              <Button type="submit" variant="contained" disabled={isLoading} sx={{
                textTransform: 'none',
                borderRadius: 999,
                py: 1.1,
                backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                boxShadow: '0 8px 22px rgba(99, 102, 241, 0.35)',
                '&:hover': { backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', boxShadow: '0 10px 26px rgba(99, 102, 241, 0.45)' }
              }}>
                {isLoading ? t('processing') : t('set_new_password_btn')}
              </Button>
              <Typography sx={{ fontSize: '0.95rem', color: 'rgba(15,23,42,0.75)', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                {t('remembered_password')} <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none' }}>{t('back_to_login')}</Link>
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <img
              src={loginImg}
              alt="Reset password"
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
