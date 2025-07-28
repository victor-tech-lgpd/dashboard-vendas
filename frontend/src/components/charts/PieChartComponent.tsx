// frontend/src/components/charts/PieChartComponent.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useFetch from '../../hooks/useFetch';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SaleData {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  description?: string;
}

interface PieChartProps {
  apiQuery: string;
}

const PieChartComponent = ({ apiQuery }: PieChartProps) => {
  const { data, loading, error } = useFetch<SaleData[]>(`http://localhost:8000/sales?${apiQuery}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const chartData = {
    labels: data?.map((item) => item.product_name) || [],
    datasets: [
      {
        label: 'Quantidade Vendida',
        data: data?.map((item) => item.quantity) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Vendas por Produto (Pizza)' },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChartComponent;