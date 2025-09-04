import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import loginImg from '../../assets/imager/login.png'
import axios from 'axios'

export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' })
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [verified, setVerified] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const onVerify = async ({ email, code }) => {
    setIsVerifying(true)
    try {
      await toast.promise(
        axios.post('http://mytest1.runasp.net/api/Identity/Account/verify-reset-code', { email, code }),
        {
          pending: 'Verifying code... ',
          success: 'Code verified, set a new password',
          error: {
            render({ data }) {
              const err = data
              return err?.response?.data?.message || 'Invalid code'
            }
          }
        }
      )
      setVerified(true)
    } catch (_) {}
    setIsVerifying(false)
  }

  const onSetPassword = async ({ email, code, newPassword }) => {
    setIsLoading(true)
    try {
      await toast.promise(
        axios.post('http://mytest1.runasp.net/api/Identity/Account/reset-password', { email, code, newPassword }),
        {
          pending: 'Updating password... ',
          success: 'Password updated. You can login now',
          error: {
            render({ data }) {
              const err = data
              return err?.response?.data?.message || 'Failed to update password'
            }
          }
        }
      )
    } catch (_) {}
    setIsLoading(false)
  }

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 3, md: 6 } }}>
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
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.75 }}>
              <span className="text-gradient">Reset password</span>
            </Typography>
            <Typography sx={{ color: 'rgba(15,23,42,0.72)', mb: 3 }}>Verify the code sent to your email, then set a new password.</Typography>
            <Box component="form" onSubmit={handleSubmit(verified ? onSetPassword : onVerify)} sx={{ display: 'grid', gap: 1.75 }}>
              <TextField
                {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                type="email"
                size="medium"
                fullWidth
                placeholder="Enter your email"
                InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>) }}
              />
              <TextField
                {...register('code', { required: 'Code is required', minLength: { value: 4, message: '4+ digits' } })}
                error={!!errors.code}
                helperText={errors.code?.message}
                label="Code"
                type="text"
                size="medium"
                fullWidth
                placeholder="Enter the code"
              />
              
                <TextField
                  {...register('newPassword', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  label="New password"
                  type="password"
                  size="medium"
                  fullWidth
                  placeholder="Enter a new password"
                  InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>) }}
                />
           
              <Button type="submit" variant="contained" disabled={isVerifying || isLoading} sx={{
                textTransform: 'none',
                borderRadius: 999,
                py: 1.1,
                backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                boxShadow: '0 8px 22px rgba(99, 102, 241, 0.35)',
                '&:hover': { backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', boxShadow: '0 10px 26px rgba(99, 102, 241, 0.45)' }
              }}>{verified ? (isLoading ? 'Processing...' : 'Set new password') : (isVerifying ? 'Verifying...' : 'Verify code')}</Button>
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
