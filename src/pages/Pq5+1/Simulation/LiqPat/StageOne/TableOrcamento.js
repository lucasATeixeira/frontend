import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as SimulacaoActions } from '../../../../../store/ducks/simulacao';

const TableOrcamento = ({ simulacao, saveSimulation, categorias }) => {  
  const handleChange = (i, checked) => {
    if (checked) {
      saveSimulation({
        ...simulacao.currentSimulation,
        itensRemovidos: simulacao.currentSimulation.itensRemovidos.filter(e => e._id !== i._id),
      });
    }
    if (!checked) {
      saveSimulation({
        ...simulacao.currentSimulation,
        itensRemovidos: [...simulacao.currentSimulation.itensRemovidos, i],
      });
    }
  };
  return (
    <>
      <div className="card">
        <div className="card-header card-header-text card-header-info">
          <div className="card-text">
            <h4 className="card-title">
              <strong>Orcamento</strong>
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
                      <th className="text-info">
                        <strong>Categoria</strong>
                      </th>
                      <th className="text-info">
                        <strong>Item</strong>
                      </th>
                      <th className="text-info">
                        <strong>Valor Mensal</strong>
                      </th>
                      <th className="text-right text-info">
                        <strong>Actions</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulacao.currentSimulation.checked
                      ? simulacao.currentSimulation.checked.categoria
                        ? categorias
                          .filter(a => simulacao.currentSimulation.checked.categoria.includes(
                            a.classificacao,
                          ))
                          .filter(
                            ab => !simulacao.itensRemovidos.map(i => i.categoria).includes(ab._id),
                          )
                          .map(c => c.itens.map(i => (
                            <tr key={i._id}>
                              <td>{c.nome}</td>
                              <td>{i.nome}</td>
                              <td>
                                {i.mensal.toLocaleString('pt-br', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })}
                              </td>
                              <td className="td-actions text-right">
                                <div className="form-check">
                                  <label htmlFor={i._id} className="form-check-label">
                                    <input
                                      id={i._id}
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={simulacao.currentSimulation.itensRemovidos.includes(
                                        i,
                                      )}
                                      onChange={() => handleChange(
                                        i,
                                        simulacao.currentSimulation.itensRemovidos.includes(
                                          i,
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
                          )))
                        : categorias.map(c => c.itens.map(i => (
                          <tr key={i._id}>
                            <td>{c.nome}</td>
                            <td>{i.nome}</td>
                            <td>
                              {i.mensal.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td className="td-actions text-right">
                              <div className="form-check">
                                <label htmlFor={i._id} className="form-check-label">
                                  <input
                                    id={i._id}
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={simulacao.currentSimulation.itensRemovidos.includes(
                                      i,
                                    )}
                                    onChange={() => handleChange(
                                      i,
                                      simulacao.currentSimulation.itensRemovidos.includes(i),
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
                        )))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TableOrcamento.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  saveSimulation: PropTypes.func.isRequired,
  categorias: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
  categorias: state.categorias.categorias,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableOrcamento);
