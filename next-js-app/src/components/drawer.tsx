'use client';

import { ReactNode, useState, useCallback } from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  CSSObject,
  styled,
  Theme,
  ClickAwayListener,
  Link,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header, { HeaderHeight } from './header';

export const drawerWidth = 300;

export type AppRoute = "/"
  | "/explore";

type NavbarDisplay = {
  title: string,
  route: AppRoute,
  icon: ReactNode,
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: 0,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  minHeight: HeaderHeight,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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

const NavBar = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

const menuItems: NavbarDisplay[] = [
  { title: 'Home', route: '/', icon: <HomeIcon /> },
  { title: 'Explore', route: '/explore', icon: <SendIcon /> },
];

export default function AppDrawer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isOpen, setIsOpen] = useState(true);

  const handleDrawerOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const closeIfMediumScreensize = useCallback(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <AppBar position="fixed" open={isOpen}>
        <Toolbar sx={{ minHeight: HeaderHeight, height: HeaderHeight }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      <NavBar variant="permanent" open={isOpen}>
        {isMobile && isOpen ? (
          <ClickAwayListener onClickAway={closeIfMediumScreensize}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <DrawerHeader>
                <IconButton aria-label="toggle drawer" onClick={handleDrawerClose}>
                  {!isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <List sx={{ width: '100%' }}>
                  {menuItems.map(display => (
                    <ListItem key={display.route} disablePadding>
                      <Link href={display.route} underline="none" color="inherit" sx={{ width: '100%' }}>
                        <ListItemButton aria-label={`navigate to ${display.route}`} onClick={closeIfMediumScreensize}>
                          <ListItemIcon>{display.icon}</ListItemIcon>
                          <ListItemText primary={
                            <Typography variant='body1'>
                              {display.title}
                            </Typography>} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </ClickAwayListener>
        ) : (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <DrawerHeader>
              <IconButton aria-label="toggle drawer" onClick={handleDrawerClose}>
                {!isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
              <List sx={{ width: '100%' }}>
                {menuItems.map(display => (
                  <ListItem key={display.route} disablePadding>
                    <Link href={display.route} underline="none" color="inherit" sx={{ width: '100%' }}>
                      <ListItemButton aria-label={`navigate to ${display.route}`} onClick={closeIfMediumScreensize}>
                        <ListItemIcon>{display.icon}</ListItemIcon>
                        <ListItemText primary={
                          <Typography variant='body1'>
                            {display.title}
                          </Typography>} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </NavBar>
    </>
  );
}