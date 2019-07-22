import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Radar } from 'react-chartjs-2';

const RealRadar = ({ patrimonios }) => {
  const [radarData, setRadarData] = useState({});

  useEffect(() => {
    setRadarData({
      labels: ['', '', '', '', '', '', '', ''],
      datasets: [
        {
          backgroundColor: 'rgba(29, 233, 182, 1)',
          data: [
            patrimonios.ativos.total,
            patrimonios.ativos.total,
            patrimonios.ativos.total,
            patrimonios.ativos.total,
            patrimonios.ativos.total,
            patrimonios.ativos.total,
            patrimonios.ativos.total,
            patrimonios.ativos.total,
          ],
          label: `Ativos: ${patrimonios.ativos.total.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}`,
        },
        {
          backgroundColor: 'rgba(218, 68, 83, 1)',
          data: [
            patrimonios.passivos.total,
            patrimonios.passivos.total,
            patrimonios.passivos.total,
            patrimonios.passivos.total,
            patrimonios.passivos.total,
            patrimonios.passivos.total,
            patrimonios.passivos.total,
            patrimonios.passivos.total,
          ],
          label: `Passivos: ${patrimonios.passivos.total.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}`,
        },
      ].sort((a, b) => (a.data[0] > b.data[0] ? 1 : -1)),
    });
  }, [patrimonios]);
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

RealRadar.propTypes = {
  patrimonios: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  patrimonios: state.patrimonios,
});

export default connect(mapStateToProps)(RealRadar);
