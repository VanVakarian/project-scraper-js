// rename this file to settings.js

export const OUTPUT_DIRECTORY = './scraped-projects';

export const FILE_EXTENSIONS_INCLUDE = ['.js', '.ts', '.json'];

export const DIR_NAMES_IGNORE = [
  'node_modules',
  'public',
  'assets',
  '.angular',
  '.vscode',
  'del',
  'dist',
  'static',
  'venv',
  'backups',
];

export const FILE_NAMES_IGNORE = [
  'package-lock.json',
  'prettierrc.json',
  'tsconfig.app.json',
  'tailwind.config.js',
  'tsconfig.spec.json',
  '.prettierrc.json',
  'GEMINI.md',
];
