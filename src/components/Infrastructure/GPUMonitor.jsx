import React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert
} from '@mui/material';
import {
  Cpu,
  Thermometer,
  Activity,
  TrendingUp,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { useStore } from '../../store/useStore';

function GPUMonitor() {
  const { gpuMetrics } = useStore();

  const getStatusColor = (value, thresholds = { warning: 70, critical: 85 }) => {
    if (value >= thresholds.critical) return 'error';
    if (value >= thresholds.warning) return 'warning';
    return 'success';
  };

  const getStatusIcon = (value, thresholds = { warning: 70, critical: 85 }) => {
    if (value >= thresholds.critical) return <AlertTriangle size={16} />;
    if (value >= thresholds.warning) return <TrendingUp size={16} />;
    return <Activity size={16} />;
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Estado de GPUs
      </Typography>
      
      <Grid container spacing={2}>
        {Object.values(gpuMetrics).map((gpu) => (
          <Grid item xs={12} key={gpu.id}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {gpu.name}
                  </Typography>
                  <Chip 
                    icon={getStatusIcon(Math.max(gpu.memoryUsage, gpu.temperature))}
                    label="Operativo" 
                    color={getStatusColor(Math.max(gpu.memoryUsage, gpu.temperature))}
                    size="small"
                  />
                </Box>

                <Grid container spacing={2}>
                  {/* Memory Usage */}
                  <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Cpu size={16} />
                        <Typography variant="body2">
                          Uso de Memoria
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={gpu.memoryUsage}
                        color={getStatusColor(gpu.memoryUsage)}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {gpu.memoryUsage}% utilizado
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Temperature */}
                  <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Thermometer size={16} />
                        <Typography variant="body2">
                          Temperatura
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(gpu.temperature / 100) * 100}
                        color={getStatusColor(gpu.temperature, { warning: 65, critical: 80 })}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {gpu.temperature}°C
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Workload */}
                  <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Activity size={16} />
                        <Typography variant="body2">
                          Carga de Trabajo
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={gpu.workload}
                        color={getStatusColor(gpu.workload)}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {gpu.workload}% activo
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Throughput */}
                  <Grid item xs={6}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Zap size={16} />
                        <Typography variant="body2">
                          Throughput
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="primary">
                        {gpu.throughput}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ops/min
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Alerts */}
                {gpu.temperature > 75 && (
                  <Alert severity="warning" sx={{ mt: 1 }}>
                    Temperatura elevada detectada
                  </Alert>
                )}
                {gpu.memoryUsage > 90 && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    Memoria casi agotada
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default GPUMonitor;