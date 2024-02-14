import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Header from '../header';
import { Outlet, useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Avatar, Collapse } from '@mui/material';
import routeNames from '../../../router/routeNames';
import { useState } from 'react';
import brandLogo from '../../../assets/images/TFS-logo.png'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import CollectionsIcon from '@mui/icons-material/Collections';
import InfoIcon from '@mui/icons-material/Info';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';


const drawerWidth = 270;

export const menuOptions = {
  "SUPER USER": [
    { label: 'Manage User', url: routeNames.USERMANAGEMENT, icons: <SupervisorAccountIcon color='inherit' />, subCategory: [{ label: 'Admin', subCatUrl: routeNames.USERMANAGEMENT }, { label: 'Email Subscribed User', subCatUrl: routeNames.SUBSCRIBEDEMAIL }, { label: 'Customer Query', subCatUrl: routeNames.CUSTOMERQUERY }, { label: 'All Students', subCatUrl: routeNames.STUDENTS }, { label: 'Batch Change Requests', subCatUrl: routeNames.STUDENTBATCHCHANGE }, { label: 'Update Profile', subCatUrl: routeNames.UPDATEPROFILE }, { label: 'Renew Pending Students', subCatUrl: routeNames.RENEWPENDINGSTUDENTS }] },
    { label: 'Manage Subscription', url: routeNames.MANAGESUBSCRIPTION, icons: <RequestQuoteIcon color='inherit' />, subCategory: [] },
    { label: 'Blog', url: routeNames.BLOG, icons: <RssFeedIcon color='inherit' />, subCategory: [] },
    { label: 'Gallery', url: routeNames.GALLERY, icons: <CollectionsIcon color='inherit' />, subCategory: [{ label: 'Images', subCatUrl: routeNames.IMAGEGALLERY }, { label: 'Videos', subCatUrl: routeNames.VIDEOGALLERY }] },
    { label: 'About-Us', url: routeNames.ABOUTUS, icons: <InfoIcon color='inherit' />, subCategory: [] },
    // { label: 'Contact-Us', url: routeNames.CONTACTUS, icons: <ContactMailIcon />, subCategory: [] },
    { label: 'Banner', url: routeNames.BANNER, icons: <CollectionsIcon color='inherit' />, subCategory: [] },
  ],
  "RENEWAL LEAD": [
    { label: 'Manage User', url: routeNames.USERMANAGEMENT, icons: <SupervisorAccountIcon color='inherit' />, subCategory: [{ label: 'All Students', subCatUrl: "#" }, { label: 'Renew Pending Students', subCatUrl: "#" }, { label: 'Assigned Students', subCatUrl: "#" }] },
  ],
  "RENEWAL": [
    { label: 'Manage User', url: routeNames.USERMANAGEMENT, icons: <SupervisorAccountIcon color='inherit' />, subCategory: [{ label: 'Renew Pending Students', subCatUrl: "#" }, { label: 'Assigned Students', subCatUrl: "#" }] },
  ],
  "TIC BUDDY": [
    { label: 'Manage User', url: routeNames.USERMANAGEMENT, icons: <SupervisorAccountIcon color='inherit' />, subCategory: [{ label: 'Assigned Students', subCatUrl: "#" }] },
  ],
  "SOCIAL MEDIA MANAGER": [
    { label: 'Gallery', url: routeNames.GALLERY, icons: <CollectionsIcon color='inherit' />, subCategory: [{ label: 'Images', subCatUrl: routeNames.IMAGEGALLERY }, { label: 'Videos', subCatUrl: routeNames.VIDEOGALLERY }] },
    { label: 'Banner', url: routeNames.BANNER, icons: <CollectionsIcon color='inherit' />, subCategory: [] },
  ]
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const BrandLogos = styled('img')({
  width: 'auto',
  height: '53px',
  paddingLeft: '40px',
  cursor: 'pointer'
})

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  background: '#FFFFFF',
  color: '#71829b',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flex: `0 0 ${drawerWidth}px`,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [openPages, setOpenPages] = React.useState(false);
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("userDetails")));
  const [activeIndex, setActiveIndex] = useState();
  const [activeSubIndex, setActiveSubIndex] = useState();



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenMenu = (id) => {
    setActiveIndex(id)
    setOpenPages(prevState => !prevState)
  }


  return (
    <Box sx={{ display: 'flex', flex: 1 }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >

            <MenuIcon />
          </IconButton>

          <Header isOpen={open} />

        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box sx={{ cursor: 'pointer', display: 'flex' }} onClick={() => navigate(routeNames.DASHBOARD)}>
            <BrandLogos src={brandLogo} alt='brand-logo' />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: "#eae8f1", border: '0.5px solid #eae8f1', opacity: 1 }} />
        <List>
          <ListItem sx={{ display: "block" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Avatar
                alt="Remy Sharp"
                src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                sx={{ width: open ? 56 : 40, height: open ? 56 : 40, boxShadow: '0px 5px 5px 0px rgba(44, 44, 44, 0.2)' }}
              />
              {open &&
                <>
                  <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>{userDetails.name}</Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{userDetails.role}</Typography>
                </>
              }

            </Box>
          </ListItem>
        </List>
        <List sx={{
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '1px'
          }
        }}>
          {!userDetails?.passwordChangeRequired
            && menuOptions[userDetails.role].map((page, index) => {
              return (
                page.subCategory.length > 0 ?
                  <ListItem key={index}
                    disablePadding
                    sx={{
                      display: 'block',
                    }} >
                    <ListItemButton
                      onClick={() => handleOpenMenu(index)}
                      sx={{
                        '&.MuiListItemButton-root:hover': {
                          // backgroundColor: activeIndex === index ? 'orange' : "",
                          color: "primary.main",
                          '& .MuiListItemIcon-root': {
                            color: 'primary.main',
                          },
                        },
                        '&.MuiListItemButton-root': {
                          // backgroundColor: activeIndex === index ? 'secondary.dark' : "",
                          color: activeIndex === index ? 'secondary.dark' : "primary.dark",

                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: activeIndex === index ? 'secondary.dark' : "primary.dark",
                        }}
                      >
                        {page.icons}
                      </ListItemIcon>
                      <ListItemText primary={page.label} />
                      {page.subCategory.length > 0 &&
                        (openPages && activeIndex === index ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>

                    <Collapse in={openPages && activeIndex === index} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {page.subCategory.map((item, subIndex) => (
                          <ListItem onClick={() => navigate(item.subCatUrl)} key={subIndex} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                              onClick={() => setActiveSubIndex(subIndex)}
                              sx={{
                                pl: 4,
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                '&.MuiListItemButton-root:hover': {
                                  // backgroundColor: 'orange',
                                  color: "primary.main",
                                  '& .MuiListItemIcon-root': {
                                    color: 'primary.main',
                                  },
                                },
                                '&.MuiListItemButton-root': {
                                  color: activeSubIndex === subIndex ? 'secondary.dark' : "inherit",
                                }
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: open ? 3 : 'auto',
                                  justifyContent: 'center',
                                  color: activeSubIndex === index ? 'primary.dark' : "",
                                }}
                              >
                                {open && <ArrowRightAltIcon sx={{ color: activeSubIndex === subIndex ? 'secondary.dark' : "inherit" }} />}
                              </ListItemIcon>
                              <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </ListItem>
                  :
                  <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={() => navigate(page.url)}>
                    <ListItemButton
                      onClick={() => setActiveIndex(index)}
                      sx={{
                        '&.MuiListItemButton-root:hover': {
                          // backgroundColor: 'orange',
                          color: "primary.main",
                          '& .MuiListItemIcon-root': {
                            color: 'primary.main',
                          },
                        },
                        '&.MuiListItemButton-root': {
                          color: activeIndex === index ? 'secondary.dark' : "primary.dark",
                        }
                      }} >
                      <ListItemIcon
                        sx={{
                          color: activeIndex === index ? 'secondary.dark' : "primary.dark",
                        }}
                      >
                        {page.icons}
                      </ListItemIcon>
                      <ListItemText
                        primary={page.label}
                        sx={{
                          color: activeIndex === index ? 'secondary.dark' : "primary.dark",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
              )
            })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flex: '1 1 100%', p: 3 }}>
        {/* this will be rebdered */}
        <Outlet />
        {/* <DataGridTable /> */}
      </Box>
    </Box >
  );
}

