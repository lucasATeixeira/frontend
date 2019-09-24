import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

export default function Pote({ barData, max }) {
  const barOptions = {
    curvature: 1,
    legend: {
      display: false,
    },
    responsive: true,
    tooltips: {
      mode: 'index',
      bodySpacing: 12,
      bodyFontSize: 15,
      callbacks: {
        label({ datasetIndex, yLabel }, { datasets }) {
          return `${datasets[datasetIndex].label}: ${yLabel.toLocaleString(
            'pt-br',
            {
              style: 'currency',
              currency: 'BRL',
            }
          )}`;
        },
      },
    },
    scales: {
      xAxes: [
        {
          // display: false,
          stacked: true,
        },
      ],

      yAxes: [
        {
          display: false,
          stacked: true,
          ticks: {
            beginAtZero: true,
            max,
          },
        },
        {
          id: 'right',
          display: false,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            max,
          },
        },
      ],
    },
  };

  return <Bar redraw height={300} data={barData} options={barOptions} />;
}

Pote.propTypes = {
  barData: PropTypes.shape().isRequired,
  max: PropTypes.number.isRequired,
};
