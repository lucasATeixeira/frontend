import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Creators as CategoriasActions } from '../../store/ducks/categorias';
import scrollHook from '../../hooks/scrollHook';

const Table = ({
  color,
  categorias,
  lancamentoRequest,
  removeLancamentoRequest,
}) => {
  const [newItem, setNewItem] = useState(false);

  const [pAtual, setPAtual] = useState(0);
  const [pFinal, setPFinal] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [categoria, setCategoria] = useState('Categoria');
  const [item, setItem] = useState('Item');

  const handleKeyUp = e => {
    if (e.keyCode !== 27) return;
    setNewItem(false);
  };

  const handleDelete = l => {
    if (!window.confirm('Tem certeza que deseja excluir este parcelamento?'))
      return;
    return removeLancamentoRequest(l);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!pAtual || !pFinal || !descricao || !valor)
      return toast.error('Preencha todos os Campos', { containerId: 'alerts' });
    if (categoria === 'Categoria')
      return toast.error('Selecione uma Categoria', { containerId: 'alerts' });
    if (item === 'Item')
      return toast.error('Selecione um Item', { containerId: 'alerts' });
    if (Number(pAtual) > Number(pFinal)) {
      return toast.error(
        'Parcela Atual não pode ser maior que a Parcela Total',
        {
          containerId: 'alerts',
        }
      );
    }
    if (Number(pAtual) <= 0 || Number(pFinal) <= 0)
      return toast.error('As parcelas não podem ser menor que zero', {
        containerId: 'alerts',
      });

    setPAtual(0);
    setPFinal(0);
    setDescricao('');
    setValor(0);
    setCategoria('Categoria');
    setItem('Item');
    setNewItem(false);

    return lancamentoRequest({
      tipo: 'gasto',
      data: moment()
        .utc()
        .subtract(pAtual - 1, 'month'),
      dataFinal: moment()
        .utc()
        .add(pFinal - pAtual, 'month'),
      descricao,
      valor: valor * pFinal,
      formaPagamento: 'Parcelado',
      vezes: pFinal,
      idCategoria: categoria,
      idItem: item,
    });
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
                  <th>Categoria</th>
                  <th>Item</th>
                  <th>Parcela Atual</th>
                  <th>Total Parcelas</th>
                  <th className="text-right">Valor Parcela</th>
                  <th className="text-right">Valor Restante da Dívida</th>
                  <th className="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {categorias.categorias
                  .filter(c => c.tipo === 'gasto')
                  .map(c =>
                    c.itens.map(i =>
                      i.lancamentos
                        .filter(l => l.formaPagamento === 'Parcelado')
                        .map(l => {
                          const pAtualMap =
                            l.vezes -
                            moment(l.dataFinal).diff(
                              moment(categorias.start),
                              'month'
                            );
                          return (
                            <tr key={l._id}>
                              <td>{l.descricao}</td>
                              <td>{c.nome}</td>
                              <td>{i.nome}</td>
                              <td>{pAtualMap}</td>
                              <td>{l.vezes}</td>
                              <td className="text-right">
                                {l.mensal.toLocaleString('pt-br', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })}
                              </td>
                              <td className="text-right">
                                {(
                                  (l.vezes - pAtualMap + 1) *
                                  l.mensal
                                ).toLocaleString('pt-br', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })}
                              </td>
                              <td className="td-actions text-right">
                                <button
                                  type="button"
                                  className="btn btn-danger btn-link btn-just-icon btn-sm"
                                  onClick={() => handleDelete(l)}
                                >
                                  <i
                                    className="material-icons"
                                    role="button"
                                    tabIndex="0"
                                  >
                                    close
                                  </i>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                    )
                  )}

                {newItem && (
                  <tr ref={scrollHook}>
                    <td>
                      <span className="bmd-form-group">
                        <input
                          value={descricao}
                          onChange={e => setDescricao(e.target.value)}
                          type="text"
                          placeholder="Nome"
                          className="form-control"
                        />
                      </span>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <select
                          className="form-control"
                          data-style="select-with-transition"
                          data-size="7"
                          data-live-search="true"
                          value={categoria}
                          onChange={e => setCategoria(e.target.value)}
                        >
                          <option>Categoria</option>
                          {categorias.categorias
                            .filter(c => c.tipo === 'gasto')
                            .map(c => (
                              <option key={c._id} value={c._id}>
                                {c.nome}
                              </option>
                            ))}
                        </select>
                      </span>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <select
                          className="form-control"
                          data-style="select-with-transition"
                          data-size="7"
                          data-live-search="true"
                          value={item}
                          onChange={e => setItem(e.target.value)}
                        >
                          <option>Item</option>
                          {categorias.categorias
                            .filter(c => c._id === categoria)
                            .map(c =>
                              c.itens.map(i => (
                                <option key={i._id} value={i._id}>
                                  {i.nome}
                                </option>
                              ))
                            )}
                        </select>
                      </span>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <input
                          value={pAtual}
                          onChange={e => setPAtual(e.target.value)}
                          type="number"
                          className="form-control"
                          placeholder="Parcela Atual"
                        />
                      </span>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <input
                          type="number"
                          value={pFinal}
                          onChange={e => setPFinal(e.target.value)}
                          className="form-control"
                          placeholder="Total Parcelas"
                        />
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
                      {(
                        valor *
                        (Number(pFinal) + 1 - Number(pAtual))
                      ).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
                    <td className="td-actions text-right">
                      <button
                        type="submit"
                        className={`btn btn-${color} btn-sm`}
                      >
                        <i className="material-icons">add_circle_outline</i>
                        <strong>Adicionar</strong>
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
          onClick={() => setNewItem(true)}
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
  lancamentoRequest: PropTypes.func.isRequired,
  color: PropTypes.string,
  removeLancamentoRequest: PropTypes.func.isRequired,
  categorias: PropTypes.shape({
    categorias: PropTypes.arrayOf(
      PropTypes.shape({
        tipo: PropTypes.string,
      })
    ),
    err: PropTypes.bool,
    gastosOrcados: PropTypes.number,
    gastosRealizados: PropTypes.number,
    loading: PropTypes.bool,
    periodo: PropTypes.number,
    recebimentosOrcados: PropTypes.number,
    recebimentosRealizados: PropTypes.number,
    success: PropTypes.bool,
  }).isRequired,
};

Table.defaultProps = {
  color: 'info',
};

const mapStateToProps = state => ({
  categorias: state.categorias,
  patrimonios: state.patrimonios,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoriasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
