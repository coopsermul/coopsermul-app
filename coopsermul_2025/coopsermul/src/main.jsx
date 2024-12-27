import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { EleccionesApp } from './EleccionesApp';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EleccionesApp />
  </StrictMode>
);
