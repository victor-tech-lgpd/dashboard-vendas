// frontend/src/pages/DashboardPage.tsx
import { useState } from 'react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DashboardPage.css';

import useFetch from '../hooks/useFetch';
import LineChartComponent from '../components/charts/LineChartComponent';
import BarChartComponent from '../components/charts/BarChartComponent';
import PieChartComponent from '../components/charts/PieChartComponent';
import DataTableComponent from '../components/tables/DataTableComponent';
import KpiCard from '../components/common/KpiCard';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import InventoryIcon from '@mui/icons-material/Inventory';

// ... (Interface KpiData e funções de formatação) ...
interface KpiData {
    total_revenue: number;
    total_sales: number;
    average_ticket: number;
    total_quantity_sold: number;
}
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const formatNumber = (value: number) => new Intl.NumberFormat('pt-BR').format(value);


const DashboardPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const apiQuery = startDate && endDate
    ? `start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`
    : '';
  
  const { data: kpiData, loading: kpiLoading, error: kpiError } = useFetch<KpiData>(`http://localhost:8000/kpis/?${apiQuery}`);

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" color="text.primary" gutterBottom sx={{ mb: 3 }}>
          Painel de Vendas
        </Typography>

        {/* --- CORREÇÃO: Sintaxe do Grid v2 --- */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid xs={12} sm={6} md={3}>
            <KpiCard
              title="FATURAMENTO TOTAL"
              value={kpiLoading ? '...' : formatCurrency(kpiData?.total_revenue || 0)}
              icon={<AttachMoneyIcon />}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <KpiCard
              title="ITENS VENDIDOS"
              value={kpiLoading ? '...' : formatNumber(kpiData?.total_quantity_sold || 0)}
              icon={<InventoryIcon />}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <KpiCard
              title="VENDAS NO PERÍODO"
              value={kpiLoading ? '...' : formatNumber(kpiData?.total_sales || 0)}
              icon={<ShoppingCartIcon />}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <KpiCard
              title="TICKET MÉDIO"
              value={kpiLoading ? '...' : formatCurrency(kpiData?.average_ticket || 0)}
              icon={<PointOfSaleIcon />}
            />
          </Grid>
        </Grid>
        
        {/* O restante do código também usa a nova sintaxe do Grid */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid xs={12} md={4}>
            <Paper sx={{ p: 2, height: '100%', width: '100%' }}>
              <Typography variant="h6" gutterBottom>Filtros</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="custom-datepicker"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="custom-datepicker"
                />
              </Box>
            </Paper>
          </Grid>
          <Grid xs={12} md={8}>
            <Paper sx={{ p: 2, height: '100%', width: '100%' }}>
              <Typography variant="h6" gutterBottom>Vendas por Produto (Volume)</Typography>
              <BarChartComponent apiQuery={apiQuery} />
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
             <Paper sx={{ p: 2, width: '100%' }}>
                <Typography variant="h6" gutterBottom>Evolução de Vendas</Typography>
                <LineChartComponent apiQuery={apiQuery} />
             </Paper>
          </Grid>
          <Grid xs={12} md={4}>
             <Paper sx={{ p: 2, width: '100%' }}>
                <Typography variant="h6" gutterBottom>Distribuição de Vendas</Typography>
                <PieChartComponent apiQuery={apiQuery} />
             </Paper>
          </Grid>
          <Grid xs={12}>
             <Paper sx={{ p: 2, width: '100%' }}>
                <Typography variant="h6" gutterBottom>Detalhes das Vendas</Typography>
                <DataTableComponent apiQuery={apiQuery} />
             </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;