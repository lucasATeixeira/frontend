import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CurrencyInput from 'react-currency-input';
import PropTypes from 'prop-types';
import { Creators as SimulacaoActions } from '../../../../../store/ducks/simulacao';

const TableVendas = ({ simulacao, saveSimulation }) => {
  const [newVenda, setNewVenda] = useState(false);
  const [nomeAtivo, setNomeAtivo] = useState('');
  const [valor, setValor] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    simulacao.currentSimulation.patrimonios.push({ nome: nomeAtivo, valor });
    saveSimulation(simulacao.currentSimulation);
    setNewVenda(false);
  };
  const handleDelete = (p) => {
    saveSimulation({
      ...simulacao.currentSimulation,
      patrimonios: simulacao.currentSimulation.patrimonios.filter(e => e !== p),
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header card-header-text card-header-success">
            <div className="card-text">
              <h4 className="card-title">
                <strong>Possíveis Vendas</strong>
              </h4>
            </div>
          </div>

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
                      {simulacao.currentSimulation.patrimonios.map(p => (
                        <tr key={Math.random()}>
                          <td>{p.nome}</td>
                          <td>
                            {p.valor.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td className="td-actions text-right">
                            <button
                              onClick={() => handleDelete(p)}
                              type="button"
                              className="btn btn-danger btn-link btn-just-icon btn-sm"
                            >
                              <i className="material-icons">close</i>
                            </button>
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
                <br />
                <button
                  onClick={() => setNewVenda(true)}
                  type="button"
                  className="btn btn-success btn-sm"
                >
                  <strong>
                    <i className="material-icons">add_circle_outline</i> Adicionar Ativo
                  </strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

TableVendas.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  saveSimulation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableVendas);
