import * as React from 'react';
import {
  Box,
  Typography,
  Rating,
  Divider,
  Avatar,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../i18n/LanguageContext';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';

export default function ReviewList({ productId }) {
  const { t } = useLanguage();

  const fetchReviews = async () => {
    const response = await AxiosUserInstanse.get(`/Reviews?productId=${productId}`);
    return response.data.data || [];
  };

  const { data: reviews = [], isLoading, isError, error } = useQuery({
    queryKey: ['Reviews', productId],
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 5,
  });

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (name) => {
    if (!name) return '#4f46e5';
    const colors = [
      '#4f46e5', '#16a34a', '#f59e0b', '#ef4444', '#8b5cf6', 
      '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {t('error_loading_reviews') || 'خطأ في تحميل التقييمات'}
      </Alert>
    );
  }

  if (reviews.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 4, 
        color: 'rgba(15,23,42,0.6)',
        background: 'rgba(248,250,252,0.8)',
        borderRadius: 2,
        border: '1px solid rgba(15,23,42,0.08)'
      }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
          {t('no_reviews_yet') || 'لا توجد تقييمات بعد'}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          {t('be_first_to_review') || 'كن أول من يقيم هذا المنتج'}
        </Typography>
      </Box>
    );
  }

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + (review.rate || 0), 0) / reviews.length 
    : 0;

  return (
    <Box>
      {/* Reviews Summary */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 3,
        p: 2,
        background: 'linear-gradient(135deg, rgba(79,70,229,0.05) 0%, rgba(34,197,94,0.05) 100%)',
        borderRadius: 2,
        border: '1px solid rgba(79,70,229,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating 
            value={averageRating} 
            readOnly 
            precision={0.1}
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#f59e0b',
              },
            }}
          />
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
            {averageRating.toFixed(1)}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Typography sx={{ fontSize: 14, color: 'rgba(15,23,42,0.7)' }}>
          {reviews.length} {t('reviews') || 'تقييم'}
        </Typography>
      </Box>

      {/* Reviews List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {reviews.map((review, index) => (
          <Box key={review.id || index} sx={{ 
            p: 2.5, 
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(15,23,42,0.08)',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(15,23,42,0.04)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: getRandomColor(review.fullName),
                width: 40,
                height: 40,
                fontSize: 14,
                fontWeight: 700
              }}>
                {getInitials(review.fullName)}
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                    {review.fullName || t('anonymous') || 'مجهول'}
                  </Typography>
                  <Chip 
                    label={`${review.rate}/5`} 
                    size="small" 
                    sx={{ 
                      height: 20, 
                      fontSize: 11, 
                      fontWeight: 700,
                      background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                      color: 'white'
                    }} 
                  />
                </Box>
                
                <Rating 
                  value={review.rate || 0} 
                  readOnly 
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#f59e0b',
                    },
                    mb: 1
                  }}
                />
                
                {review.comment && (
                  <Typography sx={{ 
                    fontSize: 14, 
                    color: 'rgba(15,23,42,0.8)', 
                    lineHeight: 1.6,
                    mt: 1
                  }}>
                    {review.comment}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
