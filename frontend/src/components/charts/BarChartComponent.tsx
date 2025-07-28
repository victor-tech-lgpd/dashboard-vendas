// frontend/src/components/charts/BarChartComponent.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useFetch from '../../hooks/useFetch';
import { useTheme } from '@mui/material/styles'; // Importe o hook

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ... (interface SaleData) ...

const BarChartComponent = ({ apiQuery }: { apiQuery: string }) => {
  const theme = useTheme(); // Use o tema para pegar as cores
  const { data, loading, error } = useFetch<SaleData[]>(`http://localhost:8000/sales?${apiQuery}`);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: Falha ao buscar</p>;

  const chartData = {
    labels: data?.map((item) => item.product_name) || [],
    datasets: [
      {
        label: 'Quantidade Vendida',
        data: data?.map((item) => item.quantity) || [],
        backgroundColor: theme.palette.primary.main, // Cor primária do tema
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.palette.text.secondary, // Cor do texto do tema
        },
      },
      title: {
        display: false, // O título ficará no card do dashboard
      },
    },
    scales: {
      y: {
        ticks: { color: theme.palette.text.secondary }, // Cor dos eixos
        grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Cor das linhas de grade
      },
      x: {
        ticks: { color: theme.palette.text.secondary }, // Cor dos eixos
        grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Cor das linhas de grade
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChartComponent;