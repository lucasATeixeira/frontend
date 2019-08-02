/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import CurrencyInput from 'react-currency-input';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';

const CardTwo = ({ simulacao, saveSimulation, passivos }) => {
  const { currentSimulation } = simulacao;
  const [valor, setValor] = useState(0);
  const [input, setInput] = useState('');
  const [currentDivida, setCurrentDivida] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if (currentSimulation.saldo < valor) {
      return toast.error('Você não tem saldo suficente para amortizar este valor!', {
        containerId: 'alerts',
      });
    }
    if (valor >= currentDivida.aVista) {
      return toast.error(
        'O valor a se amortizar é igual ou superior ao saldo à vista da quitação, que tal quitar a dívida?',
      );
    }

    const j = currentDivida.taxa / 100;

    const q = currentDivida.aVista - valor;

    const n = currentDivida.parcelas;

    const newPmt = q / ((1 - (1 + j) ** -n) / j);

    const newTotal = newPmt * n;

    const pmtDiff = newPmt - currentDivida.pmt;

    const totalDiff = newTotal - currentDivida.total;

    if (currentSimulation.amortizacao.find(a => a.divida === input)) {
      saveSimulation({
        ...currentSimulation,
        patrimoniosRemovidos: currentSimulation.patrimoniosRemovidos.filter(pr => pr._id !== input),
        saldo:
          currentSimulation.saldo
          + currentSimulation.amortizacao
            .filter(a => a.divida === input)
            .reduce((total, next) => total + next.valor, 0)
          - valor
          + (currentSimulation.patrimoniosRemovidos.find(a => a._id === input)
            ? currentDivida.aVista
            : 0),
        amortizacao: currentSimulation.amortizacao
          .filter(a => !(a.divida === input && valor === 0))
          .map((a) => {
            if (a.divida !== input) return a;
            return {
              ...a,
              valor,
              pmtDiff,
              newPmt,
              newTotal,
              totalDiff,
              newAVista: q,
            };
          }),
      });
    } else {
      saveSimulation({
        ...currentSimulation,
        patrimoniosRemovidos: currentSimulation.patrimoniosRemovidos.filter(pr => pr._id !== input),
        saldo:
          currentSimulation.saldo
          - valor
          + (currentSimulation.patrimoniosRemovidos.find(a => a._id === input)
            ? currentDivida.aVista
            : 0),
        amortizacao: [
          ...currentSimulation.amortizacao,
          {
            divida: input,
            valor,
            pmtDiff,
            newPmt,
            newTotal,
            totalDiff,
            newAVista: q,
          },
        ],
      });
    }

    setCurrentDivida({});
    setInput('');
    setValor(0);
    return null;
  }

  const handleKeyUp = (e) => {
    if (e.keyCode !== 27) return;
    setValor(0);
    setCurrentDivida({});
    setInput('');
  };

  function handleAmortizacao(e, mv, fv) {
    // if (currentSimulation.saldo < valor) {
    //   return toast.error('Você não tem saldo suficente para amortizar este valor!', {
    //     containerId: 'alerts',
    //   });
    // }
    return setValor(fv);
  }

  const handleChange = (p, checked) => {
    if (checked) {
      saveSimulation({
        ...currentSimulation,
        patrimoniosRemovidos: currentSimulation.patrimoniosRemovidos.filter(pr => pr._id !== p._id),
        saldo:
          currentSimulation.saldo
          + p.aVista
          + (currentSimulation.amortizacao.find(a => a.divida === p._id)
            ? currentSimulation.amortizacao.reduce((total, next) => {
              if (next.divida !== p._id) return total + 0;
              return total + next.valor;
            }, 0)
            : 0),
        amortizacao: currentSimulation.amortizacao.filter(a => a.divida !== p._id),
      });
      return;
    }
    if (!checked) {
      if (currentSimulation.saldo < p.aVista) {
        toast.error(
          'Você não tem saldo suficente para quitar esta dívida, tente amortizar ou salve está estratégia para acumular saldo com as próximas!',
          { containerId: 'alerts' },
        );
        return;
      }
      saveSimulation({
        ...currentSimulation,
        patrimoniosRemovidos: [...currentSimulation.patrimoniosRemovidos, p],
        saldo:
          currentSimulation.saldo
          - p.aVista
          + (currentSimulation.amortizacao.find(a => a.divida === p._id)
            ? currentSimulation.amortizacao.reduce((total, next) => {
              if (next.divida !== p._id) return total + 0;
              return total + next.valor;
            }, 0)
            : 0),
        amortizacao: currentSimulation.amortizacao.filter(a => a.divida !== p._id),
      });
    }
  };
  return (
    <div className="card">
      <ToastContainer />
      <ToastContainer />
      <div className="card-header card-header-text card-header-danger">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Dívidas</strong>
          </h4>
        </div>
      </div>

      <div className="card-body">
        <ReactTooltip id="amortizar">Amortizar</ReactTooltip>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <form onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-danger">
                        <strong>Passivo</strong>
                      </th>
                      <th className="text-danger">
                        <strong>Valor Parcela</strong>
                      </th>
                      <th className="text-danger">
                        <strong>P. Restantes</strong>
                      </th>
                      <th className="text-danger">
                        <strong>Taxa</strong>
                      </th>
                      <th className="text-danger">
                        <strong>Total</strong>
                      </th>
                      <th className="text-danger">
                        <strong>Quitação à vista</strong>
                      </th>
                      <th className="text-danger">
                        <strong>Amortização</strong>
                      </th>
                      <th className="text-right text-danger">
                        <strong>Quitar</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {passivos
                      .filter(
                        p => !simulacao.patrimoniosRemovidos.map(pr => pr._id).includes(p._id),
                      )
                      .map((p) => {
                        const actualP = simulacao.amortizacao
                          .filter(a => a.divida === p._id)
                          .sort((a, b) => (a.newTotal > b.newTotal ? -1 : 1))[0];
                        if (actualP) {
                          p = {
                            ...p,
                            total: actualP.newTotal,
                            pmt: actualP.newPmt,
                            aVista: actualP.newAVista,
                          };
                        }
                        return (
                          <tr key={p._id}>
                            <td>{p.nome}</td>
                            <td>
                              {p.pmt.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td>{p.parcelas}</td>
                            <td>{p.taxa}%</td>
                            <td>
                              {p.total.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td>
                              {p.aVista.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td>
                              {input === p._id ? (
                                <span className="bmd-form-group">
                                  <CurrencyInput
                                    className="form-control"
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    precision="2"
                                    prefix="R$"
                                    value={valor}
                                    onChangeEvent={handleAmortizacao}
                                  />
                                </span>
                              ) : (
                                <>
                                  {currentSimulation.amortizacao
                                    .filter(a => a.divida === p._id)
                                    .reduce((total, next) => total + next.valor, 0)
                                    .toLocaleString('pt-br', {
                                      style: 'currency',
                                      currency: 'BRL',
                                    })}
                                  <button
                                    onClick={() => {
                                      if (input !== '') {
                                        return toast.error('Salve a última Edição', {
                                          containerId: 'alerts',
                                        });
                                      }
                                      setValor(
                                        currentSimulation.amortizacao
                                          .filter(a => a.divida === p._id)
                                          .reduce((total, next) => total + next.valor, 0)
                                          .toLocaleString('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL',
                                          }),
                                      );
                                      setCurrentDivida(p);
                                      return setInput(p._id);
                                    }}
                                    type="button"
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <i className="fa fa-pencil small" />
                                  </button>
                                </>
                              )}
                            </td>
                            <td
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                              }}
                            >
                              <div className="form-check">
                                <label htmlFor={p._id} className="form-check-label">
                                  <input
                                    id={p._id}
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={simulacao.currentSimulation.patrimoniosRemovidos.includes(
                                      p,
                                    )}
                                    onChange={() => handleChange(
                                      p,
                                      simulacao.currentSimulation.patrimoniosRemovidos.includes(
                                        p,
                                      ),
                                    )
                                    }
                                  />
                                  <span className="form-check-sign">
                                    <span className="check" />
                                  </span>
                                </label>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardTwo.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  saveSimulation: PropTypes.func.isRequired,
  passivos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
  passivos: state.patrimonios.passivos.list,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardTwo);
