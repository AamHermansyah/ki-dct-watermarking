import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import wasm from 'vite-plugin-wasm';
import commonjs from 'vite-plugin-commonjs';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'dist',
    },
    define: {
        global: 'window'
    },
    plugins: [
        dts({
            include: [resolve(__dirname, 'src/lib/**/*.ts')]
        }),
        wasm(),
        commonjs(),
    ]
})