import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // Theme state
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  // User and permissions
  user: {
    id: 1,
    name: 'Admin User',
    role: 'admin',
    department: 'IT',
    permissions: ['read', 'write', 'delete', 'admin']
  },

  // Document management
  selectedFiles: [],
  currentDirectory: '/',
  fileTree: {
    id: 'root',
    name: 'Documentos',
    type: 'folder',
    children: [
      {
        id: 'legal',
        name: 'Legal',
        type: 'folder',
        children: [
          { id: 'contract1', name: 'Contrato_Empresa_A.pdf', type: 'file', size: '2.5MB', modified: '2024-01-15' },
          { id: 'contract2', name: 'Contrato_Empresa_B.pdf', type: 'file', size: '1.8MB', modified: '2024-01-20' }
        ]
      },
      {
        id: 'rh',
        name: 'Recursos Humanos',
        type: 'folder',
        children: [
          { id: 'employee1', name: 'Expediente_Juan_Perez.pdf', type: 'file', size: '3.2MB', modified: '2024-01-10' },
          { id: 'policy1', name: 'Politicas_RH_2024.docx', type: 'file', size: '1.1MB', modified: '2024-01-05' }
        ]
      },
      {
        id: 'finanzas',
        name: 'Finanzas',
        type: 'folder',
        children: [
          { id: 'report1', name: 'Reporte_Q1_2024.xlsx', type: 'file', size: '4.5MB', modified: '2024-01-25' },
          { id: 'budget1', name: 'Presupuesto_2024.pdf', type: 'file', size: '2.1MB', modified: '2024-01-12' }
        ]
      }
    ]
  },

  // Chat state
  selectedDepartment: 'Legal',
  chatHistory: {
    Legal: [
      { id: 1, type: 'user', message: 'Busca el contrato con Empresa A', timestamp: new Date() },
      { id: 2, type: 'ai', message: 'He encontrado el contrato con Empresa A. Las fechas clave son: Inicio: 15/01/2024, Vencimiento: 15/01/2025, Renovación automática: Sí', timestamp: new Date() }
    ],
    'Recursos Humanos': [],
    Finanzas: []
  },

  // Infrastructure monitoring
  gpuMetrics: {
    'RTX 6000 Ada': {
      id: 'gpu1',
      name: 'RTX 6000 Ada',
      memoryUsage: 75,
      temperature: 68,
      workload: 82,
      throughput: 1250
    },
    'NVIDIA DGX H200': {
      id: 'gpu2',
      name: 'NVIDIA DGX H200',
      memoryUsage: 45,
      temperature: 62,
      workload: 55,
      throughput: 2100
    }
  },

  systemMetrics: {
    avgProcessingTime: 2.3,
    jobQueue: 12,
    modelUsage: {
      Legal: 35,
      'Recursos Humanos': 28,
      Finanzas: 37
    }
  },

  // Actions
  setSelectedFiles: (files) => set({ selectedFiles: files }),
  setCurrentDirectory: (dir) => set({ currentDirectory: dir }),
  setSelectedDepartment: (dept) => set({ selectedDepartment: dept }),
  addChatMessage: (department, message) => set((state) => ({
    chatHistory: {
      ...state.chatHistory,
      [department]: [...(state.chatHistory[department] || []), message]
    }
  })),
  updateGpuMetrics: (gpuId, metrics) => set((state) => ({
    gpuMetrics: {
      ...state.gpuMetrics,
      [gpuId]: { ...state.gpuMetrics[gpuId], ...metrics }
    }
  }))
}));