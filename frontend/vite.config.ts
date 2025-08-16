import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Function to get backend port from environment
const getBackendPort = (): number => {
  const port = process.env['BACKEND_PORT'];
  return port !== undefined && port !== '' ? parseInt(port, 10) : 8080;
};

// https://vite.dev/config/
export default defineConfig(() => {
  const backendPort = getBackendPort();
  const envPort = process.env['FRONTEND_PORT'];
  const frontendPort = envPort !== undefined && envPort !== '' ? parseInt(envPort, 10) : 3000;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: frontendPort,
      host: true,
      strictPort: true,
    },
    define: {
      // Make backend port available to the application
      __BACKEND_PORT__: JSON.stringify(backendPort),
      // Set the API URL
      'import.meta.env.VITE_API_URL': JSON.stringify(`http://localhost:${String(backendPort)}`),
    },
  };
});
