import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Pote = ({ orcamento, patrimonios }) => {
  const [barData, setBarData] = useState({});
  const [gastosData, setGastosData] = useState(false);
  const maxOrcado =
    orcamento.gastosOrcados +
    orcamento.recebimentosOrcados +
    orcamento.gastosRealizadosParcelados +
    patrimonios.passivos.pmt;

  const maxRealizado =
    orcamento.gastosRealizados +
    orcamento.recebimentosRealizados +
    orcamento.gastosRealizadosParcelados +
    patrimonios.passivos.pmt;

  const barOptions = {
    legend: {
      position: 'bottom',
    },
    responsive: true,
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
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],

      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            max: maxOrcado > maxRealizado ? maxOrcado : maxRealizado,
            callback(value) {
              return value.toLocaleString('pt-BR');
            },
          },
        },
        {
          id: 'right',
          position: 'right',
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            max: maxOrcado > maxRealizado ? maxOrcado : maxRealizado,
            callback(value) {
              return value.toLocaleString('pt-BR');
            },
          },
        },
      ],
    },
  };

  const itens = orcamento.categorias
    .reduce((total, next) => total.concat(next.itens), [])
    .filter(item => item.tipo === 'gasto');

  const gastosComprometidos = itens
    .filter(item => item.classificacao === 'Comprometido')
    .reduce((total, next) => total + next.mensal, 0);
  const gastosFlexiveis = itens
    .filter(item => item.classificacao === 'Flexível')
    .reduce((total, next) => total + next.mensal, 0);
  const gastosEventuais = itens
    .filter(item => item.classificacao === 'Eventual')
    .reduce((total, next) => total + next.mensal, 0);

  useEffect(() => {
    setBarData({
      labels: ['Orçado', 'Realizado'],
      datasets: [
        {
          label: 'Recebimentos',
          data: [
            orcamento.recebimentosOrcados +
              orcamento.recebimentosRealizadosParcelados,
            orcamento.recebimentosRealizados +
              orcamento.recebimentosRealizadosParcelados,
          ],
          backgroundColor: 'transparent',
          borderColor: 'rgb(63, 76, 107)',
          borderWidth: 3,
          yAxisID: 'right',
        },
        {
          label: 'Dívidas',
          data: [
            patrimonios.passivos.pmt + orcamento.gastosRealizadosParcelados,
            patrimonios.passivos.pmt + orcamento.gastosRealizadosParcelados,
          ],
          backgroundColor: 'rgb(218, 68, 83)',
          borderColor: 'transparent',
          borderWidth: 3,
        },
        {
          label: 'Gastos',
          data: [orcamento.gastosOrcados, orcamento.gastosRealizados],
          backgroundColor: 'rgb(0, 87, 156)',
          borderColor: 'transparent',
          borderWidth: 3,
        },
      ],
    });
  }, [orcamento, patrimonios]);

  useEffect(() => {
    if (gastosData) {
      setBarData({
        labels: ['Orçado'],
        datasets: [
          {
            label: 'Recebimentos',
            data: [
              orcamento.recebimentosOrcados +
                orcamento.recebimentosRealizadosParcelados,
            ],
            backgroundColor: 'transparent',
            borderColor: 'rgb(63, 76, 107)',
            borderWidth: 3,
            yAxisID: 'right',
          },
          {
            label: 'Dívidas',
            data: [
              patrimonios.passivos.pmt + orcamento.gastosRealizadosParcelados,
            ],
            backgroundColor: 'rgb(218, 68, 83)',
            borderColor: 'transparent',
            borderWidth: 3,
          },
          {
            label: 'Comprometidos',
            data: [gastosComprometidos],
            backgroundColor: 'rgb(0, 87, 156)',
            borderColor: 'transparent',
            borderWidth: 3,
          },
          {
            label: 'Flexíveis',
            data: [gastosFlexiveis],
            backgroundColor: '#4DA9FF',
            borderColor: 'transparent',
            borderWidth: 3,
          },
          {
            label: 'Eventuais',
            data: [gastosEventuais],
            backgroundColor: '#73C0FF',
            borderColor: 'transparent',
            borderWidth: 3,
          },
        ],
      });
    } else {
      setBarData({
        labels: ['Orçado', 'Realizado'],
        datasets: [
          {
            label: 'Recebimentos',
            data: [
              orcamento.recebimentosOrcados +
                orcamento.recebimentosRealizadosParcelados,
              orcamento.recebimentosRealizados +
                orcamento.recebimentosRealizadosParcelados,
            ],
            backgroundColor: 'transparent',
            borderColor: 'rgb(63, 76, 107)',
            borderWidth: 3,
            yAxisID: 'right',
          },
          {
            label: 'Dívidas',
            data: [
              patrimonios.passivos.pmt + orcamento.gastosRealizadosParcelados,
              patrimonios.passivos.pmt + orcamento.gastosRealizadosParcelados,
            ],
            backgroundColor: 'rgb(218, 68, 83)',
            borderColor: 'transparent',
            borderWidth: 3,
          },
          {
            label: 'Gastos',
            data: [orcamento.gastosOrcados, orcamento.gastosRealizados],
            backgroundColor: 'rgb(0, 87, 156)',
            borderColor: 'transparent',
            borderWidth: 3,
          },
        ],
      });
    }
  }, [
    gastosData,
    orcamento.gastosOrcados,
    orcamento.gastosRealizados,
    orcamento.gastosRealizadosParcelados,
    orcamento.recebimentosOrcados,
    orcamento.recebimentosRealizados,
    orcamento.recebimentosRealizadosParcelados,
    patrimonios.passivos.pmt,
    gastosComprometidos,
    gastosEventuais,
    gastosFlexiveis,
  ]);

  return (
    <div className="card">
      <button
        style={{
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          position: 'relative',
          width: '40px',
          height: '40px',
          right: '-590px',
          top: '10px',
          background: 'none',
          color: '#00B4DB',
        }}
        type="button"
        onClick={() => setGastosData(!gastosData)}
      >
        <i className="material-icons">info</i>
      </button>
      <div className="card-header card-header-text card-header-info">
        <div className="card-text">
          <h4 className="card-title">Pote</h4>
        </div>
      </div>
      <div className="card-body">
        <Bar redraw height={220} data={barData} options={barOptions} />
      </div>
    </div>
  );
};

Pote.propTypes = {
  orcamento: PropTypes.shape().isRequired,
  patrimonios: PropTypes.shape().isRequired,
};

export default Pote;
