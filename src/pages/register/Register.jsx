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

export default function Register() {
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
              Create <span className="text-gradient">account</span>
            </Typography>
            <Typography sx={{ color: 'rgba(15,23,42,0.72)', mb: 3 }}>Join and start shopping smarter</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'grid', gap: 1.75 }}>
              <TextField
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: { value: 3, message: 'At least 3 characters' },
                })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                label="Full name"
                size="medium"
                fullWidth
                placeholder="Your full name"
                InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>) }}
              />
              <TextField
                {...register('userName', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'At least 3 characters' },
                  pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Only letters, numbers, _' },
                })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                label="Username"
                size="medium"
                fullWidth
                placeholder="Choose a username"
                InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment>) }}
              />
              <TextField
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                type="email"
                size="medium"
                fullWidth
                placeholder="Your email"
                InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>) }}
              />
              <TextField
                {...register('phoneNumber', {
                  required: 'Phone is required',
                  pattern: { value: /^0\d{9}$/, message: 'Format: 0XXXXXXXXX' },
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                label="Phone number"
                type="tel"
                size="medium"
                fullWidth
                placeholder="05XXXXXXXX"
                InputProps={{ startAdornment: (<InputAdornment position="start">+970</InputAdornment>) }}
              />
              <TextField
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'At least 8 characters' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                type="password"
                size="medium"
                fullWidth
                placeholder="Create a password"
                InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment>) }}
              />
              <FormControlLabel control={<Checkbox size="small" required />} label={<span>I agree to the <a href="#" style={{ color: '#4f46e5', textDecoration: 'none' }}>Terms</a> and <a href="#" style={{ color: '#4f46e5', textDecoration: 'none' }}>Privacy</a></span>} />
              <Button type="submit" variant="contained" disabled={isLoading} sx={{
                textTransform: 'none', borderRadius: 999, py: 1.1,
                backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)', boxShadow: '0 8px 22px rgba(99, 102, 241, 0.35)',
                '&:hover': { backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', boxShadow: '0 10px 26px rgba(99, 102, 241, 0.45)' }
              }}>{isLoading ? 'Processing...' : 'Register'}</Button>
              <Typography sx={{ fontSize: '0.95rem', color: 'rgba(15,23,42,0.75)' }}>Already have an account? <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none' }}>Log in</Link></Typography>
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
