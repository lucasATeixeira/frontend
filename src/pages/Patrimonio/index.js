import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Radar, Bar } from 'react-chartjs-2';

import BlankPage from '../../components/BlankPage';
import HeaderText from './HeaderText';
import TableAtivos from './TableAtivos';
import TablePassivos from './TablePassivos';

const Patrimonio = ({ patrimonios }) => {
  const [radarData, setRadarData] = useState({});
  const [barData, setBarData] = useState({});

  useEffect(() => {
    setBarData({
      labels: ['Patrimônio'],
      datasets: [
        patrimonios.ativos.list.map(a => ({
          backgroundColor: 'rgba(29, 233, 182, 1)',
          label: a.nome,
          data: [a.valor],
        })),
        patrimonios.passivos.list.map(p => ({
          backgroundColor: 'rgba(218, 68, 83, 1)',
          label: p.nome,
          data: [-1 * p.total],
        })),
      ]
        .flat(1)
        .sort((a, b) => (a.data[0] < b.data[0] ? 1 : -1)),
    });
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
          label: `Passivos: ${patrimonios.passivos.total.toLocaleString(
            'pt-br',
            {
              style: 'currency',
              currency: 'BRL',
            }
          )}`,
        },
      ].sort((a, b) => (a.data[0] > b.data[0] ? 1 : -1)),
    });
  }, [patrimonios]);
  return (
    <BlankPage>
      <>
        <div className="row">
          <div className="col-md-6">
            <HeaderText
              color="success"
              title="Ativos Patrimoniais"
              total={patrimonios.ativos.sumAtivosPatrimoniais}
            >
              <TableAtivos
                classificacao="patrimonial"
                list={patrimonios.ativos.list.filter(
                  a => a.classificacao === 'patrimonial'
                )}
              />
            </HeaderText>
          </div>
          <div className="col-md-6">
            <HeaderText
              color="success"
              title="Ativos Financeiros"
              total={patrimonios.ativos.sumAtivosFinanceiros}
            >
              <TableAtivos
                classificacao="financeiro"
                list={patrimonios.ativos.list.filter(
                  a => a.classificacao === 'financeiro'
                )}
              />
            </HeaderText>
          </div>
        </div>
        <br />
        <br />
        <br />

        <div className="row">
          <div className="col-md-12">
            <HeaderText
              color="danger"
              title="Passivos Patrimoniais"
              total={patrimonios.passivos.sumPassivosPatrimoniais}
            >
              <TablePassivos
                classificacao="patrimonial"
                list={patrimonios.passivos.list.filter(
                  a => a.classificacao === 'patrimonial'
                )}
              />
            </HeaderText>
          </div>
        </div>
        <br />
        <br />
        <br />

        <div className="row">
          <div className="col-md-12">
            <HeaderText
              color="danger"
              title="Passivos Financeiros"
              total={patrimonios.passivos.sumPassivosFinanceiros}
            >
              <TablePassivos
                classificacao="financeiro"
                list={patrimonios.passivos.list.filter(
                  a => a.classificacao === 'financeiro'
                )}
              />
            </HeaderText>
          </div>
        </div>
        <br />
        <br />
        <br />

        <div className="row">
          <div className="col-md-6">
            <HeaderText
              color="grafit"
              title="Patrimônio Líquido"
              total={patrimonios.patrimonioLiquido}
            >
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
            </HeaderText>
          </div>
          <div className="col-md-6">
            <HeaderText
              showTotal={false}
              color="grafit"
              title="Ativos e Passivos"
            >
              <Bar
                redraw
                data={barData}
                options={{
                  legend: {
                    display: false,
                  },
                  scales: {
                    xAxes: [
                      {
                        categoryPercentage: 0.9,
                        barPercentage: 0.7,
                      },
                    ],
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                          callback(value) {
                            return value.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            });
                          },
                        },
                      },
                    ],
                  },
                }}
              />
            </HeaderText>
          </div>
        </div>
      </>
    </BlankPage>
  );
};

Patrimonio.propTypes = {
  patrimonios: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  patrimonios: state.patrimonios,
});

export default connect(mapStateToProps)(Patrimonio);
