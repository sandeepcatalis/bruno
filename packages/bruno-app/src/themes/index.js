import light from './light/light';
import lightMonochrome from './light/light-monochrome';
import lightPastel from './light/light-pastel';
import daffyMint from './light/daffy-mint';
import daffySlate from './light/daffy-slate';
import vscodeLight from './light/vscode';
import dark from './dark/dark';
import darkMonochrome from './dark/dark-monochrome';
import darkPastel from './dark/dark-pastel';
import daffyOcean from './dark/daffy-ocean';
import daffySunset from './dark/daffy-sunset';
import nord from './dark/nord';
import vscodeDark from './dark/vscode';

const themes = {
  light,
  dark,
  'light-monochrome': lightMonochrome,
  'light-pastel': lightPastel,
  'dark-monochrome': darkMonochrome,
  'dark-pastel': darkPastel,
  'daffy-mint': daffyMint,
  'daffy-slate': daffySlate,
  'daffy-ocean': daffyOcean,
  'daffy-sunset': daffySunset,
  nord,
  'vscode-light': vscodeLight,
  'vscode-dark': vscodeDark
};

// Theme metadata for UI display
export const themeRegistry = {
  'light': {
    id: 'light',
    name: 'Light',
    mode: 'light'
  },
  'light-monochrome': {
    id: 'light-monochrome',
    name: 'Light Monochrome',
    mode: 'light'
  },
  'light-pastel': {
    id: 'light-pastel',
    name: 'Light Pastel',
    mode: 'light'
  },
  'daffy-mint': {
    id: 'daffy-mint',
    name: 'Daffy Mint',
    mode: 'light'
  },
  'daffy-slate': {
    id: 'daffy-slate',
    name: 'Daffy Slate',
    mode: 'light'
  },
  'dark': {
    id: 'dark',
    name: 'Dark',
    mode: 'dark'
  },
  'dark-monochrome': {
    id: 'dark-monochrome',
    name: 'Dark Monochrome',
    mode: 'dark'
  },
  'dark-pastel': {
    id: 'dark-pastel',
    name: 'Dark Pastel',
    mode: 'dark'
  },
  'daffy-ocean': {
    id: 'daffy-ocean',
    name: 'Daffy Ocean',
    mode: 'dark'
  },
  'daffy-sunset': {
    id: 'daffy-sunset',
    name: 'Daffy Sunset',
    mode: 'dark'
  },
  'nord': {
    id: 'nord',
    name: 'Nord',
    mode: 'dark'
  },
  'vscode-light': {
    id: 'vscode-light',
    name: 'VS Code Light',
    mode: 'light'
  },
  'vscode-dark': {
    id: 'vscode-dark',
    name: 'VS Code Dark',
    mode: 'dark'
  }
};

export const getLightThemes = () => Object.values(themeRegistry).filter((t) => t.mode === 'light');
export const getDarkThemes = () => Object.values(themeRegistry).filter((t) => t.mode === 'dark');

export default themes;
