import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  Chip,
  Avatar
} from '@mui/material';
import {
  Folder,
  FolderOpen,
  File,
  FileText,
  Image,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const getFileIcon = (type, name) => {
  if (type === 'folder') return <Folder size={18} />;
  
  const extension = name.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return <FileText size={18} color="#d32f2f" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <Image size={18} color="#2e7d32" />;
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet size={18} color="#1976d2" />;
    case 'docx':
    case 'doc':
      return <FileText size={18} color="#1976d2" />;
    default:
      return <File size={18} />;
  }
};

function FileTreeItem({ item, level = 0, onFileSelect }) {
  const [expanded, setExpanded] = useState(level === 0);
  const { selectedFiles, setSelectedFiles } = useStore();

  const handleToggle = () => {
    if (item.type === 'folder') {
      setExpanded(!expanded);
    } else {
      onFileSelect(item);
    }
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    if (item.type === 'file') {
      const isSelected = selectedFiles.some(f => f.id === item.id);
      if (isSelected) {
        setSelectedFiles(selectedFiles.filter(f => f.id !== item.id));
      } else {
        setSelectedFiles([...selectedFiles, item]);
      }
    }
  };

  const isSelected = selectedFiles.some(f => f.id === item.id);

  return (
    <>
      <ListItem
        button
        onClick={handleToggle}
        sx={{
          pl: 2 + level * 2,
          py: 0.5,
          backgroundColor: isSelected ? 'action.selected' : 'transparent',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 32 }}>
          {item.type === 'folder' ? (
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </IconButton>
          ) : (
            <Box sx={{ width: 24, display: 'flex', justifyContent: 'center' }}>
              {getFileIcon(item.type, item.name)}
            </Box>
          )}
        </ListItemIcon>
        
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {item.name}
              </Typography>
              {item.type === 'file' && (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Chip label={item.size} size="small" variant="outlined" />
                  {item.modified && (
                    <Chip label={item.modified} size="small" color="primary" variant="outlined" />
                  )}
                </Box>
              )}
            </Box>
          }
          onClick={item.type === 'file' ? handleSelect : undefined}
        />
      </ListItem>
      
      {item.type === 'folder' && item.children && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <FileTreeItem
                key={child.id}
                item={child}
                level={level + 1}
                onFileSelect={onFileSelect}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function FileExplorer({ onFileSelect }) {
  const { fileTree } = useStore();

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <List dense>
        <FileTreeItem item={fileTree} onFileSelect={onFileSelect} />
      </List>
    </Box>
  );
}

export default FileExplorer;