import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop',
    title: 'خصومات كبيرة على أحدث المنتجات',
    subtitle: 'تسوق الآن واحصل على أفضل العروض',
    cta: { label: 'تسوق الآن', href: '/cart' },
  },
  {
    src: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1600&auto=format&fit=crop',
    title: 'تجربة تسوق عصرية وسهلة',
    subtitle: 'واجهات سلسة وأداء سريع لكل أجهزتك',
    cta: { label: 'اكتشف المزيد', href: '/' },
  },
  {
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop',
    title: 'منتجات أصلية 100%',
    subtitle: 'ضمان استرجاع واستبدال بكل سهولة',
    cta: { label: 'تعرّف على العروض', href: '/' },
  },
];

export default function HeroSlider() {
  const [index, setIndex] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);

  const goTo = (i) => {
    const next = (i + slides.length) % slides.length;
    setIndex(next);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  React.useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => {
      setIndex((v) => (v + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [hovered]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  return (
    <Box sx={{ width: 'min(1400px, 96%)', mx: 'auto', mt: { xs: 1.5, md: 2.5 } }}>
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
      <Box sx={{ position: 'absolute', top: 10, right: 12, zIndex: 4, px: 1.25, py: 0.5,
                 borderRadius: 999, fontSize: 12, fontWeight: 700,
                 color: '#0f172a', backgroundColor: 'rgba(255,255,255,0.9)',
                 boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
        {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </Box>
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          transform: `translateX(-${index * 100}%)`,
          height: { xs: 260, sm: 380, md: 520 },
        }}
      >
        {slides.map((slide, i) => (
          <Box key={i} sx={{ minWidth: '100%', position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(270deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.15) 60%, rgba(15,23,42,0.05) 100%)',
                zIndex: 1,
              }}
            />
            <Box
              component="img"
              src={slide.src}
              alt={slide.title}
              sx={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                transform: i === index ? 'scale(1.04)' : 'scale(1.0)',
                transition: 'transform 1200ms ease',
              }}
            />
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Box sx={{ pr: { xs: 2, sm: 4, md: 6 }, pl: { xs: 2, sm: 4 }, py: { xs: 1.5, md: 2 }, textAlign: 'right', maxWidth: { xs: '92%', sm: '70%', md: '55%' }, ml: 'auto', background: 'rgba(15,23,42,0.28)', borderRadius: { xs: 0, md: 2 }, boxShadow: '0 12px 38px rgba(0,0,0,0.14)', backdropFilter: 'blur(6px)' }}>
                <Typography variant="h3" sx={{
                  fontSize: { xs: 24, sm: 32, md: 50 },
                  fontWeight: 900, color: '#fff', mb: 1,
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 700ms ease',
                  display: '-webkit-box', WebkitLineClamp: { xs: 2, md: 2 }, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {slide.title}
                </Typography>
                <Typography variant="h6" sx={{
                  fontSize: { xs: 14, sm: 16, md: 18 }, color: 'rgba(255,255,255,0.92)',
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 800ms ease 60ms',
                  display: '-webkit-box', WebkitLineClamp: { xs: 2, md: 2 }, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {slide.subtitle}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1.25, justifyContent: 'flex-end' }}>
                  <Button
                    href={slide.cta?.href || '#'}
                    variant="contained"
                    sx={{
                      textTransform: 'none', borderRadius: 999, px: 2.5, py: 1,
                      backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                      boxShadow: '0 8px 22px rgba(99, 102, 241, 0.35)',
                      '&:hover': {
                        backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)',
                        boxShadow: '0 10px 26px rgba(99, 102, 241, 0.45)'
                      }
                    }}
                  >
                    {slide.cta?.label || 'تسوق الآن'}
                  </Button>
                  <Button
                    href="/"
                    variant="outlined"
                    sx={{
                      textTransform: 'none', borderRadius: 999, px: 2.25, py: 0.95,
                      color: '#fff', borderColor: 'rgba(255,255,255,0.7)',
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.18)' }
                    }}
                  >
                    تصفّح الأقسام
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={prev}
        aria-label="previous"
        sx={{
          position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', zIndex: 3,
          width: 44, height: 44,
          color: '#0f172a', backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(15,23,42,0.08)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        onClick={next}
        aria-label="next"
        sx={{
          position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', zIndex: 3,
          width: 44, height: 44,
          color: '#0f172a', backgroundColor: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(15,23,42,0.08)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
        }}
      >
        <ChevronRightIcon />
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


