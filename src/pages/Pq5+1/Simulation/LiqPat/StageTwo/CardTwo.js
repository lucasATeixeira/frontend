import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as SimulacaoActions } from '../../../../../store/ducks/simulacao';

const CardTwo = ({ simulacao, saveSimulation, passivos }) => {
  const { currentSimulation } = simulacao;
  const handleChange = (p, checked) => {
    if (checked) {
      saveSimulation({
        ...currentSimulation,
        patrimoniosRemovidos: currentSimulation.patrimoniosRemovidos.filter(pr => pr._id !== p._id),
        saldo: currentSimulation.saldo + p.total,
      });
      return;
    }
    if (!checked) {
      if (currentSimulation.saldo < p.total) {
        alert('Você não tem saldo suficente para quitar esta dívida');
        return;
      }
      saveSimulation({
        ...currentSimulation,
        patrimoniosRemovidos: [...currentSimulation.patrimoniosRemovidos, p],
        saldo: currentSimulation.saldo - p.total,
      });
    }
  };
  return (
    <div className="card">
      <div className="card-header card-header-text card-header-danger">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Dívidas</strong>
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
                    <th className="text-danger">
                      <strong>Passivo</strong>
                    </th>
                    <th className="text-danger">
                      <strong>PMT</strong>
                    </th>
                    <th className="text-danger">
                      <strong>P. Restantes</strong>
                    </th>
                    <th className="text-danger">
                      <strong>Taxa</strong>
                    </th>
                    <th className="text-danger">
                      <strong>Saldo Total</strong>
                    </th>
                    <th className="text-right text-danger">
                      <strong>Actions</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {passivos
                    .filter(p => !simulacao.patrimoniosRemovidos.map(pr => pr._id).includes(p._id))
                    .map(p => (
                      <tr key={p._id}>
                        <td>{p.nome}</td>
                        <td>
                          {p.pmt.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </td>
                        <td>{p.parcelas}</td>
                        <td>{p.taxa}%</td>
                        <td>
                          {p.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </td>
                        <td className="td-actions text-right">
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
                                  simulacao.currentSimulation.patrimoniosRemovidos.includes(p),
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
