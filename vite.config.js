import { defineConfig } from 'vite';  
import path from 'path';  
export default {
  root: "./demo",
  base:'./',
  resolve: {  
    alias: {  
      'markdown-to-pdf': path.resolve(__dirname, 'index.ts')  
    }  
  }  
};