import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Pote = ({ orcamento, patrimonios }) => {
  const maxOrcado = orcamento.gastosOrcados
    + orcamento.gastosRealizadosParcelados
    + orcamento.recebimentosOrcados
    + patrimonios.passivos.pmt;
  const maxRealizado = orcamento.gastosRealizados
    + orcamento.gastosRealizadosParcelados
    + orcamento.recebimentosRealizados
    + patrimonios.passivos.pmt;

  const [barData, setBarData] = useState({});
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
            patrimonios.passivos.pmt,
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

  return (
    <div className="card">
      <div className="card-header card-header-text card-header-info">
        <div className="card-text">
          <h4 className="card-title">Pote</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="text-center">
          <b>Avanço: Realizado / Orçado</b>
        </div>
        <Bar
          height={220}
          data={barData}
          options={{
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
          }}
        />
      </div>
    </div>
  );
};

Pote.propTypes = {
  orcamento: PropTypes.shape().isRequired,
  patrimonios: PropTypes.shape().isRequired,
};

export default Pote;
