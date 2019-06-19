import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const RadarChart = ({ simulacao, orcamento, patrimonios }) => {
  const [radarData, setRadarData] = useState({});
  useEffect(() => {
    setRadarData({
      labels: ['', '', '', '', '', '', '', ''],
      datasets: [
        {
          backgroundColor: 'rgba(29, 233, 182, 1)',
          data: [
            patrimonios.ativos.total + simulacao.ativos + simulacao.saldo,
            patrimonios.ativos.total + simulacao.ativos + simulacao.saldo,
            patrimonios.ativos.total + simulacao.ativos + simulacao.saldo,
            patrimonios.ativos.total + simulacao.ativos + simulacao.saldo,
            patrimonios.ativos.total + simulacao.ativos + simulacao.saldo,
            patrimonios.ativos.total + simulacao.ativos + simulacao.saldo,
            patrimonios.ativos.total + simulacao.ativos + simulacao.saldo,
            patrimonios.ativos.total + simulacao.ativos + simulacao.saldo,
          ],
          label: `Ativos: ${(
            patrimonios.ativos.total
            + simulacao.ativos
            + simulacao.saldo
          ).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}`,
        },
        {
          backgroundColor: 'rgba(218, 68, 83, 1)',
          data: [
            patrimonios.passivos.total + simulacao.passivos,
            patrimonios.passivos.total + simulacao.passivos,
            patrimonios.passivos.total + simulacao.passivos,
            patrimonios.passivos.total + simulacao.passivos,
            patrimonios.passivos.total + simulacao.passivos,
            patrimonios.passivos.total + simulacao.passivos,
            patrimonios.passivos.total + simulacao.passivos,
            patrimonios.passivos.total + simulacao.passivos,
          ],
          label: `Passivos: ${(patrimonios.passivos.total + simulacao.passivos).toLocaleString(
            'pt-br',
            {
              style: 'currency',
              currency: 'BRL',
            },
          )}`,
        },
      ].sort((a, b) => (a.data[0] > b.data[0] ? 1 : -1)),
    });
  }, [patrimonios, orcamento, simulacao]);

  return (
    <Radar
      data={radarData}
      options={{
        tooltips: {
          callbacks: {
            label(tooltipItem) {
              return tooltipItem.yLabel.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
        scale: {
          ticks: {
            beginAtZero: true,
            display: false,
          },
        },
      }}
    />
  );
};

RadarChart.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  patrimonios: PropTypes.shape().isRequired,
  orcamento: PropTypes.shape().isRequired,
};

export default RadarChart;
