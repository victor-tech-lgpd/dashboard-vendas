// frontend/src/components/common/KpiCard.tsx
import { Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const KpiCard = ({ title, value, icon }: KpiCardProps) => {
  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 2.5, 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'background.paper'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ color: 'primary.main', mr: 1.5 }}>
          {icon}
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Paper>
  );
};

export default KpiCard;