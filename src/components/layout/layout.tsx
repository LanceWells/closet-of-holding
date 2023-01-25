import {
  AppBar,
  Avatar,
  Box,
  Button,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  PaletteMode,
  ThemeProvider,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import React, {
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BuildIcon from '@mui/icons-material/Build';
import MenuIcon from '@mui/icons-material/Menu';
import {
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

/**
 * Props for the {@link Layout} component.
 */
export type LayoutProps = unknown;

/**
 * The width of the drawer component.
 */
const drawerWidth = 240;

/**
 * The layout element that wraps the entire application. This style is provided to every view, and
 * relays components such as the app bar and the menu drawer.
 * @param props See {@link LayoutProps}.
 * @returns The component.
 */
export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const {
    children,
  } = props;

  const router = useRouter();
  const routeName = useMemo(() => {
    return router.route
      .replaceAll('/', ' ')
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
  }, [router.route]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const drawer = useMemo(() => <DrawerNav />, []);
  const onClickMenu = useMemo(() => () => { setMenuOpen(true); }, []);
  const onCloseMenu = useMemo(() => () => { setMenuOpen(false); }, []);

  const onRequestLogout = useMemo(() => () => { setLogoutModalOpen(true); }, []);
  const onCancelLogout = useMemo(() => () => { setLogoutModalOpen(false); }, []);
  const onLogout = useMemo(() => () => {
    setLogoutModalOpen(false);
    signOut();
  }, []);

  const [mode, setMode] = useState<PaletteMode>('dark');
  const toggleMode = () => setMode(mode === 'dark' ? 'light' : 'dark');
  
  const contrastThemeColor = mode === 'dark' ? '#ADB4F4' : '#3B3F89';
  const contrastColor = mode === 'dark' ? '#FFFFFF' : '#0A0A0A';

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: contrastThemeColor,
      },
      secondary: {
        main: '#1A2461',
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'contained',
        }
      },
      MuiTabs: {
        styleOverrides: {
          scrollButtons: {
            color: contrastColor,
          },
        },
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <LogoutModal
          onLogout={onLogout}
          onCancel={onCancelLogout}
          open={logoutModalOpen} />
        <AppBar
          position="static"
          sx={{
            width: {
              sm: `calc(100% - ${drawerWidth}px)`,
            },
            marginLeft: {
              sm: `${drawerWidth}px`,
            },
          }}>
          <Toolbar>
            <IconButton
              sx={{
                display: {
                  sm: 'none',
                  xs: 'inline-block',
                }
              }}
              onClick={onClickMenu}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
              }}>
              {routeName}
            </Typography>
            <IconButton sx={{ color: 'white' }} onClick={toggleMode}>
              { mode === 'dark' ?
                (<DarkModeIcon />) :
                (<LightModeIcon />)
              }
            </IconButton>
            <ProfileButton
              onLogout={onRequestLogout} />
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant='permanent'
            anchor='left'
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
              flexShrink: 0,
              width: drawerWidth,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}>
            {drawer}
          </Drawer>
          <Drawer
            sx={{
              width: drawerWidth,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            open={menuOpen}
            onClose={onCloseMenu}
            variant="temporary">
            {drawer}
          </Drawer>
        </Box>
        <Box
          sx={{
            marginLeft: {
              sm: `${drawerWidth}px`,
            },
            flexGrow: 1,
            backgroundColor: mode === 'dark' ? '#3f3f3f' : 'white',
          }}
          component="main">
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

/**
 * A container for the contents of the menu.
 * @returns The component.
 */
function DrawerNav() {
  const router = useRouter();
  const theme = useTheme();
  
  const onNavCharacter = useMemo(() => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/character');
  }, [router]);

  const onNavManager = useMemo(() => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/character/manager');
  }, [router]);

  return (
    <Box>
      <Toolbar>
        <Box sx={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          paddingBottom: '3px',
          marginRight: '8px',
          backgroundColor: theme.palette.mode === 'dark' ? '#3f3f3f' : '#afafaf',
        }}>
          <Image
            width="32"
            height="32"
            alt="website-icon"
            src="/WoodenStaticChest.png" />
        </Box>
        <Typography variant="h6">
          Loot Loadout
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={onNavCharacter}>
            <ListItemIcon>
              <CheckroomIcon />
            </ListItemIcon>
            <ListItemText primary="Character" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={onNavManager}>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Manager" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

/**
 * The props for the {@link LogoutModal} component.
 */
type LogoutModalProps = {
  /**
   * If true, the modal is open.
   */
  open: boolean,

  /**
   * The callback for when the user logs out.
   */
  onLogout: React.MouseEventHandler<HTMLButtonElement>,

  /**
   * The callback for when the user cancels the logout.
   */
  onCancel: React.MouseEventHandler<HTMLButtonElement>,
};

/**
 * A modal used to validate if the user wants to log out.
 * @param props See {@link LogoutModalProps}.
 * @returns The component.
 */
function LogoutModal(props: LogoutModalProps) {
  const {
    open,
    onLogout,
    onCancel,
  } = props;

  return (
    <Dialog
      onClose={onCancel}
      open={open}>
      <DialogTitle>
        Logout
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          color='primary'>
          Cancel
        </Button>
        <Button
          onClick={onLogout}
          color='error'>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * The props for the {@link ProfileButton} component.
 */
type ProfileButtonProps = {
  /**
   * The callback for when the user logs out.
   */
  onLogout: () => void,
};

/**
 * A button used to log the user in and out, depending on their session status.
 * @param props See {@link ProfileButtonProps}.
 * @returns The component.
 */
function ProfileButton(props: ProfileButtonProps) {
  const {
    onLogout,
  } = props;

  const session = useSession();

  const showAuth = session.status === 'authenticated';
  const onClick = showAuth ? () => onLogout() : () => signIn('discord');
  const icon = showAuth ?
    (<Avatar
      alt={session.data.user?.name || 'user'}
      src={session.data.user?.image || ''}
    />) : (<AccountCircleIcon />);

  return (
    <IconButton onClick={onClick}>
      {icon}
    </IconButton>
  );
}
