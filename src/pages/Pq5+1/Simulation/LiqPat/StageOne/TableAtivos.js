import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as SimulacaoAction } from '../../../../../store/ducks/simulacao';

const TableAtivos = ({ ativos, saveSimulation, simulacao }) => {
  const handleChange = (id, checked) => {
    if (!checked) {
      simulacao.currentSimulation.patrimoniosRemovidos.push(id);
      saveSimulation(simulacao.currentSimulation);
    }
    if (checked) {
      saveSimulation({
        ...simulacao.currentSimulation,
        patrimoniosRemovidos: simulacao.currentSimulation.patrimoniosRemovidos.filter(
          e => e !== id,
        ),
      });
    }
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
                      .filter(a => !simulacao.patrimoniosRemovidos.includes(a._id))
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
                                  checked={simulacao.currentSimulation.patrimoniosRemovidos.includes(
                                    a._id,
                                  )}
                                  onChange={() => handleChange(
                                    a._id,
                                    simulacao.currentSimulation.patrimoniosRemovidos.includes(
                                      a._id,
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
                      ))}
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
