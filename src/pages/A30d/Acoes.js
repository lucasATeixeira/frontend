/* eslint-disable no-alert */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as A30dActions } from '../../store/ducks/a30d';

const Acoes = ({
  a30d, addA30dRequest, removeA30dRequest, crencas,
}) => {
  const crencasList = crencas.map(a => a.crencas).flat();
  const [newLine, setNewLine] = useState(false);
  const [crenca, setCrenca] = useState('Seleciona uma Crença');
  const [acao, setAcao] = useState('');

  const handleDelete = (body) => {
    removeA30dRequest(body);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acao) alert('Insira uma Ação');
    if (crenca === 'Seleciona uma Crença') return alert('Seleciona uma Crença');
    addA30dRequest({ acao, crenca });
    setCrenca('Seleciona uma Crença');
    return setAcao('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive table-sales">
              <table className="table">
                <tbody>
                  {a30d.a30d.map(a => (
                    <tr key={a._id}>
                      <td width="50%">{a.acao}</td>
                      <td width="50%">{a.crenca}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(a)}
                          type="button"
                          className="btn btn-danger btn-link btn-just-icon btn-sm"
                        >
                          <i className="material-icons" role="button" tabIndex="0">
                            close
                          </i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {newLine && (
                    <tr>
                      <td width="50%">
                        <input
                          value={acao}
                          onChange={e => setAcao(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Ação"
                        />
                      </td>
                      <td width="50%">
                        <span className="bmd-form-group">
                          <select
                            value={crenca}
                            onChange={e => setCrenca(e.target.value)}
                            className="form-control"
                            data-style="select-with-transition"
                            data-size="7"
                            data-live-search="true"
                            name="estrategia"
                          >
                            {crencasList.map(a => (
                              <option key={a._id}>{a.ress}</option>
                            ))}
                          </select>
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {!newLine ? (
              <button
                onClick={() => setNewLine(true)}
                type="button"
                className="btn btn-success btn-sm btn-link"
              >
                <strong>
                  <i className="material-icons">add_circle_outline</i> Nova Ação
                </strong>
              </button>
            ) : (
              <>
                <div>
                  <button type="submit" className="btn btn-success btn-sm">
                    <strong>
                      <i className="material-icons">add_circle_outline</i> Adicionar nova Ação
                    </strong>
                  </button>
                  <button
                    onClick={() => setNewLine(false)}
                    type="button"
                    className="btn btn-danger btn-link btn-just-icon btn-sm"
                  >
                    <i className="material-icons">close</i>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

Acoes.propTypes = {
  a30d: PropTypes.shape().isRequired,
  addA30dRequest: PropTypes.func.isRequired,
  removeA30dRequest: PropTypes.func.isRequired,
  crencas: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = state => ({
  a30d: state.a30d,
  crencas: state.crencas.answers,
});

const mapDispatchToProps = dispatch => bindActionCreators(A30dActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Acoes);
