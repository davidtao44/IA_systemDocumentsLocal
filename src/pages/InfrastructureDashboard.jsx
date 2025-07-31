import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  Server,
  Cpu,
  Thermometer,
  Activity,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useStore } from '../store/useStore';
import RackVisualization from '../components/Infrastructure/RackVisualization';
import GPUMonitor from '../components/Infrastructure/GPUMonitor';
import SystemMetrics from '../components/Infrastructure/SystemMetrics';

function InfrastructureDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const { gpuMetrics, systemMetrics } = useStore();

  const performanceData = [
    { time: '00:00', gpu1: 65, gpu2: 45, throughput: 1200 },
    { time: '04:00', gpu1: 72, gpu2: 52, throughput: 1350 },
    { time: '08:00', gpu1: 85, gpu2: 68, throughput: 1580 },
    { time: '12:00', gpu1: 78, gpu2: 61, throughput: 1420 },
    { time: '16:00', gpu1: 82, gpu2: 55, throughput: 1380 },
    { time: '20:00', gpu1: 75, gpu2: 48, throughput: 1250 },
  ];

  const departmentUsage = [
    { name: 'Legal', value: systemMetrics.modelUsage.Legal, color: '#8884d8' },
    { name: 'RH', value: systemMetrics.modelUsage['Recursos Humanos'], color: '#82ca9d' },
    { name: 'Finanzas', value: systemMetrics.modelUsage.Finanzas, color: '#ffc658' },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Dashboard de Infraestructura
      </Typography>

      {/* Alert Banner */}
      <Alert severity="info" sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Activity size={16} />
          Sistema funcionando normalmente - {systemMetrics.jobQueue} trabajos en cola
        </Box>
      </Alert>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Vista General" />
          <Tab label="Rack 3D" />
          <Tab label="Métricas Detalladas" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flexGrow: 1 }}>
        {activeTab === 0 && (
          <Grid container spacing={2}>
            {/* GPU Status Cards */}
            <Grid item xs={12} md={6}>
              <GPUMonitor />
            </Grid>

            {/* System Overview */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Métricas del Sistema
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Clock size={32} color="#1976d2" />
                        <Typography variant="h4" sx={{ mt: 1 }}>
                          {systemMetrics.avgProcessingTime}s
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Tiempo Promedio
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Users size={32} color="#2e7d32" />
                        <Typography variant="h4" sx={{ mt: 1 }}>
                          {systemMetrics.jobQueue}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Cola de Trabajos
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Uso por Departamento
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={departmentUsage}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {departmentUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* Performance Chart */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Rendimiento en Tiempo Real
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="gpu1" 
                      stroke="#8884d8" 
                      name="RTX 6000 Ada (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="gpu2" 
                      stroke="#82ca9d" 
                      name="NVIDIA DGX H200 (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="throughput" 
                      stroke="#ffc658" 
                      name="Throughput (ops/min)"
                      yAxisId="right"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Visualización 3D del Rack
            </Typography>
            <RackVisualization />
          </Paper>
        )}

        {activeTab === 2 && (
          <SystemMetrics />
        )}
      </Box>
    </Box>
  );
}

export default InfrastructureDashboard;