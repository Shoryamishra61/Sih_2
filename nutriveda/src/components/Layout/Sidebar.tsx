import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Collapse
} from '@mui/material';
import {
  Dashboard,
  People,
  Restaurant,
  Assessment,
  Settings,
  ExpandLess,
  ExpandMore,
  Psychology,
  Timeline,
  MenuBook,
  HealthAndSafety
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [aiMenuOpen, setAiMenuOpen] = React.useState(false);

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/',
      exact: true
    },
    {
      text: 'Patients',
      icon: <People />,
      path: '/patients'
    },
    {
      text: 'Food Database',
      icon: <Restaurant />,
      path: '/food-database'
    },
    {
      text: 'Recipe Manager',
      icon: <MenuBook />,
      path: '/recipes'
    },
    {
      text: 'Patient Assessment',
      icon: <HealthAndSafety />,
      path: '/assessment'
    },
    {
      text: 'AI Diet Engine',
      icon: <Psychology />,
      path: '/ai-diet-engine',
      hasSubmenu: true,
      submenu: [
        { text: 'Generate Diet Plan', path: '/ai-diet-engine/generate' },
        { text: 'Prescription Upload', path: '/ai-diet-engine/upload' },
        { text: 'Dual Analysis', path: '/ai-diet-engine/analysis' }
      ]
    },
    {
      text: 'Reports & Analytics',
      icon: <Assessment />,
      path: '/reports'
    },
    {
      text: 'Export Tools',
      icon: <Timeline />,
      path: '/export'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const drawerWidth = 280;

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider'
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          NutriVeda
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ayurvedic Nutrition Platform
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.hasSubmenu) {
                    setAiMenuOpen(!aiMenuOpen);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
                selected={isActive(item.path, item.exact)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {item.hasSubmenu && (aiMenuOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            
            {item.hasSubmenu && (
              <Collapse in={aiMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu?.map((subItem) => (
                    <ListItem key={subItem.text} disablePadding>
                      <ListItemButton
                        onClick={() => handleNavigation(subItem.path)}
                        selected={isActive(subItem.path)}
                        sx={{
                          pl: 4,
                          '&.Mui-selected': {
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                            '&:hover': {
                              backgroundColor: 'primary.main',
                            },
                          },
                        }}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      
      <Divider sx={{ mt: 'auto' }} />
      
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation('/settings')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
