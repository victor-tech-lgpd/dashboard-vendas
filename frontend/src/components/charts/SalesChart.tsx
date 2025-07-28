// frontend/src/components/charts/SalesChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useFetch from '../../hooks/useFetch';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SaleData {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  description?: string;
}

interface SalesChartProps {
  apiQuery: string;
}

const SalesChart = ({ apiQuery }: SalesChartProps) => {
  const { data, loading, error } = useFetch<SaleData[]>(`http://localhost:8000/sales?${apiQuery}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const chartData = {
    labels: data?.map((item) => item.product_name) || [],
    datasets: [
      {
        label: 'Quantidade Vendida',
        data: data?.map((item) => item.quantity) || [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Vendas por Produto' },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SalesChart;