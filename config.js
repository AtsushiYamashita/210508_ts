//
// http://overmorrow.hatenablog.com/entry/2015/11/15/213830


const typeScriptVersion = '4.0.3';

System.config({
  transpiler: 'ts',
  typescriptOptions: {
  },
  packages: {
    ".": {
      main: './main.ts',
      defaultExtension: 'ts'
    }
  },
  meta: {
    'typescript': { 'exports': 'ts' }
  },
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {
    'ts': 'npm:plugin-typescript@8.0.0/lib/plugin.js',
    'typescript': 'npm:typescript@' + typeScriptVersion + '/lib/typescript.js'
  }
});

const cerr = console
  .error
  .bind(console);

System
  .import('./main')
  .catch(cerr);