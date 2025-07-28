import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PermanentSidebar from './PermanentSidebar';
import TemporaryDrawer from './TemporaryDrawer';

const ResponsiveLayout = () => {
  const theme = useTheme();
  // theme.breakpoints.up('md') corresponde a telas com largura >= 900px por padrão no MUI
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div>
      {isDesktop? <PermanentSidebar /> : <TemporaryDrawer />}
      <main>
        {/* O conteúdo principal do dashboard (gráficos, tabelas) vai aqui */}
      </main>
    </div>
  );
};

export default ResponsiveLayout;