import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { Creators as SimulacaoAction } from '../../../../../store/ducks/simulacao';

const TableAtivos = ({ ativos, saveSimulation, simulacao }) => {
  const { currentSimulation } = simulacao;
  const [newVenda, setNewVenda] = useState(false);
  const [nomeAtivo, setNomeAtivo] = useState('');
  const [valor, setValor] = useState(0);
  const handleChange = (type, p) => {
    saveSimulation({
      ...simulacao.currentSimulation,
      patrimoniosRemovidos: type === 'removidos' ? [p] : [],
      patrimonios: type === 'add' ? [p] : [],
      itensRemovidos: [],
      checked: p,
      saldo: simulacao.saldo + p.valor,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.random();
    saveSimulation({
      ...simulacao.currentSimulation,
      patrimoniosRemovidos: [],
      patrimonios: [
        {
          nome: nomeAtivo,
          valor,
          _id: id,
          tipo: 'ativo',
          classificacao: 'patrimonial',
        },
      ],
      checked: {
        nome: nomeAtivo,
        valor,
        _id: id,
        tipo: 'ativo',
        classificacao: 'patrimonial',
      },
      itensRemovidos: [],
      saldo: simulacao.saldo + valor,
    });
    setNewVenda(false);
  };
  return (
    <>
      <div className="card">
        <div className="card-header card-header-text card-header-success">
          <div className="card-text">
            <h4 className="card-title">
              <strong>Patrimônios Ativos</strong>
            </h4>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-success">
                          <strong>Ativo</strong>
                        </th>
                        <th className="text-success">
                          <strong>Valor</strong>
                        </th>
                        <th className="text-right text-success">
                          <strong>Actions</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ativos
                        .filter(
                          a => !simulacao.patrimoniosRemovidos.map(pr => pr._id).includes(a._id),
                        )
                        .map(a => (
                          <tr key={a._id}>
                            <td>{a.nome}</td>
                            <td>
                              {a.valor.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td className="td-actions text-right">
                              <div className="form-check">
                                <label htmlFor={a._id} className="form-check-label">
                                  <input
                                    id={a._id}
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={currentSimulation.patrimoniosRemovidos.includes(a)}
                                    onChange={() => handleChange('removidos', a)}
                                  />
                                  <span className="form-check-sign">
                                    <span className="check" />
                                  </span>
                                </label>
                              </div>
                            </td>
                          </tr>
                        ))}
                      {simulacao.currentSimulation.patrimonios.map(p => (
                        <tr key={p._id}>
                          <td>{p.nome}</td>
                          <td>
                            {p.valor.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td className="td-actions text-right">
                            <div className="form-check">
                              <label htmlFor={p._id} className="form-check-label">
                                <input
                                  id={p._id}
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={simulacao.currentSimulation.patrimonios.includes(p)}
                                  onChange={() => handleChange('add', p)}
                                />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </label>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {newVenda && (
                        <tr>
                          <td>
                            <span className="bmd-form-group">
                              <input
                                value={nomeAtivo}
                                onChange={e => setNomeAtivo(e.target.value)}
                                type="text"
                                placeholder="Nome do Ativo"
                                className="form-control"
                              />
                            </span>
                          </td>

                          <td>
                            <span className="bmd-form-group">
                              <CurrencyInput
                                value={valor}
                                onChangeEvent={(e, mv, fv) => setValor(fv)}
                                className="form-control"
                                decimalSeparator=","
                                thousandSeparator="."
                                precision="2"
                                prefix="R$"
                              />
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success btn-link btn-just-icon btn-sm"
                            >
                              <i className="material-icons">add_circle_outline</i>
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <br />
                <button
                  onClick={() => setNewVenda(true)}
                  type="button"
                  className="btn btn-success btn-sm"
                >
                  <strong>
                    <i className="material-icons">add_circle_outline</i> Adicionar Ativo
                  </strong>
                </button> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

TableAtivos.propTypes = {
  ativos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveSimulation: PropTypes.func.isRequired,
  simulacao: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  ativos: state.patrimonios.ativos.list,
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoAction, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableAtivos);
