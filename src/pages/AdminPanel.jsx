import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Users,
  Shield,
  Settings,
  Database,
  Bell,
  Activity,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@empresa.com', role: 'Admin', department: 'IT', active: true },
  { id: 2, name: 'María García', email: 'maria@empresa.com', role: 'Editor', department: 'Legal', active: true },
  { id: 3, name: 'Carlos López', email: 'carlos@empresa.com', role: 'Viewer', department: 'RH', active: false },
  { id: 4, name: 'Ana Martínez', email: 'ana@empresa.com', role: 'Editor', department: 'Finanzas', active: true },
];

const permissions = [
  { id: 1, name: 'Lectura de documentos', description: 'Permite ver y descargar documentos' },
  { id: 2, name: 'Escritura de documentos', description: 'Permite subir y editar documentos' },
  { id: 3, name: 'Eliminación de documentos', description: 'Permite eliminar documentos' },
  { id: 4, name: 'Gestión de usuarios', description: 'Permite administrar usuarios y permisos' },
  { id: 5, name: 'Configuración del sistema', description: 'Permite modificar configuraciones' },
];

const aiModels = [
  { id: 1, name: 'GPT-4', status: 'active', usage: 75, department: 'Legal' },
  { id: 2, name: 'Claude-3', status: 'active', usage: 45, department: 'RH' },
  { id: 3, name: 'Llama-2', status: 'maintenance', usage: 0, department: 'Finanzas' },
  { id: 4, name: 'BERT', status: 'active', usage: 90, department: 'General' },
];

function AdminPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'error';
      case 'Editor': return 'warning';
      case 'Viewer': return 'info';
      default: return 'default';
    }
  };

  const getModelStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'maintenance': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Panel de Administración
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        Acceso de administrador detectado. Todas las acciones quedan registradas en el log de auditoría.
      </Alert>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab icon={<Users size={20} />} label="Usuarios" />
          <Tab icon={<Shield size={20} />} label="Permisos" />
          <Tab icon={<Database size={20} />} label="Modelos IA" />
          <Tab icon={<Settings size={20} />} label="Configuración" />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {/* Users Tab */}
        {activeTab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Gestión de Usuarios
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Plus size={16} />}
                    onClick={() => handleEditUser(null)}
                  >
                    Nuevo Usuario
                  </Button>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Departamento</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Chip 
                              label={user.role} 
                              color={getRoleColor(user.role)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Chip 
                              label={user.active ? 'Activo' : 'Inactivo'}
                              color={user.active ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              startIcon={<Edit size={14} />}
                              onClick={() => handleEditUser(user)}
                            >
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Permissions Tab */}
        {activeTab === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Sistema de Permisos usuarios
                </Typography>
                
                <Grid container spacing={2}>
                  {permissions.map((permission) => (
                    <Grid item xs={12} md={6} key={permission.id}>
                      <Paper sx={{ p: 2, border: '1px solid rgba(0,0,0,0.1)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {permission.name}
                          </Typography>
                          <Switch defaultChecked />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {permission.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* AI Models Tab */}
        {activeTab === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Administración de Modelos IA
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Modelo</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Uso Actual</TableCell>
                        <TableCell>Departamento</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {aiModels.map((model) => (
                        <TableRow key={model.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Activity size={16} />
                              {model.name}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={model.status}
                              color={getModelStatusColor(model.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ width: 100 }}>
                                <Box
                                  sx={{
                                    height: 6,
                                    bgcolor: 'grey.300',
                                    borderRadius: 3,
                                    overflow: 'hidden'
                                  }}
                                >
                                  <Box
                                    sx={{
                                      height: '100%',
                                      bgcolor: model.usage > 80 ? 'error.main' : 
                                              model.usage > 60 ? 'warning.main' : 'success.main',
                                      width: `${model.usage}%`,
                                      transition: 'width 0.3s'
                                    }}
                                  />
                                </Box>
                              </Box>
                              <Typography variant="caption">
                                {model.usage}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{model.department}</TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined">
                              Configurar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Configuration Tab */}
        {activeTab === 3 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Configuración General
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Notificaciones por email"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Backup automático"
                  />
                  <FormControlLabel
                    control={<Switch />}
                    label="Modo de mantenimiento"
                  />
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Logs detallados"
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Alertas del Sistema
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Umbral de temperatura GPU (°C)"
                    type="number"
                    defaultValue={75}
                    size="small"
                  />
                  <TextField
                    label="Umbral de memoria GPU (%)"
                    type="number"
                    defaultValue={85}
                    size="small"
                  />
                  <TextField
                    label="Tiempo máximo de respuesta (s)"
                    type="number"
                    defaultValue={5}
                    size="small"
                  />
                  <TextField
                    label="Email de alertas"
                    type="email"
                    defaultValue="admin@empresa.com"
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>

      {/* User Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Nombre completo"
              defaultValue={selectedUser?.name || ''}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              defaultValue={selectedUser?.email || ''}
              fullWidth
            />
            <TextField
              label="Departamento"
              defaultValue={selectedUser?.department || ''}
              fullWidth
            />
            <FormControlLabel
              control={<Switch defaultChecked={selectedUser?.active ?? true} />}
              label="Usuario activo"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminPanel;