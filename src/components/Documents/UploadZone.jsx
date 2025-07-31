import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  LinearProgress,
  Chip,
  Alert
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function UploadZone() {
  const [uploadingFiles, setUploadingFiles] = React.useState([]);
  const [uploadProgress, setUploadProgress] = React.useState({});

  const onDrop = React.useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      status: 'uploading'
    }));

    setUploadingFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(fileObj => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadingFiles(prev => 
            prev.map(f => f.id === fileObj.id ? { ...f, status: 'completed' } : f)
          );
          setTimeout(() => {
            setUploadingFiles(prev => prev.filter(f => f.id !== fileObj.id));
          }, 2000);
        }
        setUploadProgress(prev => ({ ...prev, [fileObj.id]: progress }));
      }, 200);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  const removeFile = (fileId) => {
    setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  return (
    <Box>
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        <input {...getInputProps()} />
        <Box sx={{ textAlign: 'center' }}>
          <Upload size={48} color={isDragActive ? '#1976d2' : '#666'} />
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {isDragActive ? 'Suelta los archivos aquí' : 'Arrastra archivos o haz clic para seleccionar'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Soporta PDF, imágenes, documentos de Office
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }}>
            Seleccionar Archivos
          </Button>
        </Box>
      </Paper>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadingFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Subiendo archivos ({uploadingFiles.length})
              </Typography>
              {uploadingFiles.map((fileObj) => (
                <motion.div
                  key={fileObj.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Paper sx={{ p: 2, mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <File size={20} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2">{fileObj.name}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip 
                              label={fileObj.size} 
                              size="small" 
                              variant="outlined" 
                            />
                            {fileObj.status === 'completed' ? (
                              <Chip label="Completado" size="small" color="success" />
                            ) : (
                              <Chip label={`${Math.round(uploadProgress[fileObj.id] || 0)}%`} size="small" color="primary" />
                            )}
                            <Button
                              size="small"
                              onClick={() => removeFile(fileObj.id)}
                              sx={{ minWidth: 'auto', p: 0.5 }}
                              variant="text"
                            >
                              <X size={16} />
                            </Button>
                          </Box>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={uploadProgress[fileObj.id] || 0}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default UploadZone;