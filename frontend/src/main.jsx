import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ToasterProvider from './contexts/ToasterContext.jsx';
import AuthContextProvider from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToasterProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ToasterProvider>
    </BrowserRouter>
  </StrictMode>
);
