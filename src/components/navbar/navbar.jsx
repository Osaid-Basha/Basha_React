import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Divider from '@mui/material/Divider';
import logo from '../../assets/imager/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import TranslateIcon from '@mui/icons-material/Translate';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

const pages = [
  { label: 'nav_home', path: '/' },
  { label: 'nav_products', path: '/products' },
];
const settings = ['nav_profile', 'nav_account', 'nav_dashboard', 'nav_logout'];

function ResponsiveAppBar() {
  const { lang, dir, t, setLang } = useLanguage();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  // Removed cart count
  const [currentUser, setCurrentUser] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    setScrolled(trigger);
  }, [trigger]);

  React.useEffect(() => {
    // Cart count removed
    try {
      const rawUser = localStorage.getItem('user');
      setCurrentUser(rawUser ? JSON.parse(rawUser) : null);
    } catch {
      setCurrentUser(null);
    }
    const handleStorage = (e) => {
      // No cart listener
      if (e.key === 'user') {
        try {
          setCurrentUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setCurrentUser(null);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    try { localStorage.removeItem('user'); } catch {}
    setCurrentUser(null);
    setAnchorElUser(null);
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={scrolled ? 6 : 0}
      className={`${styles.themeLight} ${scrolled ? styles.appBarScrolled : styles.appBar}`}
      sx={{ color: '#0f172a', direction: dir }}
    >
      <Container maxWidth="xl" sx={{ py: 0.5 }}>
        <Toolbar disableGutters className={`${styles.navInner} ${scrolled ? styles.navInnerScrolled : ''}`}>
          
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.5rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt="Kashop" className={styles.logo} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.path}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t(page.label)}</Typography>
                </MenuItem>
              ))}
              <Divider sx={{ my: 0.5 }} />
              {currentUser ? (
                <>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/profile">
                    <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('nav_profile')}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/account">
                    <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('nav_account')}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
                    <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('nav_logout')}</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleCloseNavMenu}
                    sx={{ my: 0.25, borderRadius: 2, backgroundColor: 'rgba(15,23,42,0.04)' }}
                  >
                    <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('nav_login')}</Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/register" onClick={handleCloseNavMenu}
                    sx={{ my: 0.25, borderRadius: 2, backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)', color: '#fff' }}
                  >
                    <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left', color: '#fff' }}>{t('nav_register')}</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt="Kashop" className={styles.logoMobile} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Button
                  key={page.path}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 1.5,
                    px: 2,
                    color: isActive ? '#0f172a' : 'rgba(15,23,42,0.7)',
                    backgroundColor: isActive ? 'rgba(15,23,42,0.06)' : 'transparent',
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'rgba(15,23,42,0.08)' },
                  }}
                >
                  {t(page.label === 'الرئيسية' || page.label === 'Home' ? 'nav_home' : 'nav_products')}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              component={Link}
              to="/cart"
              size="large"
              aria-label="open cart"
              color="primary"
              sx={{
                borderRadius: 999,
                backgroundColor: 'rgba(15,23,42,0.04)',
                '&:hover': { backgroundColor: 'rgba(15,23,42,0.08)' }
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              startIcon={<TranslateIcon />}
              sx={{ textTransform: 'none', borderRadius: 999 }}
            >
              {t('lang_toggle')}
            </Button>
            {currentUser ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ display: { xs: 'none', md: 'block' }, mr: 0.5 }}>
                  {currentUser?.name || 'User'}
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="الحساب">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={currentUser?.name || 'User'} src={currentUser?.avatarUrl || ''} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
                      <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('nav_profile')}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/account'); }}>
                      <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('nav_account')}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('nav_logout')}</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.25 }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 999,
                    px: 2.5,
                    py: 0.75,
                    borderColor: 'rgba(15,23,42,0.15)',
                    backgroundColor: 'rgba(15,23,42,0.04)',
                    '&:hover': { borderColor: 'rgba(15,23,42,0.25)', backgroundColor: 'rgba(15,23,42,0.08)' }
                  }}
                >
                  {t('nav_login')}
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 999,
                    px: 2.75,
                    py: 0.9,
                    backgroundImage: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                    boxShadow: '0 8px 22px rgba(99, 102, 241, 0.35)',
                    '&:hover': { backgroundImage: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)', boxShadow: '0 10px 26px rgba(99, 102, 241, 0.45)' }
                  }}
                >
                  {t('nav_register')}
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
