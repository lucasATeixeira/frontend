import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const BarChart = ({ orcamento, simulacao, patrimonios }) => {
  const [barData, setBarData] = useState({});
  useEffect(() => {
    setBarData({
      labels: ['Orçado', 'Simulado'],
      datasets: [
        {
          label: 'Recebimentos',
          data: [
            orcamento.recebimentosOrcados,
            orcamento.recebimentosOrcados + simulacao.recebimentos,
          ],
          backgroundColor: 'transparent',
          borderColor: 'rgb(63, 76, 107)',
          borderWidth: 3,
          yAxisID: 'right',
        },
        {
          label: 'Dívidas',
          data: [patrimonios.passivos.pmt, patrimonios.passivos.pmt + simulacao.pmt],
          backgroundColor: 'rgb(218, 68, 83)',
          borderColor: 'transparent',
          borderWidth: 3,
        },
        {
          label: 'Gastos',
          data: [orcamento.gastosOrcados, orcamento.gastosOrcados + simulacao.gastos],
          backgroundColor: 'rgb(0, 87, 156)',
          borderColor: 'transparent',
          borderWidth: 3,
        },
      ],
    });
  }, [patrimonios, orcamento, simulacao]);
  return (
    <Bar
      height={220}
      redraw
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
                max: orcamento.gastosOrcados + patrimonios.passivos.pmt,
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
                max: orcamento.gastosOrcados + patrimonios.passivos.pmt,
                callback(value) {
                  return value.toLocaleString('pt-BR');
                },
              },
            },
          ],
        },
      }}
    />
  );
};

BarChart.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  patrimonios: PropTypes.shape().isRequired,
  orcamento: PropTypes.shape().isRequired,
};

export default BarChart;
