# Sistema de Gestión Documental con IA y Monitoreo de Infraestructura

## Descripción

Sistema frontend completo para gestión documental potenciado por IA con capacidades de monitoreo de infraestructura local. Desarrollado con React 19 + Vite, Material-UI y tecnologías modernas.

## Características Principales

### 🗂️ Módulo de Gestión Documental
- **Árbol de directorios interactivo** con navegación fluida
- **Vista dual**: explorador de archivos + previsualización (PDF, imágenes, Office)
- **Drag & Drop** para carga múltiple con barra de progreso
- **Metadatos editables**: tipo, área asociada, fecha, tags
- **Sistema de versionado** con historial de cambios

### 🤖 Chat de IA por Áreas
- **Selector de departamentos** (Legal, RH, Finanzas, IT, Marketing)
- **Chat contextual** con memoria de conversación por área
- **Funcionalidades específicas**:
  - "Busca el contrato con X empresa y extrae las fechas clave"
  - "Organiza los documentos de RH por antigüedad"
  - "Crea una carpeta Q2-2024 y mueve estos informes"
- **Acciones directas** sobre archivos desde el chat
- **Historial de acciones** ejecutadas con capacidad de rollback

### 📊 Dashboard de Infraestructura
- **Visualización 3D interactiva** del rack de servidores
- **Panel de estado de GPUs** en tiempo real:
  - Uso de memoria (RTX 6000 Ada/NVIDIA DGX H200)
  - Temperatura y carga de trabajo
  - Throughput de inferencia
- **Métricas de rendimiento** del sistema de IA:
  - Tiempo promedio de procesamiento
  - Cola de trabajos
  - Uso del modelo por área

### 🔧 Vistas Especializadas
- **Panel de administración** de modelos IA
- **Logs de interacciones** con documentos
- **Análisis de uso** de recursos por departamento
- **Configuración de alertas** de hardware

## Tecnologías Utilizadas

- **Frontend**: React 19.1.0 + Vite 7.0.4
- **UI Framework**: Material-UI (MUI) v6
- **Estado Global**: Zustand
- **Routing**: React Router DOM
- **3D Graphics**: Three.js (@react-three/fiber, @react-three/drei)
- **Charts**: Recharts
- **Drag & Drop**: react-dropzone
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Data Fetching**: React Query

## Estructura del Proyecto

```
src/
├── components/
│   ├── Analytics/
│   │   └── ResourceAnalysis.jsx
│   ├── Documents/
│   │   ├── FileExplorer.jsx
│   │   ├── FilePreview.jsx
│   │   ├── MetadataPanel.jsx
│   │   └── UploadZone.jsx
│   ├── Infrastructure/
│   │   ├── GPUMonitor.jsx
│   │   ├── RackVisualization.jsx
│   │   └── SystemMetrics.jsx
│   ├── Layout/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   └── Logs/
│       └── InteractionLogs.jsx
├── pages/
│   ├── AdminPanel.jsx
│   ├── AIChat.jsx
│   ├── DocumentManagement.jsx
│   └── InfrastructureDashboard.jsx
├── store/
│   └── useStore.js
├── App.jsx
└── main.jsx
```

## Instalación y Configuración

1. **Clonar el repositorio**:
```bash
git clone <repository-url>
cd IA-local
```

2. **Instalar dependencias**:
```bash
npm install --legacy-peer-deps
```

3. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

4. **Construir para producción**:
```bash
npm run build
```

## Características Técnicas

### 🔐 Seguridad
- Sistema de permisos RBAC (Role-Based Access Control)
- Autenticación y autorización por departamentos
- Logs de auditoría completos
- Gestión segura de documentos

### 🎨 Interfaz de Usuario
- **Modo oscuro/claro** automático
- **Diseño responsivo** para todos los dispositivos
- **Animaciones fluidas** con Framer Motion
- **Notificaciones** de eventos críticos

### 📈 Monitoreo y Análisis
- **Métricas en tiempo real** de GPU y sistema
- **Análisis de uso** por departamento
- **Alertas configurables** para hardware
- **Dashboards interactivos** con gráficos

### 🔄 Estado y Datos
- **Estado global** gestionado con Zustand
- **Cache inteligente** con React Query
- **Sincronización** en tiempo real
- **Persistencia** de configuraciones

## Funcionalidades Avanzadas

### Chat IA Contextual
- Memoria de conversación por área
- Acciones directas sobre archivos
- Búsqueda semántica global
- Integración con múltiples modelos IA

### Visualización 3D
- Rack de servidores interactivo
- Controles de cámara (zoom, rotación, pan)
- Estados visuales de hardware
- Información detallada en tiempo real

### Gestión Documental
- Previsualización de múltiples formatos
- Metadatos enriquecidos
- Versionado automático
- Búsqueda avanzada

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de la construcción
- `npm run lint` - Análisis de código con ESLint

## Configuración de Desarrollo

El proyecto utiliza:
- **Vite** como bundler y servidor de desarrollo
- **ESLint** para análisis de código
- **Hot Module Replacement** para desarrollo rápido
- **TypeScript** ready (configuración incluida)

## Próximas Funcionalidades

- [ ] Module Federation para microfrontends
- [ ] Integración con APIs reales
- [ ] Tests unitarios y de integración
- [ ] PWA capabilities
- [ ] Internacionalización (i18n)

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## Soporte

Para soporte técnico o preguntas sobre el proyecto, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para la gestión documental inteligente**

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
