import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import {
  Search,
  Download,
  Eye,
  FileText,
  User,
  Clock,
  Filter
} from 'lucide-react';

const interactionLogs = [
  {
    id: 1,
    timestamp: '2024-01-15 14:30:25',
    user: 'Juan Pérez',
    action: 'Descarga',
    document: 'Contrato_Proveedor_ABC.pdf',
    department: 'Legal',
    ip: '192.168.1.100',
    status: 'success'
  },
  {
    id: 2,
    timestamp: '2024-01-15 14:28:15',
    user: 'María García',
    action: 'Visualización',
    document: 'Informe_Q4_2023.xlsx',
    department: 'Finanzas',
    ip: '192.168.1.105',
    status: 'success'
  },
  {
    id: 3,
    timestamp: '2024-01-15 14:25:10',
    user: 'Carlos López',
    action: 'Edición',
    document: 'Política_RH_2024.docx',
    department: 'RH',
    ip: '192.168.1.110',
    status: 'failed'
  },
  {
    id: 4,
    timestamp: '2024-01-15 14:20:05',
    user: 'Ana Martínez',
    action: 'Subida',
    document: 'Presupuesto_2024.pdf',
    department: 'Finanzas',
    ip: '192.168.1.108',
    status: 'success'
  },
  {
    id: 5,
    timestamp: '2024-01-15 14:15:30',
    user: 'Juan Pérez',
    action: 'Eliminación',
    document: 'Documento_Temporal.txt',
    department: 'IT',
    ip: '192.168.1.100',
    status: 'success'
  }
];

const aiInteractions = [
  {
    id: 1,
    timestamp: '2024-01-15 14:32:10',
    user: 'María García',
    query: 'Busca contratos con fecha de vencimiento en Q1 2024',
    model: 'GPT-4',
    department: 'Legal',
    responseTime: '2.3s',
    documentsFound: 12
  },
  {
    id: 2,
    timestamp: '2024-01-15 14:29:45',
    user: 'Carlos López',
    query: 'Organiza documentos de RH por antigüedad',
    model: 'Claude-3',
    department: 'RH',
    responseTime: '1.8s',
    documentsFound: 45
  },
  {
    id: 3,
    timestamp: '2024-01-15 14:26:20',
    user: 'Ana Martínez',
    query: 'Extrae datos financieros del último trimestre',
    model: 'GPT-4',
    department: 'Finanzas',
    responseTime: '3.1s',
    documentsFound: 8
  }
];

function InteractionLogs() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const getActionIcon = (action) => {
    switch (action) {
      case 'Descarga': return <Download size={16} />;
      case 'Visualización': return <Eye size={16} />;
      case 'Edición': return <FileText size={16} />;
      case 'Subida': return <FileText size={16} />;
      case 'Eliminación': return <FileText size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getStatusColor = (status) => {
    return status === 'success' ? 'success' : 'error';
  };

  const filteredDocumentLogs = interactionLogs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAILogs = aiInteractions.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Logs de Interacciones
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        Registro completo de todas las interacciones con documentos y consultas de IA.
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab icon={<FileText size={20} />} label="Documentos" />
            <Tab icon={<User size={20} />} label="IA Chat" />
          </Tabs>
        </Box>

        <TextField
          placeholder="Buscar en logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Paper sx={{ flexGrow: 1, overflow: 'hidden' }}>
        {/* Document Logs Tab */}
        {activeTab === 0 && (
          <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Acción</TableCell>
                  <TableCell>Documento</TableCell>
                  <TableCell>Departamento</TableCell>
                  <TableCell>IP</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDocumentLogs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Clock size={14} />
                        {log.timestamp}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <User size={14} />
                        {log.user}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getActionIcon(log.action)}
                        {log.action}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {log.document}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={log.department} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {log.ip}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={log.status}
                        color={getStatusColor(log.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* AI Interactions Tab */}
        {activeTab === 1 && (
          <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Consulta</TableCell>
                  <TableCell>Modelo</TableCell>
                  <TableCell>Departamento</TableCell>
                  <TableCell>Tiempo</TableCell>
                  <TableCell>Resultados</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAILogs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Clock size={14} />
                        {log.timestamp}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <User size={14} />
                        {log.user}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography variant="body2" noWrap>
                        {log.query}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={log.model} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip label={log.department} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {log.responseTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {log.documentsFound} docs
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Mostrando {activeTab === 0 ? filteredDocumentLogs.length : filteredAILogs.length} registros
        </Typography>
        <Button variant="outlined" startIcon={<Download size={16} />}>
          Exportar Logs
        </Button>
      </Box>
    </Box>
  );
}

export default InteractionLogs;