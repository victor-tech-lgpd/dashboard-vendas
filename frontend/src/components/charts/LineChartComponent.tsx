// frontend/src/components/charts/LineChartComponent.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'; // 1. Importe o Filler
import useFetch from '../../hooks/useFetch';
import { useTheme } from '@mui/material/styles';

// 2. Registre o Filler
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface SaleData {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
}

const LineChartComponent = ({ apiQuery }: { apiQuery: string }) => {
  const theme = useTheme();
  const { data, loading, error } = useFetch<SaleData[]>(`http://localhost:8000/sales?${apiQuery}`);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: Falha ao buscar</p>;

  const chartData = {
    labels: data?.map((item) => item.product_name) || [],
    datasets: [
      {
        label: 'Quantidade Vendida',
        data: data?.map((item) => item.quantity) || [],
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 170, 255, 0.2)', // Cor de preenchimento
        fill: true, // Habilita o preenchimento
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { color: theme.palette.text.secondary } },
      title: { display: false },
    },
    scales: {
      y: { ticks: { color: theme.palette.text.secondary }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      x: { ticks: { color: theme.palette.text.secondary }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChartComponent;