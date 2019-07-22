/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input';
import { Creators as PatrimoniosActions } from '../../store/ducks/patrimonios';

const TableAtivos = ({
  list,
  addPatrimonioRequest,
  removePatrimonioRequest,
  classificacao,
  updatePatrimonioRequest,
}) => {
  const [nomeAtivo, setNomeAtivo] = useState('');
  const [tipo, setTipo] = useState('Escolha o tipo');
  const [valor, setValor] = useState(0);
  const [newAtivo, setNewAtivo] = useState(false);
  const [edit, setEdit] = useState('');

  const handleDelete = (patrimonio) => {
    if (!window.confirm('Tem certeza que deseja excluir este patrimônio?')) return;
    removePatrimonioRequest(patrimonio);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode !== 27) return;
    setNewAtivo(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipo === 'Escolha o tipo') return toast.error('Escolha um tipo', { containerId: 'alerts' });
    if (!nomeAtivo) return toast.error('Adicione um nome', { containerId: 'alerts' });
    if (valor <= 0) return toast.error('Adicione um valor Válido', { containerId: 'alerts' });
    if (newAtivo) {
      setNewAtivo(false);
      setNomeAtivo('');
      setTipo('Escolha o tipo');
      setValor(0);
      setNewAtivo(false);
      return addPatrimonioRequest({
        nome: nomeAtivo,
        tipo: 'ativo',
        classificacao,
        valor,
        categoria: tipo,
      });
    }

    if (!newAtivo) {
      setEdit('');
      setNomeAtivo('');
      setTipo('Escolha o tipo');
      setValor(0);
      setNewAtivo(false);
      return updatePatrimonioRequest({
        _id: edit,
        nome: nomeAtivo,
        classificacao,
        valor,
        categoria: tipo,
      });
    }
    setNomeAtivo('');
    setTipo('Moradia');
    setValor(0);
    setNewAtivo(false);
    return setEdit('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
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
                    <th className="text-success text-right">
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
                      {edit !== a._id ? (
                        <>
                          <td>{a.nome}</td>
                          <td>{a.categoria}</td>
                          <td className="text-right">
                            {a.valor.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td className="td-actions text-right">
                            <button
                              type="button"
                              className="btn btn-success btn-link btn-just-icon btn-sm"
                              onClick={() => {
                                setNewAtivo(false);
                                setNomeAtivo(a.nome);
                                setTipo(a.categoria);
                                setValor(a.valor);
                                setEdit(a._id);
                              }}
                            >
                              <i className="fa fa-pencil small" />
                            </button>
                            <button
                              onClick={() => handleDelete(a)}
                              type="button"
                              className="btn btn-danger btn-link btn-just-icon btn-sm"
                            >
                              <i className="material-icons">close</i>
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
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
                              <select
                                value={tipo}
                                onChange={e => setTipo(e.target.value)}
                                className="form-control"
                                data-style="select-with-transition"
                                data-size="7"
                                data-live-search="true"
                              >
                                <option>Escolha o Tipo</option>
                                {classificacao === 'patrimonial' ? (
                                  <>
                                    <option value="moradia">Moradia</option>
                                    <option value="transporte">Transporte</option>
                                    <option value="bens nao utilizados">Bens Não Utilizados</option>
                                    <option value="outros bens">Outros Bens</option>
                                  </>
                                ) : (
                                  <>
                                    <option value="cdb">CDB</option>
                                    <option value="tesouro">Tesouro</option>
                                    <option value="ações">Ações</option>
                                    <option value="outros ativos">Outros Ativos</option>
                                  </>
                                )}
                              </select>
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
                            <div>
                              <button type="submit" className="btn btn-success btn-sm">
                                <i className="material-icons">add_circle_outline</i>
                                <strong>Adicionar</strong>
                              </button>
                            </div>
                          </td>
                        </>
                      )}
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
                          <select
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            className="form-control"
                            data-style="select-with-transition"
                            data-size="7"
                            data-live-search="true"
                          >
                            <option>Escolha o Tipo</option>
                            {classificacao === 'patrimonial' ? (
                              <>
                                <option value="moradia">Moradia</option>
                                <option value="transporte">Transporte</option>
                                <option value="bens nao utilizados">Bens Não Utilizados</option>
                                <option value="outros bens">Outros Bens</option>
                              </>
                            ) : (
                              <>
                                <option value="cdb">CDB</option>
                                <option value="tesouro">Tesouro</option>
                                <option value="ações">Ações</option>
                                <option value="outros ativos">Outros Ativos</option>
                              </>
                            )}
                          </select>
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
                        <button type="submit" className="btn btn-success btn-sm">
                          <i className="material-icons">add_circle_outline</i>
                          <strong>Adicionar</strong>
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
              onClick={() => {
                setNewAtivo(true);
                setEdit('');
              }}
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
  updatePatrimonioRequest: PropTypes.func.isRequired,
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
