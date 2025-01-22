import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Torna o servidor acessível externamente
    port: 5173,      // Porta (verifique se corresponde ao comando 'lt --port')
    hmr: {            // Configuração específica para o HMR
      overlay: false, // Evita sobreposição de erros na tela (opcional)
      clientPort: 5173, // Porta do cliente HMR (deve ser a mesma do servidor)
    },
    watch: {
       usePolling: true,
    },
  },
});