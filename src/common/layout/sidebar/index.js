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
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Avatar, Collapse } from '@mui/material';


const drawerWidth = 240;

const PagesItem = [
  { label: 'Profile', url: '/profile' },
  { label: 'Edit-Profile', url: '/edit-profile' },
  { label: 'Blog', url: '/blog' },
  { label: 'About-Us', url: '/aboutus' },
  { label: 'Settings', url: '/setting' },
]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
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
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
    flexShrink: 0,
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
  const [openPages, setOpenPages] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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

          {/* header */}
          <Header />

        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
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
                  <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Peter cruiser</Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>Premium Member</Typography>
                </>
              }

            </Box>
          </ListItem>
        </List>
        <List>
          {['Pages'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton sx={{
                '&.MuiListItemButton-root:hover': {
                  // backgroundColor: 'orange',
                  color: "primary.main",
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }} onClick={() => setOpenPages(prevState => !prevState)}>
                <ListItemIcon>
                  <AutoStoriesIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
                {openPages ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openPages} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {PagesItem.map((item, index) => (
                    <ListItem onClick={() => navigate(item.url)} key={index} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
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
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {open && <KeyboardArrowRightIcon />}
                        </ListItemIcon>
                        <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* this will be rebdered */}
        <Outlet />
        {/* <DataGridTable /> */}
      </Box>
    </Box >
  );
}