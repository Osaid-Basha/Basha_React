import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import EmailIcon from '@mui/icons-material/Email'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import registerImg from '../../assets/imager/register.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function ForgotPasswor() {
  const { t, dir } = useLanguage()
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' })
  const [isLoading, setIsLoading] = React.useState(false)

  const navigate = useNavigate()

  const onSubmit = async (data) => {
   
    setIsLoading(true)
    try {
      await toast.promise(
        axios.post("http://mytest1.runasp.net/api/Identity/Account/forgot-password", { email: data.email }),
        {
          pending: t('forgot_pending'),
          success: t('forgot_success'),
          error: {
            render({ data }) {
              const err = data
              return err?.response?.data?.message || t('forgot_failed')
            }
          }
        }
      )
      navigate('/reset-password', { state: { email: data.email } })
    } catch (_) {
      // already handled by toast
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
              <span className="text-gradient">{t('forgot_title')}</span>
            </Typography>
            <Typography sx={{ color: 'rgba(15,23,42,0.72)', mb: 3, textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('forgot_sub')}</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 1.75 }}>
              <TextField
                {...register('email', { required: t('email_label') + ' ' + 'مطلوب', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('email_label') + ' ' + 'غير صالح' } })}
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
              <Button type="submit" variant="contained" disabled={isLoading} sx={{
                textTransform: 'none',
                borderRadius: 999,
                py: 1.1,
                backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                boxShadow: '0 8px 22px rgba(99, 102, 241, 0.35)',
                '&:hover': { backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', boxShadow: '0 10px 26px rgba(99, 102, 241, 0.45)' }
              }}>{isLoading ? t('processing') : t('send_reset_link')}</Button>
              <Typography sx={{ fontSize: '0.95rem', color: 'rgba(15,23,42,0.75)', textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('remembered_password')} <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none' }}>{t('back_to_login')}</Link></Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <img
              src={registerImg}
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
