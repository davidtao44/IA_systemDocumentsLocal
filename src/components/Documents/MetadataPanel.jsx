import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Divider,
  Paper,
  IconButton
} from '@mui/material';
import {
  Tag,
  Calendar,
  Building,
  Save,
  Edit,
  Plus,
  X
} from 'lucide-react';

const documentTypes = [
  'Contrato',
  'Factura',
  'Reporte',
  'Política',
  'Manual',
  'Expediente',
  'Presupuesto',
  'Otro'
];

const departments = [
  'Legal',
  'Recursos Humanos',
  'Finanzas',
  'IT',
  'Ventas',
  'Marketing',
  'Operaciones'
];

function MetadataPanel({ file }) {
  const [editing, setEditing] = useState(false);
  const [metadata, setMetadata] = useState({
    type: 'Contrato',
    department: 'Legal',
    tags: ['importante', 'vigente'],
    description: '',
    createdDate: '2024-01-15',
    expiryDate: '2025-01-15'
  });
  const [newTag, setNewTag] = useState('');

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
        <Tag size={48} />
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Selecciona un archivo para ver y editar sus metadatos
        </Typography>
      </Box>
    );
  }

  const handleSave = () => {
    setEditing(false);
    // Aquí se guardarían los metadatos
  };

  const addTag = () => {
    if (newTag.trim() && !metadata.tags.includes(newTag.trim())) {
      setMetadata({
        ...metadata,
        tags: [...metadata.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setMetadata({
      ...metadata,
      tags: metadata.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Metadatos
        </Typography>
        <IconButton
          onClick={() => editing ? handleSave() : setEditing(true)}
          color="primary"
          size="small"
        >
          {editing ? <Save size={18} /> : <Edit size={18} />}
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {/* Document Type */}
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Tipo de Documento</InputLabel>
            <Select
              value={metadata.type}
              label="Tipo de Documento"
              disabled={!editing}
              onChange={(e) => setMetadata({ ...metadata, type: e.target.value })}
            >
              {documentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Department */}
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Área Asociada</InputLabel>
            <Select
              value={metadata.department}
              label="Área Asociada"
              disabled={!editing}
              onChange={(e) => setMetadata({ ...metadata, department: e.target.value })}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Tags */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Etiquetas
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {metadata.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={editing ? () => removeTag(tag) : undefined}
                deleteIcon={<X size={14} />}
              />
            ))}
          </Box>
          {editing && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Nueva etiqueta"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <IconButton size="small" onClick={addTag}>
                <Plus size={16} />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Description */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Descripción"
            multiline
            rows={3}
            size="small"
            disabled={!editing}
            value={metadata.description}
            onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
          />
        </Box>

        {/* Dates */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Fecha de Creación"
            type="date"
            size="small"
            disabled={!editing}
            value={metadata.createdDate}
            onChange={(e) => setMetadata({ ...metadata, createdDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Fecha de Vencimiento"
            type="date"
            size="small"
            disabled={!editing}
            value={metadata.expiryDate}
            onChange={(e) => setMetadata({ ...metadata, expiryDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* File Properties */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Propiedades del Archivo
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption">Tamaño:</Typography>
              <Typography variant="caption">{file.size}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption">Modificado:</Typography>
              <Typography variant="caption">{file.modified}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption">Tipo:</Typography>
              <Typography variant="caption">{file.name.split('.').pop().toUpperCase()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">Permisos:</Typography>
              <Typography variant="caption">Lectura/Escritura</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {editing && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleSave}
            startIcon={<Save size={16} />}
          >
            Guardar
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setEditing(false)}
          >
            Cancelar
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default MetadataPanel;