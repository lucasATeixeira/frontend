import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Pote = ({ orcamento, patrimonios }) => {
  const [barData, setBarData] = useState({});
  const [gastosData, setGastosData] = useState(false);
  const maxOrcado = orcamento.gastosOrcados
    + orcamento.recebimentosOrcados
    + orcamento.gastosRealizadosParcelados
    + patrimonios.passivos.pmt;
  const maxRealizado = orcamento.gastosRealizados
    + orcamento.recebimentosRealizados
    + orcamento.gastosRealizadosParcelados
    + patrimonios.passivos.pmt;
  const barOptions = {
    legend: {
      position: 'bottom',
    },
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: false,
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
  useEffect(() => {
    setBarData({
      labels: ['Orçado', 'Realizado'],
      datasets: [
        {
          label: 'Recebimentos',
          data: [
            orcamento.recebimentosOrcados + orcamento.recebimentosRealizadosParcelados,
            orcamento.recebimentosRealizados + orcamento.recebimentosRealizadosParcelados,
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
            data: [orcamento.recebimentosOrcados + orcamento.recebimentosRealizadosParcelados],
            backgroundColor: 'transparent',
            borderColor: 'rgb(63, 76, 107)',
            borderWidth: 3,
            yAxisID: 'right',
          },
          {
            label: 'Dívidas',
            data: [patrimonios.passivos.pmt + orcamento.gastosRealizadosParcelados],
            backgroundColor: 'rgb(218, 68, 83)',
            borderColor: 'transparent',
            borderWidth: 3,
          },
          {
            label: 'Gastos',
            data: [orcamento.gastosOrcados],
            backgroundColor: 'rgb(0, 87, 156)',
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
              orcamento.recebimentosOrcados + orcamento.recebimentosRealizadosParcelados,
              orcamento.recebimentosRealizados + orcamento.recebimentosRealizadosParcelados,
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
  }, [gastosData]);

  return (
    <div className="card">
      <button type="button" onClick={() => setGastosData(!gastosData)}>
        Flip
      </button>
      <div className="card-header card-header-text card-header-info">
        <div className="card-text">
          <h4 className="card-title">Pote</h4>
        </div>
      </div>
      <div className="card-body">
        <Bar height={220} data={barData} options={barOptions} />
      </div>
    </div>
  );
};

Pote.propTypes = {
  orcamento: PropTypes.shape().isRequired,
  patrimonios: PropTypes.shape().isRequired,
};

export default Pote;
