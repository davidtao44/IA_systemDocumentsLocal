import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStore } from './store/useStore';
import Sidebar from './components/Layout/Sidebar.jsx';
import Header from './components/Layout/Header.jsx';
import DocumentManagement from './pages/DocumentManagement.jsx';
import AIChat from './pages/AIChat.jsx';
import InfrastructureDashboard from './pages/InfrastructureDashboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import InteractionLogs from './components/Logs/InteractionLogs.jsx';
import ResourceAnalysis from './components/Analytics/ResourceAnalysis.jsx';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const { darkMode } = useStore();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Header />
              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                <Routes>
                <Route path="/" element={<DocumentManagement />} />
                <Route path="/documents" element={<DocumentManagement />} />
                <Route path="/chat" element={<AIChat />} />
                <Route path="/infrastructure" element={<InfrastructureDashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/logs" element={<InteractionLogs />} />
                <Route path="/analytics" element={<ResourceAnalysis />} />
              </Routes>
              </Box>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
