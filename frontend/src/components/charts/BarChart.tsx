// components/charts/BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import useFetch from '../../hooks/useFetch';

// Interface para os dados da API
interface MonthlyRevenueData {
  month: string;
  revenue: number;
}

const BarChart = () => {
  const { data: revenueData, loading, error } = useFetch<MonthlyRevenueData>('/api/monthly-revenue');

  if (loading) return <p>Carregando dados do gráfico...</p>;
  if (error) return <p>Erro ao carregar dados: {error.message}</p>;

  // Opções de configuração para o gráfico de barras
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Receita Mensal',
      },
    },
  };

  // Formata os dados da API para o formato que o Chart.js espera
  const data: ChartData<'bar'> = {
    labels: revenueData?.map(d => d.month) ||,
    datasets:,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;