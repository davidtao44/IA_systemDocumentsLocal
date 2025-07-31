import React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const detailedMetrics = [
  { time: '00:00', cpu: 45, memory: 62, disk: 78, network: 23 },
  { time: '04:00', cpu: 52, memory: 68, disk: 82, network: 31 },
  { time: '08:00', cpu: 78, memory: 85, disk: 88, network: 67 },
  { time: '12:00', cpu: 65, memory: 72, disk: 85, network: 45 },
  { time: '16:00', cpu: 72, memory: 78, disk: 90, network: 52 },
  { time: '20:00', cpu: 58, memory: 65, disk: 85, network: 38 },
];

const modelPerformance = [
  { model: 'GPT-4', requests: 1250, avgTime: 2.3, success: 98.5 },
  { model: 'Claude-3', requests: 890, avgTime: 1.8, success: 99.1 },
  { model: 'Llama-2', requests: 650, avgTime: 1.2, success: 97.8 },
  { model: 'BERT', requests: 2100, avgTime: 0.8, success: 99.5 },
];

const systemLogs = [
  { time: '14:23:15', level: 'INFO', message: 'GPU memory optimization completed', component: 'GPU Manager' },
  { time: '14:22:48', level: 'WARNING', message: 'High temperature detected on RTX 6000', component: 'Thermal Monitor' },
  { time: '14:21:32', level: 'INFO', message: 'Model inference completed successfully', component: 'AI Engine' },
  { time: '14:20:15', level: 'ERROR', message: 'Network timeout on document processing', component: 'Document Service' },
  { time: '14:19:45', level: 'INFO', message: 'Backup process initiated', component: 'Backup Service' },
];

function SystemMetrics() {
  const getLogColor = (level) => {
    switch (level) {
      case 'ERROR': return 'error';
      case 'WARNING': return 'warning';
      case 'INFO': return 'info';
      default: return 'default';
    }
  };

  return (
    <Grid container spacing={2}>
      {/* System Resources Chart */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Recursos del Sistema (24h)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={detailedMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memoria %" />
              <Line type="monotone" dataKey="disk" stroke="#ffc658" name="Disco %" />
              <Line type="monotone" dataKey="network" stroke="#ff7300" name="Red %" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Model Performance */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Rendimiento de Modelos
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requests" fill="#8884d8" name="Requests/h" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Model Performance Table */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Estadísticas de Modelos IA
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Modelo</TableCell>
                  <TableCell align="right">Requests/h</TableCell>
                  <TableCell align="right">Tiempo Avg</TableCell>
                  <TableCell align="right">Éxito %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modelPerformance.map((model) => (
                  <TableRow key={model.model}>
                    <TableCell component="th" scope="row">
                      {model.model}
                    </TableCell>
                    <TableCell align="right">{model.requests}</TableCell>
                    <TableCell align="right">{model.avgTime}s</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={model.success}
                          sx={{ flexGrow: 1, height: 6 }}
                          color={model.success > 98 ? 'success' : 'warning'}
                        />
                        <Typography variant="caption">
                          {model.success}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* System Logs */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Logs del Sistema
          </Typography>
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {systemLogs.map((log, index) => (
              <Box
                key={index}
                sx={{
                  p: 1,
                  mb: 1,
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: 1,
                  bgcolor: log.level === 'ERROR' ? 'error.light' : 
                          log.level === 'WARNING' ? 'warning.light' : 'transparent'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                    {log.time}
                  </Typography>
                  <Chip 
                    label={log.level} 
                    size="small" 
                    color={getLogColor(log.level)}
                    sx={{ minWidth: 70 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {log.component}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {log.message}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* Resource Usage Summary */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Resumen de Recursos Actuales
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  72%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  CPU Promedio
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={72} 
                  sx={{ mt: 1, height: 8 }}
                  color="primary"
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main">
                  68%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Memoria RAM
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={68} 
                  sx={{ mt: 1, height: 8 }}
                  color="success"
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main">
                  85%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Almacenamiento
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  sx={{ mt: 1, height: 8 }}
                  color="warning"
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info.main">
                  45%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Red I/O
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={45} 
                  sx={{ mt: 1, height: 8 }}
                  color="info"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SystemMetrics;