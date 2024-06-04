import { defineConfig } from 'vite';  
import path from 'path';  
export default {
  root: "./demo",
  base:'./',
  resolve: {  
    alias: {  
      'markdown-converter-to-pdf': path.resolve(__dirname, 'index.ts')  
    }  
  }  
};
