import React from 'react';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

export default function CrencaResultCard({ crenca }) {
  const [firstHigher, secondHigher] = [
    { score: crenca.ambiente, cat: 'ambiente' },
    { score: crenca.causaEfeito, cat: 'cause e efeito' },
    { score: crenca.capacidade, cat: 'capacidade' },
    { score: crenca.valor, cat: 'valor' },
    { score: crenca.identidade, cat: 'identidade' },
    { score: crenca.pertencimento, cat: 'pertencimento' },
    { score: crenca.espiritualidade, cat: 'espiritualidade' },
  ]
    .sort((a, b) => (a.score > b.score ? -1 : 1))
    .slice(0, 3);

  const barOptions = {
    tooltips: {
      callbacks: {
        label(tooltipItem) {
          return `${tooltipItem.xLabel}%`;
        },
      },
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            callback(value) {
              return `${value}%`;
            },
          },
        },
      ],
    },
  };

  const barData = {
    labels: [firstHigher.cat.toLocaleUpperCase(), secondHigher.cat.toUpperCase()],
    datasets: [
      {
        label: 'Dois Maiores resultados',
        data: [65, 59],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 132)'],
        borderWidth: 1,
      },
    ],
  };

  const pizzaOptions = {
    legend: {
      position: 'bottom',
    },
  };

  const pizzaData = {
    labels: [firstHigher.cat.toUpperCase(), 'RESTANTE'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [firstHigher.score, 100 - firstHigher.score],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 255, 255)'],
        borderColor: ['#eee', '#eee'],
      },
    ],
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">
          Resultado do questionário de Crença: <strong>{crenca.cat.toUpperCase()}</strong>
        </h4>

        <button type="button" className="btn btn-info btn-sm">
          Ver Laudo
        </button>
      </div>
      <div className="card-body">
        {/* <ProgressBar resultContent={firstHigher} />
        <ProgressBar resultContent={secondHigher} /> */}
        <div className="row">
          <div className="col-md-6">
            <HorizontalBar data={barData} options={barOptions} />
          </div>
          <div className="col-md-6">
            <Doughnut data={pizzaData} options={pizzaOptions} />
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}

CrencaResultCard.propTypes = {
  crenca: PropTypes.shape().isRequired,
};
