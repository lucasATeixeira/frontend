import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Creators as CategoriasActions } from '../../store/ducks/categorias';

const Table = ({ color, categorias, lancamentoRequest, removeLancamentoRequest }) => {
  const [newItem, setNewItem] = useState(false);

  const [pAtual, setPAtual] = useState(0);
  const [pFinal, setPFinal] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [categoria, setCategoria] = useState('Categoria');
  const [item, setItem] = useState('Item');

  const handleDelete = l => {
    if (!window.confirm('Tem certeza que deseja excluir este parcelamento?')) return
    return removeLancamentoRequest(l)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pAtual || !pFinal || !descricao || !valor) return alert('Preencha todos os Campos');
    if (categoria === 'Categoria') return alert('Selecione uma Categoria');
    if (item === 'Item') return alert('Selecione um Item');
    if (Number(pAtual) > Number(pFinal)) return alert('Parcela Atual não pode ser maior que a Parcela Total');
    if (Number(pAtual) <= 0 || Number(pFinal) <= 0) return alert('As parcelas não podem ser menor que zero');

    setPAtual(0);
    setPFinal(0);
    setDescricao('');
    setValor(0);
    setCategoria('Categoria');
    setItem('Item');

    return lancamentoRequest({
      tipo: 'gasto',
      data: moment().subtract(pAtual - 1, 'month'),
      dataFinal: moment().add(pFinal - pAtual, 'month'),
      descricao,
      valor: (valor * pFinal),
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
          <form onSubmit={handleSubmit}>
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Item</th>                  
                  <th>Parcela Atual</th>
                  <th>Total Parcelas</th>
                  <th>Valor Parcela</th>
                  <th>Valor Restante da Dívida</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categorias.categorias
                  .filter(c => c.tipo === 'gasto')
                  .map(c => c.itens.map(i => i.lancamentos
                    .filter(l => l.formaPagamento === 'Parcelado')
                    .map((l) => {
                      const pAtualMap = l.vezes - (moment(l.dataFinal).diff(moment(categorias.start), 'month'));
                      return (
                        <tr key={l._id}>
                          <td>{l.descricao}</td>
                          <td>{c.nome}</td>
                          <td>{i.nome}</td>
                          <td>{pAtualMap}</td>
                          <td>{l.vezes}</td>
                          <td>
                            {l.mensal.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td>
                            {((l.vezes - pAtualMap + 1) * l.mensal).toLocaleString('pt-br', {
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
                              <i className="material-icons" role="button" tabIndex="0">
                                    close
                              </i>
                            </button>
                          </td>
                        </tr>
                      );
                    })))}

                {newItem && (
                  <tr>
                    <td>
                      <span className="bmd-form-group">
                        <input value={descricao} onChange={e => setDescricao(e.target.value)} type="text" placeholder="Nome" className="form-control" />
                      </span>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <div className="form-group has-feedback">
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
                                <option key={c._id} value={c._id}>{c.nome}</option>
                              ))}
                          </select>
                        </div>
                      </span>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <div className="form-group has-feedback">
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
                              .map(c => c.itens.map(i => (
                                <option key={i._id} value={i._id}>{i.nome}</option>
                              )))}
                          </select>
                        </div>
                      </span>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <input value={pAtual} onChange={e => setPAtual(e.target.value)} type="number" className="form-control" placeholder="Parcela Atual" />
                      </span>
                    </td>
                    <td>
                      <span className="bmd-form-group">
                        <input type="number" value={pFinal} onChange={e => setPFinal(e.target.value)} className="form-control" placeholder="Total Parcelas" />
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

                    <td>{(valor * (Number(pFinal) + 1 - Number(pAtual))).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                    <td className="td-actions text-right">
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
      }),
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

const mapDispatchToProps = dispatch => bindActionCreators(CategoriasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);
