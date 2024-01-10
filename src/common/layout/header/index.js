import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Divider } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import brandLogo from '../../../assets/images/tfs_logo.jpg'


export default function Header({ isOpen }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [userDetails, setUserDetails] = useState({})

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(userInfo)
  }, [])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.clear()
    handleMenuClose();
    window.location.reload()
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'end',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} >
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <PersonIcon sx={{ color: "#bdbdbd" }} />
          <Typography >{userDetails.name}</Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <EmailIcon sx={{ color: "#bdbdbd" }} />
          <Typography >{userDetails.emailId}</Typography>
        </Box>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <Box sx={{ display: 'flex', gap: '6px' }}>
          <LogoutIcon sx={{ color: "#bdbdbd" }} />
          <Typography >Logout</Typography>
        </Box>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex", alignItems: 'center', flexGrow: 1 }}>
      {/* <Toolbar> */}
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
      >
        {!isOpen && < BrandLogo src={brandLogo} alt='brand-logo' />}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          {
            userDetails.profileImg ?
              <Avatar
                alt="Remy Sharp"
                src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                sx={{ width: 35, height: 35, boxShadow: '0px 5px 5px 0px rgba(44, 44, 44, 0.2)' }}
              />
              :
              <InitialImg>
                <Typography>VS</Typography>
              </InitialImg>
          }
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {/* </Toolbar> */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

const InitialImg = styled(Box)({
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: "center",
  border: '2px solid lightgrey',
  boxShadow: '0px 5px 5px 0px rgba(44, 44, 44, 0.2)'
})
const BrandLogo = styled('img')({
  width: 'auto',
  height: '40px'
})