// frontend/src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1e1e', // Cor de fundo principal (bem escura)
      paper: '#2a2a2a',   // Cor dos cards e superfícies
    },
    primary: {
      main: '#00aaff', // Azul vibrante para acentos e destaques
    },
    text: {
      primary: '#ffffff', // Texto principal (branco)
      secondary: '#b0b0b0', // Texto secundário (cinza claro)
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
});

export default theme;