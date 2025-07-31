import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import {
  TrendingUp,
  Users,
  HardDrive,
  Cpu,
  Clock,
  Activity
} from 'lucide-react';

const departmentUsage = [
  { name: 'Legal', documents: 1250, storage: 45.2, aiQueries: 320, users: 12 },
  { name: 'RH', documents: 890, storage: 32.1, aiQueries: 180, users: 8 },
  { name: 'Finanzas', documents: 1450, storage: 52.8, aiQueries: 420, users: 15 },
  { name: 'IT', documents: 650, storage: 28.5, aiQueries: 150, users: 6 },
  { name: 'Marketing', documents: 780, storage: 35.7, aiQueries: 200, users: 10 }
];

const monthlyTrends = [
  { month: 'Ene', Legal: 280, RH: 150, Finanzas: 380, IT: 120, Marketing: 180 },
  { month: 'Feb', Legal: 320, RH: 180, Finanzas: 420, IT: 150, Marketing: 200 },
  { month: 'Mar', Legal: 350, RH: 200, Finanzas: 450, IT: 180, Marketing: 220 },
  { month: 'Abr', Legal: 380, RH: 220, Finanzas: 480, IT: 200, Marketing: 250 },
  { month: 'May', Legal: 420, RH: 250, Finanzas: 520, IT: 220, Marketing: 280 }
];

const resourceMetrics = [
  { metric: 'CPU Promedio', value: '65%', trend: '+5%', color: 'warning' },
  { metric: 'Memoria RAM', value: '78%', trend: '+12%', color: 'error' },
  { metric: 'Almacenamiento', value: '45%', trend: '+8%', color: 'success' },
  { metric: 'Ancho de Banda', value: '32%', trend: '-3%', color: 'success' }
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

function ResourceAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('documents');

  const getMetricData = () => {
    switch (selectedMetric) {
      case 'documents':
        return departmentUsage.map(dept => ({ name: dept.name, value: dept.documents }));
      case 'storage':
        return departmentUsage.map(dept => ({ name: dept.name, value: dept.storage }));
      case 'aiQueries':
        return departmentUsage.map(dept => ({ name: dept.name, value: dept.aiQueries }));
      case 'users':
        return departmentUsage.map(dept => ({ name: dept.name, value: dept.users }));
      default:
        return departmentUsage.map(dept => ({ name: dept.name, value: dept.documents }));
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'documents': return 'Documentos';
      case 'storage': return 'Almacenamiento (GB)';
      case 'aiQueries': return 'Consultas IA';
      case 'users': return 'Usuarios Activos';
      default: return 'Documentos';
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Análisis de Uso de Recursos
      </Typography>

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Período</InputLabel>
          <Select
            value={selectedPeriod}
            label="Período"
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <MenuItem value="week">Semana</MenuItem>
            <MenuItem value="month">Mes</MenuItem>
            <MenuItem value="quarter">Trimestre</MenuItem>
            <MenuItem value="year">Año</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Métrica</InputLabel>
          <Select
            value={selectedMetric}
            label="Métrica"
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <MenuItem value="documents">Documentos</MenuItem>
            <MenuItem value="storage">Almacenamiento</MenuItem>
            <MenuItem value="aiQueries">Consultas IA</MenuItem>
            <MenuItem value="users">Usuarios</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Resource Metrics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {resourceMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      {metric.metric}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {metric.value}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Chip 
                      label={metric.trend}
                      color={metric.color}
                      size="small"
                      icon={<TrendingUp size={14} />}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Department Usage Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Uso por Departamento - {getMetricLabel()}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getMetricData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Distribution Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Distribución por Departamento
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getMetricData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getMetricData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Monthly Trends */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tendencias Mensuales - Consultas IA
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Legal" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="RH" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="Finanzas" stroke="#ffc658" strokeWidth={2} />
                <Line type="monotone" dataKey="IT" stroke="#ff7300" strokeWidth={2} />
                <Line type="monotone" dataKey="Marketing" stroke="#8dd1e1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Detailed Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Resumen Detallado por Departamento
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Departamento</TableCell>
                    <TableCell align="right">Documentos</TableCell>
                    <TableCell align="right">Almacenamiento (GB)</TableCell>
                    <TableCell align="right">Consultas IA</TableCell>
                    <TableCell align="right">Usuarios Activos</TableCell>
                    <TableCell align="right">Promedio por Usuario</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departmentUsage.map((dept) => (
                    <TableRow key={dept.name} hover>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Users size={16} />
                          {dept.name}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <HardDrive size={14} />
                          {dept.documents.toLocaleString()}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <Cpu size={14} />
                          {dept.storage}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <Activity size={14} />
                          {dept.aiQueries}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <Users size={14} />
                          {dept.users}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                          <Clock size={14} />
                          {Math.round(dept.aiQueries / dept.users)}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResourceAnalysis;