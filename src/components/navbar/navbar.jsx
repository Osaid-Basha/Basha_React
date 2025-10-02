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
import LogoutIcon from '@mui/icons-material/Logout';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ThemeToggle from '../theme/ThemeToggle';
import { useQuery } from '@tanstack/react-query';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import AxiosUserInstanse from '../../api/AxiosUserInstanse.jsx';

const pages = [
  { label: 'nav_home', path: '/' },
  { label: 'nav_products', path: '/products' },
  { label: 'about_title', path: '/about' },
  { label: 'contact_title', path: '/contact' }
];
const settings = ['nav_profile', 'nav_account', 'nav_dashboard', 'nav_logout'];

function ResponsiveAppBar() {
  const { lang, dir, t, setLang } = useLanguage();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  // Removed cart count
  const [currentUser, setCurrentUser] = React.useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user profile data
  const fetchProfile = async () => {
    try {
      const res = await AxiosUserInstanse.get('/Users/profile');
      return res.data;
    } catch (err) {
      console.error("Error fetching profile:", err);
      return null;
    }
  };

  // Fetch cart data for counter
  const fetchCart = async () => {
    try {
      const res = await AxiosUserInstanse.get(`/Carts`);
      return res.data;
    } catch (err) {
      console.error("Error fetching cart:", err);
      return { items: [], total: 0 };
    }
  };

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchProfile,
    enabled: !!currentUser, // Only fetch if user is logged in
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const { data: cartData } = useQuery({
    queryKey: ['Cart'],
    queryFn: fetchCart,
    enabled: !!currentUser, // Only fetch if user is logged in
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  });

  const cartItemCount = cartData?.items?.reduce((total, item) => total + item.count, 0) || 0;

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
    // Check for both user data and auth token
    const checkUser = () => {
      try {
        const rawUser = localStorage.getItem('user');
        const authToken = localStorage.getItem('auth_token');
        const user = (rawUser && authToken) ? JSON.parse(rawUser) : null;
        setCurrentUser(user);
        // Removed console.log to prevent spam
      } catch (error) {
        console.error('Error parsing user data:', error);
        setCurrentUser(null);
      }
    };
    
    // Initial check only
    checkUser();
    
    const handleStorage = (e) => {
      if (e.key === 'user' || e.key === 'auth_token') {
        try {
          const rawUser = localStorage.getItem('user');
          const authToken = localStorage.getItem('auth_token');
          setCurrentUser((rawUser && authToken) ? JSON.parse(rawUser) : null);
        } catch {
          setCurrentUser(null);
        }
      }
    };

    const handleUserLogin = (e) => {
      try {
        const rawUser = localStorage.getItem('user');
        const authToken = localStorage.getItem('auth_token');
        const user = (rawUser && authToken) ? JSON.parse(rawUser) : null;
        setCurrentUser(user);
        console.log('User logged in:', user); // Keep this for login events
      } catch (error) {
        console.error('Error parsing user data:', error);
        setCurrentUser(null);
      }
    };

    const handleUserLogout = (e) => {
      setCurrentUser(null);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('userLogout', handleUserLogout);
    
    // Removed setInterval to prevent console spam
    // The event listeners are sufficient for user state management
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, []);

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
    setAnchorElUser(null);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    
    try { 
      // Clear all user data from localStorage
      localStorage.removeItem('user'); 
      localStorage.removeItem('auth_token');
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
    
    // Reset user state
    setCurrentUser(null);
    setAnchorElUser(null);
    setAnchorElNav(null);
    
    // Trigger custom event to update navbar immediately
    window.dispatchEvent(new CustomEvent('userLogout'));
    
    // Show success message
    toast.success(t('logout_success_message'), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        direction: dir,
        textAlign: dir === 'rtl' ? 'right' : 'left',
        fontSize: '14px',
        fontWeight: '500',
        background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
        color: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(79, 70, 229, 0.3)'
      }
    });
    
    // Navigate to home page
    navigate('/', { replace: true });
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <>
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
                  <MenuItem sx={{ 
                    background: 'rgba(79, 70, 229, 0.1)', 
                    mb: 1, 
                    borderRadius: 2,
                    cursor: 'default'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32,
                          background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                          fontSize: 14
                        }}
                      >
                        {(userProfile?.fullName || currentUser?.name || 'U').charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography sx={{ 
                        fontWeight: 600, 
                        color: 'rgba(15,23,42,0.9)',
                        textAlign: dir === 'rtl' ? 'right' : 'left'
                      }}>
                        {userProfile?.fullName || currentUser?.name || 'User'}
                      </Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/profile">
                    <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('nav_profile')}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} component={Link} to="/account">
                    <Typography sx={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{t('nav_account')}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout(); }}>
                    <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
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
                  {t(page.label)}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Badge 
              badgeContent={cartItemCount} 
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '9px',
                  backgroundColor: '#6366f1',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                }
              }}
            >
              <IconButton
                onClick={() => {
                  if (!currentUser) {
                    navigate('/login');
                  } else {
                    navigate('/cart');
                  }
                }}
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
            </Badge>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              startIcon={<TranslateIcon />}
              sx={{ textTransform: 'none', borderRadius: 999, mr: 1 }}
            >
              {t('lang_toggle')}
            </Button>
            <ThemeToggle />
            {currentUser ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ 
                  display: { xs: 'none', md: 'block' }, 
                  mr: 0.5,
                  fontWeight: 600,
                  color: 'rgba(15,23,42,0.9)'
                }}>
                  {userProfile?.fullName || currentUser?.name || 'User'}
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title={t('account')}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar 
                        alt={userProfile?.fullName || currentUser?.name || 'User'} 
                        src={userProfile?.avatarUrl || currentUser?.avatarUrl || ''}
                        sx={{
                          background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
                          fontWeight: 700
                        }}
                      >
                        {(userProfile?.fullName || currentUser?.name || 'U').charAt(0).toUpperCase()}
                      </Avatar>
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
                    <MenuItem onClick={handleLogoutClick}>
                      <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
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

    {/* Logout Confirmation Dialog */}
    <Dialog
      open={logoutDialogOpen}
      onClose={handleLogoutCancel}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(79, 70, 229, 0.15)',
          boxShadow: '0 12px 40px rgba(79, 70, 229, 0.15), 0 4px 12px rgba(0,0,0,0.08)',
          minWidth: { xs: '90vw', sm: '400px' },
          maxWidth: '500px'
        }
      }}
    >
      <DialogTitle 
        id="logout-dialog-title"
        sx={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 900,
          color: 'rgba(15,23,42,0.9)',
          mb: 2,
          background: 'linear-gradient(135deg, #4f46e5 0%, #16a34a 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {t('logout_confirmation_title') || 'تأكيد تسجيل الخروج'}
      </DialogTitle>
      
      <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          mb: 3
        }}>
          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)'
          }}>
            <LogoutIcon sx={{ color: 'white', fontSize: 40 }} />
          </Box>
        </Box>
        
        <DialogContentText 
          id="logout-dialog-description"
          sx={{
            fontSize: 16,
            color: 'rgba(15,23,42,0.7)',
            lineHeight: 1.6,
            mb: 1
          }}
        >
          {t('logout_confirmation_message') || 'هل أنت متأكد من تسجيل الخروج؟'}
        </DialogContentText>
        
        <DialogContentText 
          sx={{
            fontSize: 14,
            color: 'rgba(15,23,42,0.6)',
            lineHeight: 1.5
          }}
        >
          {t('logout_confirmation_subtitle') || 'سيتم حذف جميع بيانات الجلسة الحالية'}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ 
        justifyContent: 'center', 
        gap: 2, 
        p: 3,
        pt: 0
      }}>
        <Button
          onClick={handleLogoutCancel}
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            borderColor: 'rgba(15,23,42,0.2)',
            color: 'rgba(15,23,42,0.8)',
            '&:hover': {
              borderColor: 'rgba(15,23,42,0.4)',
              backgroundColor: 'rgba(15,23,42,0.05)'
            }
          }}
        >
          {t('cancel') || 'إلغاء'}
        </Button>
        
        <Button
          onClick={handleLogoutConfirm}
          variant="contained"
          sx={{
            textTransform: 'none',
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #dc2626 0%, #d97706 100%)',
              boxShadow: '0 12px 32px rgba(239, 68, 68, 0.4)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          {t('logout') || 'تسجيل الخروج'}
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default ResponsiveAppBar;
