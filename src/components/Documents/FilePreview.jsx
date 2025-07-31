import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider
} from '@mui/material';
import {
  FileText,
  Image,
  Download,
  Eye,
  Share2
} from 'lucide-react';

function FilePreview({ file }) {
  if (!file) {
    return (
      <Box 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'text.secondary'
        }}
      >
        <FileText size={64} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Selecciona un archivo
        </Typography>
        <Typography variant="body2">
          para ver su vista previa
        </Typography>
      </Box>
    );
  }

  const getPreviewContent = () => {
    const extension = file.name.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return (
          <Box sx={{ height: '400px', border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 20 }}>
              Vista previa de PDF
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
              {file.name}
            </Typography>
          </Box>
        );
      
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <Box sx={{ height: '400px', border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden' }}>
            <Box
              sx={{
                height: '100%',
                backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image size={64} color="#666" />
            </Box>
          </Box>
        );
      
      default:
        return (
          <Box sx={{ height: '400px', border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 20 }}>
              Vista previa no disponible
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
              {file.name}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* File Info Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {file.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={file.size} size="small" />
          <Chip label={file.modified} size="small" color="primary" />
          <Chip label={file.name.split('.').pop().toUpperCase()} size="small" color="secondary" />
        </Box>
      </Box>

      {/* Preview Content */}
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        {getPreviewContent()}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<Eye size={16} />}
          size="small"
        >
          Abrir
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download size={16} />}
          size="small"
        >
          Descargar
        </Button>
        <Button
          variant="outlined"
          startIcon={<Share2 size={16} />}
          size="small"
        >
          Compartir
        </Button>
      </Box>

      {/* Version History */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Historial de Versiones
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Paper sx={{ p: 1, bgcolor: 'action.hover' }}>
            <Typography variant="caption">
              v1.2 - {file.modified} - Usuario actual
            </Typography>
          </Paper>
          <Paper sx={{ p: 1 }}>
            <Typography variant="caption" color="text.secondary">
              v1.1 - 2024-01-10 - Juan Pérez
            </Typography>
          </Paper>
          <Paper sx={{ p: 1 }}>
            <Typography variant="caption" color="text.secondary">
              v1.0 - 2024-01-05 - María García
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default FilePreview;