import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const api = 'http://localhost:4000';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@tiptap') || id.includes('node_modules/prosemirror')) {
            return 'editor';
          }
          if (id.includes('/client/src/admin/') || id.includes('\\client\\src\\admin\\')) return 'admin';
          if (id.includes('node_modules/react-dom')) return 'react';
          if (id.includes('node_modules/react-router')) return 'router';
          if (id.includes('node_modules/react/')) return 'react';
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: { '/api': api, '/images': api, '/wp-content': api, '/uploads': api, '/sitemap.xml': api, '/robots.txt': api },
  },
});
