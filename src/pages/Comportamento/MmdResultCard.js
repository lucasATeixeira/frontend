import React from 'react';
import { Doughnut, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function MmdResultCard({ mmd }) {
  const [firstMmd] = [
    { score: mmd.conjuntural, cat: 'conjuntural' },
    { score: mmd.estrutural, cat: 'estrutural' },
    { score: mmd.oportunidade, cat: 'oportunidade' },
  ].sort((a, b) => (a.score > b.score ? -1 : 1));

  const [firstHigher, secondHigher] = [
    { score: mmd.esperanca, cat: 'esperanca' },
    { score: mmd.reatividade, cat: 'reatividade' },
    { score: mmd.inseguranca, cat: 'inseguranca' },
    { score: mmd.carenciaEmocional, cat: 'carencia emocional' },
    { score: mmd.insatisfacaoPessoal, cat: 'insatisfação pessoal' },
    { score: mmd.identificacaoExterna, cat: 'identificação externa' },
    { score: mmd.negligencia, cat: 'negligencia' },
    { score: mmd.impulsividade, cat: 'impulsividade' },
    { score: mmd.otimismo, cat: 'otimismo' },
  ].sort((a, b) => (a.score > b.score ? -1 : 1));

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
    labels: [
      firstHigher.cat.toLocaleUpperCase(),
      secondHigher.cat.toUpperCase(),
    ],
    datasets: [
      {
        label: 'Dois Maiores resultados',
        data: [firstHigher.score.toFixed(2), secondHigher.score.toFixed(2)],
        backgroundColor: ['rgba(29, 233, 182, 0.4)', 'rgba(29, 233, 182, 0.2)'],
        borderColor: ['rgb(29, 233, 182)', 'rgb(29, 233, 182)'],
        borderWidth: 1,
      },
    ],
  };

  const pizzaOptions = {
    legend: {
      position: 'bottom',
    },
    // tooltips: {
    //   callbacks: {
    //     label(data, data2) {
    //       return data;
    //     },
    //   },
    // },
  };

  const pizzaData = {
    labels: ['GRAU DE ENDIVIDAMENTO', '-'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [Math.round(mmd.total * 100), 100 - Math.round(mmd.total * 100)],
        backgroundColor: ['rgb(29, 233, 182)', 'rgb(255, 255, 255)'],
        borderColor: ['#eee', '#eee'],
      },
    ],
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">MMD - {mmd.name}</h3>
        <h4 className="card-title">
          <strong> Tipo de dívida: {firstMmd.cat.toUpperCase()}</strong>
        </h4>
        <h4 className="card-title">
          <strong> Motivação: {firstHigher.cat.toUpperCase()}</strong>
        </h4>
        <h4 className="card-title">
          <strong>Grau de Endividamento: {Math.round(mmd.total * 100)}%</strong>
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
              to={`/laudos?result=${firstMmd.cat}`}
              className="btn btn-info btn-sm pull-left"
            >
              Ver Laudo {firstMmd.cat}
            </Link>
            <Link
              to={`/laudos?result=${firstHigher.cat}`}
              className="btn btn-info btn-sm pull-right"
            >
              Ver Laudo {firstHigher.cat}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

MmdResultCard.propTypes = {
  mmd: PropTypes.shape().isRequired,
};
