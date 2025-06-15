import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  external: ['react', 'react-native', 'react-native-svg']
});