/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CurrencyInput from 'react-currency-input';
import { Creators as PatrimoniosActions } from '../../store/ducks/patrimonios';

const TableAtivos = ({
  list, addPatrimonioRequest, removePatrimonioRequest, classificacao,
}) => {
  const [nomeAtivo, setNomeAtivo] = useState('');
  const [tipo, setTipo] = useState('Moradia');
  const [valor, setValor] = useState(0);
  const [newAtivo, setNewAtivo] = useState(false);

  const handleDelete = (patrimonio) => {
    if (!window.confirm('Tem certeza que deseja excluir este patrimônio?')) return;
    removePatrimonioRequest(patrimonio);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomeAtivo) return alert('Adicione um nome');
    if (valor <= 0) return alert('Adicione um valor Válido');
    setNewAtivo(false);
    return addPatrimonioRequest({
      nome: nomeAtivo,
      tipo: 'ativo',
      classificacao,
      valor,
      categoria: tipo,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
                      <strong>Tipo</strong>
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
                  {list.map(a => (
                    <tr key={a._id}>
                      <td>{a.nome}</td>
                      <td>{a.categoria}</td>
                      <td>
                        {a.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="td-actions text-right">
                        <button
                          onClick={() => handleDelete(a)}
                          type="button"
                          className="btn btn-danger btn-link btn-just-icon btn-sm"
                        >
                          <i className="material-icons">close</i>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {newAtivo && (
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
                          <div className="form-group has-feedback">
                            <select
                              value={tipo}
                              onChange={e => setTipo(e.target.value)}
                              className="form-control"
                              data-style="select-with-transition"
                              data-size="7"
                              data-live-search="true"
                            >
                              <option value="moradia">Moradia</option>
                              <option value="veículo">Transporte</option>
                              <option value="bens nao utilizados">Bens Não Utilizados</option>
                              <option value="outros bens">Outros Bens</option>
                            </select>
                          </div>
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
              type="button"
              onClick={() => setNewAtivo(true)}
              className="btn btn-success btn-sm"
            >
              <strong>
                <i className="material-icons">add_circle_outline</i> Adicionar Ativo
              </strong>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

TableAtivos.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape()),
  addPatrimonioRequest: PropTypes.func.isRequired,
  removePatrimonioRequest: PropTypes.func.isRequired,
  classificacao: PropTypes.string.isRequired,
};

TableAtivos.defaultProps = {
  list: [],
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(PatrimoniosActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableAtivos);
