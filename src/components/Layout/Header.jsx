import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Chip,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Bell,
  Search,
  Moon,
  Sun,
  Wifi,
  Activity
} from 'lucide-react';
import { useStore } from '../../store/useStore';

function Header() {
  const { darkMode, toggleDarkMode, systemMetrics } = useStore();

  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
            Sistema de Gestión Documental IA
          </Typography>
          <Chip 
            icon={<Activity size={16} />}
            label={`${systemMetrics.jobQueue} trabajos en cola`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Wifi size={16} color="#4caf50" />
            <Typography variant="caption" color="success.main">
              Conectado
            </Typography>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                icon={<Sun size={16} />}
                checkedIcon={<Moon size={16} />}
              />
            }
            label=""
            sx={{ m: 0 }}
          />

          <IconButton color="inherit">
            <Search size={20} />
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <Bell size={20} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;