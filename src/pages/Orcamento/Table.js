/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { Creators as CategoriaActions } from '../../store/ducks/categorias';
import scrollHook from '../../hooks/scrollHook';

const Table = ({
  color,
  itens,
  addItemRequest,
  idCategoria,
  removeItemRequest,
  periodo,
  updateItemRequest,
}) => {
  const [newItem, setNewItem] = useState(false);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState(0);
  const [recorrencia, setRecorrencia] = useState(1);
  const [classificacao, setClassificacao] = useState('Flexível');
  const [edit, setEdit] = useState('');

  const handleDelete = (item, mensal, realizado, tipo, realizadoParcelado) => {
    if (
      !window.confirm('Este item pode conter lançamentos feitos, tem certeza que deseja excluir?')
    ) return;
    removeItemRequest(item, mensal, realizado, tipo, idCategoria, realizadoParcelado);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode !== 27) return;
    setNewItem(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem) {
      if (!nome) return toast.error('Preencha o nome', { containerId: 'alerts' });
      if (recorrencia <= 0) return toast.error('Recorrência deve ser maior que zero', { containerId: 'alerts' });
      addItemRequest({
        tipo: color === 'info' ? 'gasto' : 'recebimento',
        nome,
        classificacao,
        orcado: valor,
        recorrencia,
        idCategoria,
      });
    }
    if (edit) {
      if (!nome) return toast.error('Preencha o nome', { containerId: 'alerts' });
      if (recorrencia <= 0) return toast.error('Recorrência deve ser maior que zero', { containerId: 'alerts' });
      updateItemRequest({
        _id: edit,
        nome,
        classificacao,
        orcado: valor,
        recorrencia,
      });
    }
    setNewItem(false);
    return setEdit('');
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <form onSubmit={handleSubmit} onKeyUp={handleKeyUp}>
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Classificação</th>
                  <th className="text-right">Orçado</th>
                  <th>Recorrência</th>
                  <th className="text-right">Valor Período</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {itens.map(i => (
                  <tr key={i._id}>
                    {edit !== i._id ? (
                      <>
                        <td>{i.nome}</td>
                        <td>{i.classificacao}</td>
                        <td className="text-right">
                          {i.orcado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </td>
                        <td>{i.recorrencia}</td>
                        <td className="text-right">
                          {i.mensal.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td className="td-actions text-right">
                          <button
                            type="button"
                            className="btn btn-success btn-link btn-just-icon btn-sm"
                            onClick={() => {
                              setNewItem(false);
                              setEdit(i._id);
                              setNome(i.nome);
                              setValor(i.orcado);
                              setRecorrencia(i.recorrencia);
                              setClassificacao(i.classificacao);
                            }}
                          >
                            <i className="fa fa-pencil small" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-link btn-just-icon btn-sm"
                          >
                            <i
                              onClick={() => handleDelete(
                                i._id,
                                i.mensal,
                                i.realizado,
                                i.tipo,
                                i.realizadoParcelado,
                              )
                              }
                              onKeyPress={() => handleDelete(
                                i._id,
                                i.mensal,
                                i.realizado,
                                i.tipo,
                                i.realizadoParcelado,
                              )
                              }
                              className="material-icons"
                              role="button"
                              tabIndex="0"
                            >
                              close
                            </i>
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <span className="bmd-form-group">
                            <input
                              value={nome}
                              onChange={e => setNome(e.target.value)}
                              type="text"
                              placeholder="Nome do item"
                              className="form-control"
                            />
                          </span>
                        </td>
                        <td>
                          <span className="bmd-form-group">
                            <select
                              value={classificacao}
                              onChange={e => setClassificacao(e.target.value)}
                              className="form-control"
                              data-style="select-with-transition"
                              data-size="7"
                              data-live-search="true"
                            >
                              <option value="Flexível">Flexível</option>
                              <option value="Comprometido">Comprometido</option>
                              <option value="Eventual">Eventual</option>
                            </select>
                          </span>
                        </td>
                        <td>
                          <span className="bmd-form-group">
                            <CurrencyInput
                              className="form-control"
                              decimalSeparator=","
                              thousandSeparator="."
                              precision="2"
                              prefix="R$"
                              value={valor}
                              onChangeEvent={(e, mv, fv) => setValor(fv)}
                            />
                          </span>
                        </td>
                        <td>
                          <span className="bmd-form-group">
                            <input
                              value={recorrencia}
                              onChange={e => setRecorrencia(e.target.value)}
                              type="number"
                              className="form-control"
                              placeholder="Recorrência"
                            />
                          </span>
                        </td>
                        <td className="text-center">
                          {valor === 0
                            ? '--'
                            : classificacao === 'Eventual'
                              ? ((valor * periodo) / recorrencia).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })
                              : (valor * periodo * recorrencia).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                        </td>
                        <td className="text-center">
                          <div>
                            <button
                              type="submit"
                              className="btn btn-success btn-link btn-just-icon btn-sm"
                            >
                              <i className="material-icons">add_circle_outline</i>
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}

                {newItem && (
                  <tr ref={scrollHook}>
                    <td>
                      <span className="bmd-form-group">
                        <input
                          value={nome}
                          onChange={e => setNome(e.target.value)}
                          type="text"
                          placeholder="Nome do item"
                          className="form-control"
                        />
                      </span>
                    </td>
                    <td>
                      <select
                        value={classificacao}
                        onChange={e => setClassificacao(e.target.value)}
                        className="form-control"
                        data-style="select-with-transition"
                        data-size="7"
                        data-live-search="true"
                      >
                        <option value="Flexível">Flexível</option>
                        <option value="Comprometido">Comprometido</option>
                        <option value="Eventual">Eventual</option>
                      </select>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <CurrencyInput
                          className="form-control"
                          decimalSeparator=","
                          thousandSeparator="."
                          precision="2"
                          prefix="R$"
                          value={valor}
                          onChangeEvent={(e, mv, fv) => setValor(fv)}
                        />
                      </span>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <input
                          value={recorrencia}
                          onChange={e => setRecorrencia(e.target.value)}
                          type="number"
                          className="form-control"
                          placeholder="Recorrência"
                        />
                      </span>
                    </td>
                    <td className="text-center">
                      {valor === 0
                        ? '--'
                        : classificacao === 'Eventual'
                          ? ((valor * periodo) / recorrencia).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })
                          : (valor * periodo * recorrencia).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
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
          </form>
        </div>
        <button
          type="button"
          onClick={() => {
            setNewItem(true);
            setEdit('');
            setNome('');
            setValor(0);
            setRecorrencia(0);
            setClassificacao('Flexível');
          }}
          className={`btn btn-${color} btn-sm`}
        >
          <strong>
            <i className="material-icons">add_circle_outline</i> Adicionar item
          </strong>
        </button>
      </div>
    </div>
  );
};

Table.propTypes = {
  updateItemRequest: PropTypes.func.isRequired,
  periodo: PropTypes.number.isRequired,
  removeItemRequest: PropTypes.func.isRequired,
  color: PropTypes.string,
  addItemRequest: PropTypes.func.isRequired,
  idCategoria: PropTypes.string,
  itens: PropTypes.arrayOf(PropTypes.shape()),
};

Table.defaultProps = {
  color: 'info',
  itens: [],
  idCategoria: '',
};

const mapStateToProps = state => ({
  periodo: state.categorias.periodo,
});

const mapDispatchToProps = dispatch => bindActionCreators(CategoriaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
