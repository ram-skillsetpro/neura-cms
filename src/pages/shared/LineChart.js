import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const LineChart = ({data}) => {
  const labels = Object.keys(data);
  const dataValues = Object.values(data);

  // Chart data configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      x: {
        type: 'category',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  return (
      <Line data={chartData} options={options} />
  );
};

export default LineChart;
