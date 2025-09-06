import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { Link } from 'react-router-dom';

// Move slides data outside the component to avoid re-creation
const slidesData = [
  {
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop&crop=center&auto=format&q=80',
    fallbackSrc: 'https://picsum.photos/1600/900?random=1',
    titleKey: 'hero1_title',
    subtitleKey: 'hero1_sub',
    ctaKey: 'hero1_cta',
    href: '/products',
  },
  {
    src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop&crop=center&auto=format&q=80',
    fallbackSrc: 'https://picsum.photos/1600/900?random=2',
    titleKey: 'hero2_title',
    subtitleKey: 'hero2_sub',
    ctaKey: 'hero2_cta',
    href: '/products',
  },
  {
    src: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1600&h=900&fit=crop&crop=center&auto=format&q=80',
    fallbackSrc: 'https://picsum.photos/1600/900?random=3',
    titleKey: 'hero3_title',
    subtitleKey: 'hero3_sub',
    ctaKey: 'hero3_cta',
    href: '/products',
  },
];

export default function HeroSlider() {
  const { dir, t } = useLanguage();
  const [index, setIndex] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [imageErrors, setImageErrors] = React.useState({});
  const [currentImageSrc, setCurrentImageSrc] = React.useState({});
  const [imageLoading, setImageLoading] = React.useState({});

  // Create slides with translations
  const slides = React.useMemo(() => {
    return slidesData.map(slide => ({
      ...slide,
      title: t(slide.titleKey),
      subtitle: t(slide.subtitleKey),
      cta: { label: t(slide.ctaKey), href: slide.href },
    }));
  }, [t]);

  // Debug: Log current language and slides
  React.useEffect(() => {
    console.log('Current language:', t('nav_home'));
    console.log('Slides:', slides);
  }, [t, slides]);

  // Force re-render when language changes
  React.useEffect(() => {
    // This will force the component to re-render when language changes
  }, [t]);


  const goTo = (i) => {
    const next = (i + slides.length) % slides.length;
    setIndex(next);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const handleImageError = (slideIndex) => {
    const slide = slidesData[slideIndex];
    
    if (slide.fallbackSrc && !imageErrors[slideIndex]) {
      // Try fallback image first
      setCurrentImageSrc(prev => ({ ...prev, [slideIndex]: slide.fallbackSrc }));
    } else {
      // Mark as error if fallback also fails
      setImageErrors(prev => ({ ...prev, [slideIndex]: true }));
    }
  };

  const getImageSrc = (slideIndex) => {
    const slide = slidesData[slideIndex];
    return currentImageSrc[slideIndex] || slide.src;
  };

  React.useEffect(() => {
    const id = setInterval(() => {
      if (!hovered) {
        setIndex((v) => (v + 1) % slides.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [hovered, slides.length]);

  // Preload images
  React.useEffect(() => {
    slidesData.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.src;
      img.onload = () => {
        // Image preloaded successfully
      };
      img.onerror = () => {
        if (slide.fallbackSrc) {
          const fallbackImg = new Image();
          fallbackImg.src = slide.fallbackSrc;
        }
      };
    });
  }, []);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  return (
    <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 1.5, md: 2.5 }, direction: dir }}>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          borderRadius: { xs: 0, md: 2 },
          border: '1px solid rgba(15, 23, 42, 0.06)',
          background: 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(10px) saturate(160%)',
          boxShadow: '0 6px 24px rgba(83, 100, 173, 0.18)',
          '::before': {
            content: '""', position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: { xs: 0, md: 2 },
            padding: '1px', background: 'linear-gradient(90deg, rgba(99,102,241,0.45), rgba(34,211,238,0.35))',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
      <Box sx={{ position: 'absolute', top: 10, [dir === 'rtl' ? 'right' : 'left']: 12, zIndex: 4, px: 1.25, py: 0.5,
                 borderRadius: 999, fontSize: 12, fontWeight: 700,
                 color: '#0f172a', backgroundColor: 'rgba(255,255,255,0.9)',
                 boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
        {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </Box>
      <Box
        sx={{
          direction: 'ltr',
          display: 'flex',
          transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          transform: `translateX(-${index * 100}%)`,
          height: { xs: 260, sm: 380, md: 520 },
        }}
      >
        {slides.map((slide, i) => (
          <Box key={i} sx={{ flex: '0 0 100%', position: 'relative', background: 'linear-gradient(180deg, #f8fafc, #eef2ff)' }}>
            <Box
              sx={{
                position: 'absolute', inset: 0,
                background: dir === 'rtl' 
                  ? 'linear-gradient(90deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.15) 60%, rgba(15,23,42,0.05) 100%)'
                  : 'linear-gradient(270deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.15) 60%, rgba(15,23,42,0.05) 100%)',
                zIndex: 1,
              }}
            />
            {!imageErrors[i] ? (
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                {imageLoading[i] && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    جاري التحميل...
                  </Box>
                )}
                <Box
                  component="img"
                  src={getImageSrc(i)}
                  alt={slide.title}
                  loading="eager"
                  sx={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transform: i === index ? 'scale(1.04)' : 'scale(1.0)',
                    transition: 'transform 1200ms ease',
                    opacity: imageLoading[i] ? 0.3 : 1,
                  }}
                  onLoadStart={() => {
                    setImageLoading(prev => ({ ...prev, [i]: true }));
                  }}
                  onError={() => handleImageError(i)}
                  onLoad={() => {
                    setImageLoading(prev => ({ ...prev, [i]: false }));
                    // Reset error state when image loads successfully
                    if (imageErrors[i]) {
                      setImageErrors(prev => ({ ...prev, [i]: false }));
                    }
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%', height: '100%', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  padding: '2rem'
                }}
              >
                <Box>
                  <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    {slide.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    {slide.subtitle}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box sx={{ 
              position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', 
              justifyContent: dir === 'rtl' ? 'flex-start' : 'flex-end' 
            }}>
              <Box sx={{ 
                [dir === 'rtl' ? 'pl' : 'pr']: { xs: 2, sm: 4, md: 6 }, 
                [dir === 'rtl' ? 'pr' : 'pl']: { xs: 2, sm: 4 }, 
                py: { xs: 1.75, md: 2.25 }, 
                textAlign: dir === 'rtl' ? 'right' : 'left', 
                maxWidth: { xs: '92%', sm: '70%', md: '55%' }, 
                [dir === 'rtl' ? 'mr' : 'ml']: 'auto', 
                background: 'rgba(15,23,42,0.35)', 
                borderRadius: { xs: 0, md: 2 }, 
                boxShadow: '0 14px 40px rgba(0,0,0,0.18)', 
                backdropFilter: 'blur(8px)' 
              }}>
                <Typography variant="h3" sx={{
                  fontSize: { xs: 26, sm: 34, md: 54 },
                  fontWeight: 900, color: '#fff', mb: 1,
                  textShadow: '0 3px 10px rgba(0,0,0,0.35)',
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 700ms ease',
                  display: '-webkit-box', WebkitLineClamp: { xs: 2, md: 2 }, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {slide.title}
                </Typography>
                <Typography variant="h6" sx={{
                  fontSize: { xs: 15, sm: 17, md: 20 }, color: 'rgba(255,255,255,0.95)',
                  textShadow: '0 2px 6px rgba(0,0,0,0.25)',
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 800ms ease 60ms',
                  display: '-webkit-box', WebkitLineClamp: { xs: 2, md: 2 }, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {slide.subtitle}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1.25, justifyContent: dir === 'rtl' ? 'flex-start' : 'flex-end' }}>
                  <Button
                    component={Link}
                    to={slide.cta?.href || '/products'}
                    variant="contained"
                    sx={{
                      textTransform: 'none', borderRadius: 999, px: 2.75, py: 1.05,
                      backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                      boxShadow: '0 10px 24px rgba(99, 102, 241, 0.38)',
                      '&:hover': {
                        backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)',
                        boxShadow: '0 12px 28px rgba(99, 102, 241, 0.48)'
                      }
                    }}
                  >
                    {slide.cta?.label || t('hero1_cta')}
                  </Button>
                  <Button
                    component={Link}
                    to="/products"
                    variant="outlined"
                    sx={{
                      textTransform: 'none', borderRadius: 999, px: 2.35, py: 0.95,
                      color: '#fff', borderColor: 'rgba(255,255,255,0.75)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.2)' }
                    }}
                  >
                    {t('browse_categories')}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={dir === 'rtl' ? next : prev}
        aria-label="previous"
        sx={{
          position: 'absolute', top: '50%', [dir === 'rtl' ? 'right' : 'left']: 12, transform: 'translateY(-50%)', zIndex: 3,
          width: 44, height: 44,
          color: '#0f172a', backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(15,23,42,0.08)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
        }}
      >
        {dir === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
      <IconButton
        onClick={dir === 'rtl' ? prev : next}
        aria-label="next"
        sx={{
          position: 'absolute', top: '50%', [dir === 'rtl' ? 'left' : 'right']: 12, transform: 'translateY(-50%)', zIndex: 3,
          width: 44, height: 44,
          color: '#0f172a', backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(15,23,42,0.08)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
        }}
      >
        {dir === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      <Box sx={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 1.2, zIndex: 3 }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 28 : 8,
              height: 8,
              borderRadius: 999,
              transition: 'all 300ms ease',
              backgroundColor: i === index ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.55)',
              boxShadow: i === index ? '0 6px 14px rgba(255,255,255,0.45)' : 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
      </Box>
    </Box>
  );
}


