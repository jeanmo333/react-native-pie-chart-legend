import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'index.ts',
  output: [
    { file: 'dist/index.js', format: 'cjs', sourcemap: true },
    { file: 'dist/index.es.js', format: 'es', sourcemap: true }
  ],
  external: ['react', 'react-native', 'react-native-svg'],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: ['@babel/preset-react', '@babel/preset-typescript']
    })
  ]
};