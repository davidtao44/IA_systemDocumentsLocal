import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  IconButton,
  Alert
} from '@mui/material';
import {
  Send,
  Bot,
  User,
  FileText,
  Folder,
  Trash2,
  Edit,
  RotateCcw,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

const departments = [
  'Legal',
  'Recursos Humanos',
  'Finanzas',
  'IT',
  'Ventas',
  'Marketing',
  'Operaciones'
];

const suggestedActions = {
  Legal: [
    'Busca el contrato con X empresa y extrae las fechas clave',
    'Encuentra todos los documentos que vencen este mes',
    'Organiza los contratos por tipo y fecha de vencimiento'
  ],
  'Recursos Humanos': [
    'Organiza los documentos de RH por antigüedad',
    'Busca expedientes de empleados activos',
    'Crea un reporte de políticas actualizadas'
  ],
  Finanzas: [
    'Crea una carpeta Q2-2024 y mueve estos informes',
    'Busca facturas pendientes de pago',
    'Organiza reportes financieros por trimestre'
  ]
};

function AIChat() {
  const { 
    selectedDepartment, 
    setSelectedDepartment, 
    chatHistory, 
    addChatMessage 
  } = useStore();
  
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory[selectedDepartment]]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: message.trim(),
      timestamp: new Date()
    };

    addChatMessage(selectedDepartment, userMessage);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        message: generateAIResponse(message.trim()),
        timestamp: new Date(),
        actions: generateActions(message.trim())
      };
      addChatMessage(selectedDepartment, aiResponse);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const responses = {
      'contrato': 'He encontrado 3 contratos relacionados. El contrato con Empresa A vence el 15/03/2024. ¿Te gustaría que lo mueva a una carpeta de "Próximos a Vencer"?',
      'organiza': 'He organizado los documentos por fecha. Creé las siguientes carpetas: "2024", "2023", "2022". ¿Quieres que aplique algún filtro adicional?',
      'busca': 'Encontré 12 documentos que coinciden con tu búsqueda. Los he ordenado por relevancia y fecha de modificación.',
      'crea': 'He creado la carpeta "Q2-2024" y he movido 8 reportes financieros. La operación se completó exitosamente.'
    };

    for (const [key, response] of Object.entries(responses)) {
      if (userMessage.toLowerCase().includes(key)) {
        return response;
      }
    }

    return 'He procesado tu solicitud. ¿Hay algo específico que te gustaría que haga con los documentos encontrados?';
  };

  const generateActions = (userMessage) => {
    if (userMessage.toLowerCase().includes('contrato')) {
      return [
        { type: 'move', label: 'Mover a "Próximos a Vencer"', icon: <Folder size={16} /> },
        { type: 'view', label: 'Ver detalles del contrato', icon: <FileText size={16} /> }
      ];
    }
    if (userMessage.toLowerCase().includes('organiza')) {
      return [
        { type: 'undo', label: 'Deshacer organización', icon: <RotateCcw size={16} /> },
        { type: 'view', label: 'Ver estructura creada', icon: <Folder size={16} /> }
      ];
    }
    return [];
  };

  const handleSuggestedAction = (action) => {
    setMessage(action);
  };

  const currentMessages = chatHistory[selectedDepartment] || [];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Chat IA por Áreas
      </Typography>

      <Grid container spacing={2} sx={{ diplay: 'flex', flexDirection: 'column' }}>
        {/* Department Selector & Suggestions */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Departamento</InputLabel>
              <Select
                value={selectedDepartment}
                label="Departamento"
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="subtitle2" gutterBottom>
              Acciones Sugeridas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {suggestedActions[selectedDepartment]?.map((action, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  onClick={() => handleSuggestedAction(action)}
                  sx={{ 
                    textAlign: 'left', 
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    fontSize: '0.75rem'
                  }}
                >
                  {action}
                </Button>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Historial de Acciones
            </Typography>
            <List dense>
              <ListItem>
                <Typography variant="caption">
                  Organizó 15 documentos legales
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Creó carpeta "Contratos 2024"
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="caption">
                  Movió 3 archivos a archivo
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Chat Area */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Bot size={20} />
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    Asistente IA - {selectedDepartment}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Especializado en gestión documental para {selectedDepartment}
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Chip 
                    icon={<MessageSquare size={16} />}
                    label={`${currentMessages.length} mensajes`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              {currentMessages.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Bot size={64} color="#666" />
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    ¡Hola! Soy tu asistente IA para {selectedDepartment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Puedo ayudarte a organizar, buscar y gestionar documentos.
                    Prueba con una de las acciones sugeridas o escribe tu propia consulta.
                  </Typography>
                </Box>
              ) : (
                <AnimatePresence>
                  {currentMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                          mb: 2
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '70%',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 1,
                            flexDirection: msg.type === 'user' ? 'row-reverse' : 'row'
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: msg.type === 'user' ? 'secondary.main' : 'primary.main',
                              width: 32,
                              height: 32
                            }}
                          >
                            {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                          </Avatar>
                          <Box>
                            <Paper
                              sx={{
                                p: 2,
                                bgcolor: msg.type === 'user' ? 'primary.main' : 'background.paper',
                                color: msg.type === 'user' ? 'primary.contrastText' : 'text.primary'
                              }}
                            >
                              <Typography variant="body2">
                                {msg.message}
                              </Typography>
                            </Paper>
                            
                            {/* Action Buttons for AI messages */}
                            {msg.type === 'ai' && msg.actions && (
                              <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {msg.actions.map((action, index) => (
                                  <Button
                                    key={index}
                                    size="small"
                                    variant="outlined"
                                    startIcon={action.icon}
                                    sx={{ fontSize: '0.75rem' }}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </Box>
                            )}
                            
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                              {msg.timestamp.toLocaleTimeString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      <Bot size={16} />
                    </Avatar>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Escribiendo...
                      </Typography>
                    </Paper>
                  </Box>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder={`Escribe tu consulta para ${selectedDepartment}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  multiline
                  maxRows={3}
                  disabled={isTyping}
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  sx={{ minWidth: 'auto', px: 2 }}
                >
                  <Send size={20} />
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AIChat;