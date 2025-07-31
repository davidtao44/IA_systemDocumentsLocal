import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text, Html } from '@react-three/drei';
import { Box as MuiBox, Typography, Chip } from '@mui/material';
import { useStore } from '../../store/useStore';

function GPU({ position, name, metrics, color }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const getIntensity = (usage) => usage / 100;

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[2, 0.5, 4]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={getIntensity(metrics.workload) * 0.3}
        />
      </Box>
      
      {/* GPU Label */}
      <Html position={[0, 1, 0]} center>
        <MuiBox sx={{ 
          bgcolor: 'background.paper', 
          p: 1, 
          borderRadius: 1,
          border: '1px solid rgba(0,0,0,0.1)',
          minWidth: 200
        }}>
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <MuiBox sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
            <Chip label={`${metrics.memoryUsage}%`} size="small" color="primary" />
            <Chip label={`${metrics.temperature}°C`} size="small" color="secondary" />
          </MuiBox>
        </MuiBox>
      </Html>

      {/* Connection cables */}
      <Box args={[0.1, 0.1, 2]} position={[0, -0.5, 1]}>
        <meshStandardMaterial color="#333" />
      </Box>
    </group>
  );
}

function Rack() {
  return (
    <group>
      {/* Rack Frame */}
      <Box args={[8, 12, 6]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" transparent opacity={0.1} />
      </Box>
      
      {/* Rack Shelves */}
      {[-4, -2, 0, 2, 4].map((y, index) => (
        <Box key={index} args={[7.5, 0.1, 5.5]} position={[0, y, 0]}>
          <meshStandardMaterial color="#666" />
        </Box>
      ))}

      {/* Rack Posts */}
      {[
        [-3.75, 0, -2.75],
        [3.75, 0, -2.75],
        [-3.75, 0, 2.75],
        [3.75, 0, 2.75]
      ].map((pos, index) => (
        <Box key={index} args={[0.2, 12, 0.2]} position={pos}>
          <meshStandardMaterial color="#444" />
        </Box>
      ))}
    </group>
  );
}

function RackVisualization() {
  const { gpuMetrics } = useStore();

  return (
    <MuiBox sx={{ height: 500, width: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [10, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Rack />
        
        <GPU
          position={[-2, 2, 0]}
          name="RTX 6000 Ada"
          metrics={gpuMetrics['RTX 6000 Ada']}
          color="#4caf50"
        />
        
        <GPU
          position={[2, 0, 0]}
          name="NVIDIA DGX H200"
          metrics={gpuMetrics['NVIDIA DGX H200']}
          color="#2196f3"
        />

        {/* Network Switch */}
        <Box args={[6, 0.3, 2]} position={[0, -2, 0]}>
          <meshStandardMaterial color="#ff9800" />
        </Box>
        
        <Html position={[0, -2, 1.5]} center>
          <MuiBox sx={{ 
            bgcolor: 'background.paper', 
            p: 1, 
            borderRadius: 1,
            border: '1px solid rgba(0,0,0,0.1)'
          }}>
            <Typography variant="caption">
              Network Switch
            </Typography>
          </MuiBox>
        </Html>

        {/* Power Supply */}
        <Box args={[4, 0.5, 1.5]} position={[0, -4, 0]}>
          <meshStandardMaterial color="#f44336" />
        </Box>
        
        <Html position={[0, -4, 1]} center>
          <MuiBox sx={{ 
            bgcolor: 'background.paper', 
            p: 1, 
            borderRadius: 1,
            border: '1px solid rgba(0,0,0,0.1)'
          }}>
            <Typography variant="caption">
              Power Supply Unit
            </Typography>
          </MuiBox>
        </Html>

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Controls Info */}
      <MuiBox sx={{ 
        position: 'absolute', 
        top: 10, 
        left: 10, 
        bgcolor: 'background.paper', 
        p: 1, 
        borderRadius: 1,
        border: '1px solid rgba(0,0,0,0.1)'
      }}>
        <Typography variant="caption">
          Arrastra para rotar • Scroll para zoom • Click derecho para mover
        </Typography>
      </MuiBox>
    </MuiBox>
  );
}

export default RackVisualization;