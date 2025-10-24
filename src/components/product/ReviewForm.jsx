import * as React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Alert,
  CircularProgress
} from '@mui/material';
import { useLanguage } from '../../i18n/LanguageContext';
import { toast } from 'react-toastify';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';

export default function ReviewForm({ productId, onReviewSubmitted }) {
  const { t } = useLanguage();
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating) {
      setError(t('please_select_rating') || 'يرجى اختيار تقييم');
      return;
    }

    if (!comment.trim()) {
      setError(t('please_write_comment') || 'يرجى كتابة تعليق');
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      toast.error(t('login_required_for_review') || 'يجب تسجيل الدخول لإضافة تقييم');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await AxiosUserInstanse.post('/Reviews', {
        productId: parseInt(productId),
        comment: comment.trim(),
        rate: rating
      });

      toast.success(t('review_submitted_success') || 'تم إرسال التقييم بنجاح');
      setComment('');
      setRating(0);
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      const errorMessage = error?.response?.data?.message || error?.message || t('review_submit_failed') || 'فشل في إرسال التقييم';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ 
      p: 3, 
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
      border: '1px solid rgba(79, 70, 229, 0.15)',
      borderRadius: 3,
      boxShadow: '0 8px 24px rgba(79, 70, 229, 0.1)'
    }}>
      <Typography sx={{ 
        fontSize: 18, 
        fontWeight: 800, 
        color: '#0f172a', 
        mb: 2,
        textAlign: 'center'
      }}>
        {t('write_review') || 'اكتب تقييمك'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgba(15,23,42,0.8)', mb: 1 }}>
            {t('your_rating') || 'تقييمك'}
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large"
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#f59e0b',
              },
              '& .MuiRating-iconHover': {
                color: '#f59e0b',
              },
            }}
          />
        </Box>

        <TextField
          multiline
          rows={4}
          label={t('your_comment') || 'تعليقك'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('write_your_comment_here') || 'اكتب تعليقك هنا...'}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: '#4f46e5',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4f46e5',
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting || !rating || !comment.trim()}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            py: 1.5,
            background: 'linear-gradient(90deg, #4f46e5, #16a34a)',
            '&:hover': {
              background: 'linear-gradient(90deg, #4338ca, #15803d)',
            },
            '&:disabled': {
              background: 'rgba(15,23,42,0.1)',
              color: 'rgba(15,23,42,0.4)',
            },
          }}
        >
          {isSubmitting ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} color="inherit" />
              {t('submitting') || 'جاري الإرسال...'}
            </Box>
          ) : (
            t('submit_review') || 'إرسال التقييم'
          )}
        </Button>
      </Box>
    </Box>
  );
}
