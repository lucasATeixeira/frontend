import React from 'react';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function MmdResultCard({ mmd }) {
  const [firstHigher, secondHigher] = [
    { score: mmd.conjuntural, cat: 'conjuntural' },
    { score: mmd.estrutural, cat: 'estrutural' },
    { score: mmd.oportunidade, cat: 'oportunidade' },
    { score: mmd.esperanca, cat: 'esperanca' },
    { score: mmd.reatividade, cat: 'reatividade' },
    { score: mmd.inseguranca, cat: 'inseguranca' },
    { score: mmd.carenciaEmocional, cat: 'carenciaEmocional' },
    { score: mmd.insatisfacaoPessoal, cat: 'insatisfacaoPessoal' },
    { score: mmd.identificacaoExterna, cat: 'identificacaoExterna' },
    { score: mmd.negligencia, cat: 'negligencia' },
    { score: mmd.impulsividade, cat: 'impulsividade' },
    { score: mmd.otimismo, cat: 'otimismo' },
  ]
    .sort((a, b) => (a.score > b.score ? -1 : 1))
    .slice(0, 3);

  const barOptions = {
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
        data: [firstHigher.score, secondHigher.score],
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
    labels: ['TOTAL', 'RESTANTE'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [Math.round(mmd.total), 100 - Math.round(mmd.total)],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 255, 255)'],
        borderColor: ['#eee', '#eee'],
      },
    ],
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{mmd.name}</h3>
        <h4 className="card-title">
          Resultado do questionário de MMD: <strong>{firstHigher.cat.toUpperCase()}</strong>
        </h4>

        <Link to={`/laudos?result=${firstHigher.cat}`} className="btn btn-info btn-sm">
          Ver Laudo
        </Link>
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

MmdResultCard.propTypes = {
  mmd: PropTypes.shape().isRequired,
};
