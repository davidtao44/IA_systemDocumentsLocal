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
  Avatar
} from '@mui/material';
import {
  FolderOpen,
  MessageSquare,
  Monitor,
  Settings,
  User,
  Activity,
  FileText,
  BarChart3,
  Shield
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const drawerWidth = 280;

const menuItems = [
  { text: 'Documentos', icon: <FolderOpen size={20} />, path: '/documents' },
  { text: 'Chat IA', icon: <MessageSquare size={20} />, path: '/chat' },
  { text: 'Infraestructura', icon: <Monitor size={20} />, path: '/infrastructure' },
  { text: 'Logs', icon: <FileText size={20} />, path: '/logs' },
  { text: 'Análisis', icon: <BarChart3 size={20} />, path: '/analytics' },
  { text: 'Administración', icon: <Shield size={20} />, path: '/admin' },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useStore();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <FileText size={20} />
        </Avatar>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Gestion IA System
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Gestión Inteligente
          </Typography>
        </Box>
      </Box>
      
      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
            {user.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.department} - {user.role}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: location.pathname === item.path ? 'medium' : 'normal'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <BarChart3 size={16} />
          <Typography variant="caption" color="text.secondary">
            Estado del Sistema
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption">GPU Usage:</Typography>
          <Typography variant="caption" color="success.main">Normal</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption">AI Models:</Typography>
          <Typography variant="caption" color="success.main">Active</Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;