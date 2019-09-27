/* eslint-disable no-loop-func */
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import PropTypes from 'prop-types';

export default function LineChart({ dividas }) {
  const barOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      mode: 'index',
      intersect: false,
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
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            callback(value) {
              return value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });
            },
          },
        },
      ],
    },
  };

  const barData = useMemo(() => {
    if (!dividas.length) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Valor da Parcela',
            backgroundColor: 'red',
            borderColor: 'red',
            data: [],
            fill: false,
          },
        ],
      };
    }

    const calculatedData = [];
    let i = 0;

    const { parcelas: mounthCount } = dividas.sort(
      (a, b) => b.parcelas - a.parcelas
    )[0];

    while (i < mounthCount) {
      const sumValue = dividas.reduce((total, next) => {
        if (next.parcelas >= i) return total + next.pmt;
        return total;
      }, 0);

      calculatedData.push({
        index: moment()
          .utc()
          .add(i, 'months')
          .format('MMM YY'),
        value: sumValue,
      });

      i += 1;
    }

    calculatedData.push({
      index: moment()
        .utc()
        .add(calculatedData.length + 1, 'months')
        .format('MMM YY'),
      value: 0,
    });

    return {
      labels: calculatedData.map(c => c.index),
      datasets: [
        {
          label: 'Valor da Parcela',
          backgroundColor: 'red',
          borderColor: 'red',
          data: calculatedData.map(c => c.value),
          fill: false,
        },
      ],
    };
  }, [dividas]);

  return <Line data={barData} options={barOptions} />;
}

LineChart.propTypes = {
  dividas: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
