import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      name: camelCase(pkg.name),
      format: 'umd',
    },
    {
      file: pkg.module,
      format: 'es'
    },
  ],
  // Bundles not to be included in the bundle
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    // Compile TypeScript files
    typescript({
      typescript: require('typescript'),
    }),
    // Allow bundling cjs modules
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
  ],
};
