import React from 'react';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CrencaResultCard({ crenca }) {
  const [firstHigher, secondHigher] = [
    { score: crenca.ambiente, cat: 'ambiente' },
    { score: crenca.causaEfeito, cat: 'causa e efeito' },
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
    labels: [
      firstHigher.cat.toLocaleUpperCase(),
      secondHigher.cat.toUpperCase(),
    ],
    datasets: [
      {
        label: 'Dois Maiores resultados',
        data: [Math.round(firstHigher.score), Math.round(secondHigher.score)],
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
    labels: [firstHigher.cat.toUpperCase(), '-'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [
          Math.round(firstHigher.score),
          100 - Math.round(firstHigher.score),
        ],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 255, 255)'],
        borderColor: ['#eee', '#eee'],
      },
    ],
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">CRENÇA - {crenca.name}</h3>
        <h4 className="card-title">
          <strong>Resultado: {crenca.cat.toUpperCase()}</strong>
        </h4>
        <h4 className="card-title">
          <strong>
            {' '}
            Grau de crença limitante: {Math.round(firstHigher.score)}%
          </strong>
        </h4>
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
        <div className="row">
          <div className="col-md-12">
            <Link
              to={`/laudos?result=${crenca.cat}`}
              className="btn btn-info btn-sm"
            >
              Ver Laudo {firstHigher.cat}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

CrencaResultCard.propTypes = {
  crenca: PropTypes.shape().isRequired,
};
