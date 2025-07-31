import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Chip
} from '@mui/material';
import { Home, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import FileExplorer from '../components/Documents/FileExplorer';
import FilePreview from '../components/Documents/FilePreview';
import UploadZone from '../components/Documents/UploadZone';
import MetadataPanel from '../components/Documents/MetadataPanel';

function DocumentManagement() {
  const { currentDirectory, selectedFiles } = useStore();
  const [selectedFile, setSelectedFile] = useState(null);

  const breadcrumbPaths = currentDirectory.split('/').filter(Boolean);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header with breadcrumbs */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Gestión Documental
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Breadcrumbs separator={<ChevronRight size={16} />}>
            <Link
              underline="hover"
              color="inherit"
              href="#"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Home size={16} />
              Inicio
            </Link>
            {breadcrumbPaths.map((path, index) => (
              <Link
                key={index}
                underline="hover"
                color={index === breadcrumbPaths.length - 1 ? "text.primary" : "inherit"}
                href="#"
              >
                {path}
              </Link>
            ))}
          </Breadcrumbs>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label={`${selectedFiles.length} archivos seleccionados`} size="small" />
            <Chip label="Vista: Dual" size="small" color="primary" />
          </Box>
        </Box>
      </Box>

      {/* Upload Zone */}
      <UploadZone />

      {/* Ejemplo de Div Centrado - Ancho Completo */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        my: 2,
        minHeight: '120px',
        width: '100%', // Ocupa todo el ancho disponible
        border: '2px dashed #1976d2',
        borderRadius: 2,
        backgroundColor: 'rgba(25, 118, 210, 0.05)'
      }}>
        <Box sx={{ 
          textAlign: 'center',
          p: 4,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 2,
          border: '1px solid #e0e0e0',
          maxWidth: '600px', // Ancho máximo para el contenido
          width: '100%', // Pero que use todo el espacio disponible hasta el máximo
          mx: 2 // Margen horizontal para que no toque los bordes
        }}>
          <Typography variant="h5" color="primary" gutterBottom>
            🎯 Div Centrado - Ancho Completo
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Este div ocupa todo el ancho disponible y su contenido está centrado
          </Typography>
          <Typography variant="caption" sx={{ 
            display: 'block', 
            fontFamily: 'monospace',
            backgroundColor: '#f5f5f5',
            p: 1,
            borderRadius: 1
          }}>
            width: 100%; display: flex; justify-content: center; align-items: center;
          </Typography>
        </Box>
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={2} sx={{ flexGrow: 1, mt: 1 }}>
        {/* File Explorer */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Explorador de Archivos
            </Typography>
            <FileExplorer onFileSelect={setSelectedFile} />
          </Paper>
        </Grid>

        {/* File Preview */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Vista Previa
            </Typography>
            <FilePreview file={selectedFile} />
          </Paper>
        </Grid>

        {/* Metadata Panel */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Metadatos
            </Typography>
            <MetadataPanel file={selectedFile} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DocumentManagement;