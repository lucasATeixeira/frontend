import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SimulacaoActions } from '../../../../store/ducks/simulacao';
import Meta from './Meta';

const Two = ({
  listData, saveSimulation, simulacao, submitSimulationRequest,
}) => {
  const { currentSimulation } = simulacao;

  const [list, setList] = useState(listData.map(l => ({ ...l, valorEnxugado: l.orcado })));
  const [input, setInput] = useState('');
  const [inputValue, setInputValue] = useState(0);

  const handleSubmit = (e, item) => {
    e.preventDefault();
    setList(
      list.map((l) => {
        if (l._id !== item._id) return l;
        return {
          ...l,
          valorEnxugado: inputValue,
        };
      }),
    );
    setInput('');

    if (currentSimulation.enxugar.find(enx => enx._id === item._id)) {
      if (item.orcado === inputValue) {
        saveSimulation({
          ...currentSimulation,
          enxugar: currentSimulation.enxugar.filter(enxugar => enxugar._id !== item._id),
        });
        return;
      }
      saveSimulation({
        ...currentSimulation,
        enxugar: currentSimulation.enxugar.map((enxugar) => {
          if (enxugar._id !== item._id) return enxugar;
          return {
            ...enxugar,
            valorEnxugado: inputValue,
          };
        }),
      });
      return;
    }

    if (item.orcado === inputValue) return;

    saveSimulation({
      ...currentSimulation,
      enxugar: [
        ...currentSimulation.enxugar,
        {
          ...item,
          valorEnxugado: inputValue,
        },
      ],
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Meta />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header card-header-icon card-header-info">
              <div className="card-icon">
                <i className="material-icons">assignment</i>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="text-info">
                            <strong>Prioridade</strong>
                          </th>
                          <th className="text-info">
                            <strong>Gasto</strong>
                          </th>
                          <th className="text-info">
                            <strong>Categoria</strong>
                          </th>
                          <th className="text-info">
                            <strong>Classificação</strong>
                          </th>
                          <th className="text-info">
                            <strong>Valor Mensal</strong>
                          </th>
                          <th className="text-info">
                            <strong>Recorrência</strong>
                          </th>
                          <th className="text-info">
                            <strong>Valor Orcado</strong>
                          </th>
                          <th className="text-info text-right">
                            <strong>Valor Enxugado</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {list
                          .sort((a, b) => (a.nome > b.nome ? 1 : -1))
                          .sort((a, b) => (a.quadrante > b.quadrante ? 1 : -1))
                          .map(l => (
                            <tr key={l._id}>
                              <td>{l.quadrante}</td>
                              <td>{l.nome}</td>
                              <td>{l.nomeCategoria}</td>
                              <td>{l.classificacao}</td>
                              <td>
                                {l.mensal.toLocaleString('pt-br', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })}
                              </td>
                              <td>{l.recorrencia}</td>
                              <td>
                                {l.orcado.toLocaleString('pt-br', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })}
                              </td>
                              <td className="text-right">
                                {input === l._id ? (
                                  <span className="bmd-form-group">
                                    <span className="bmd-form-group">
                                      <form onSubmit={e => handleSubmit(e, l)}>
                                        <button
                                          style={{ position: 'absolute', right: '10px' }}
                                          type="submit"
                                          className="btn btn-success btn-round btn-sm btn-just-icon"
                                        >
                                          <i className="material-icons" role="button" tabIndex="0">
                                            done
                                          </i>
                                        </button>
                                        <CurrencyInput
                                          className="form-control"
                                          decimalSeparator=","
                                          thousandSeparator="."
                                          precision="2"
                                          prefix="R$"
                                          value={inputValue}
                                          onChangeEvent={(e, mv, fv) => setInputValue(fv)}
                                        />
                                      </form>
                                    </span>
                                  </span>
                                ) : (
                                  <>
                                    {l.valorEnxugado.toLocaleString('pt-br', {
                                      style: 'currency',
                                      currency: 'BRL',
                                    })}
                                    {'  '}
                                    <button
                                      onClick={() => {
                                        if (input !== '') {
                                          return toast.error('Salve a última Edição', {
                                            containerId: 'alerts',
                                          });
                                        }
                                        setInput(l._id);
                                        return setInputValue(l.valorEnxugado);
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
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <button
                    onClick={() => {
                      if (input !== '') return toast.error('Salve A Ultima Edição', { containerId: 'alerts' });
                      return submitSimulationRequest(currentSimulation);
                    }}
                    className="btn btn-round pull-right btn-info"
                    type="button"
                  >
                    <strong>Salvar</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Two.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveSimulation: PropTypes.func.isRequired,
  simulacao: PropTypes.shape().isRequired,
  submitSimulationRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Two);
