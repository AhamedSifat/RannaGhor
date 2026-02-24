import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId='396935355068-npvfsbpakg6a9re5tpblt4a067chnb8t.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
