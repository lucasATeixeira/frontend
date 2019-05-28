import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import BlankPage from '../../components/BlankPage';
import HeaderIcon from './HeaderIcon';
import { Creators as CategoriasActions } from '../../store/ducks/categorias';
import './style.css';

const Extrato = ({ categorias, removeLancamentoRequest }) => {
  const handleEdit = () => alert('Editando');
  const [active, setActive] = useState('gasto');
  const [lancamentosGastos, setLancamentosGastos] = useState([]);
  const [lancamentosRecebimentos, setLancamentosRecebimentos] = useState([]);

  useEffect(() => {
    setLancamentosGastos(
      categorias.categorias
        .map((c) => {
          if (c.tipo !== 'gasto') return [];
          return c.itens.map(i => i.lancamentos.map(l => ({
            ...l,
            valor: l.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            valorMensal: l.mensal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            data: new Intl.DateTimeFormat('pt-br').format(new Date(l.data)),
            vezes: `x ${l.vezes}`,
            nomeItem: i.nome,
            nomeCategoria: c.nome,
            actions: (
              <div className="pull-right">
                <button
                  type="button"
                  onClick={() => handleEdit(l._id)}
                  className="btn btn-success btn-link btn-just-icon btn-sm"
                >
                  <i className="material-icons">edit</i>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!window.confirm('Tem certeza que deseja excluir')) return null;
                    return removeLancamentoRequest(l);
                  }}
                  className="btn btn-danger btn-link btn-just-icon btn-sm"
                >
                  <i className="material-icons">close</i>
                </button>
              </div>
            ),
          })));
        })
        .flat(2)
        .sort((a, b) => (a.data > b.data ? 1 : -1)),
    );
    setLancamentosRecebimentos(
      categorias.categorias
        .map((c) => {
          if (c.tipo !== 'recebimento') return [];
          return c.itens.map(i => i.lancamentos.map(l => ({
            ...l,
            valor: l.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            valorMensal: l.mensal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            data: new Intl.DateTimeFormat('pt-br').format(new Date(l.data)),
            vezes: `x ${l.vezes}`,
            nomeItem: i.nome,
            nomeCategoria: c.nome,
            actions: (
              <div className="pull-right">
                <button
                  type="button"
                  onClick={() => handleEdit(l._id)}
                  className="btn btn-success btn-link btn-just-icon btn-sm"
                >
                  <i className="material-icons">edit</i>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!window.confirm('Tem certeza que deseja excluir')) return null;
                    return removeLancamentoRequest(l);
                  }}
                  className="btn btn-danger btn-link btn-just-icon btn-sm"
                >
                  <i className="material-icons">close</i>
                </button>
              </div>
            ),
          })));
        })
        .flat(2)
        .sort((a, b) => (a.data > b.data ? 1 : -1)),
    );
  }, [categorias, removeLancamentoRequest]);

  return (
    <>
      <BlankPage>
        <div className="row">
          <div className="col-md-12">
            <HeaderIcon color="info" materialIcon="assignment">
              <div className="social-line">
                <div className="page-categories">
                  <ul className="nav nav-pills justify-content-center" role="tablist">
                    <li className="nav-item">
                      <a
                        onClick={() => setActive('recebimento')}
                        className="nav-link btn-ie"
                        data-toggle="tab"
                        href="/painel"
                        role="tablist"
                      >
                        <i className="material-icons">attach_money</i>
                        {' '}
                        <strong>Recebimentos</strong>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        onClick={() => setActive('gasto')}
                        className="nav-link btn-ie active"
                        data-toggle="tab"
                        href="/painel"
                        role="tablist"
                      >
                        <i className="material-icons">shopping_cart</i>
                        {' '}
                        <strong>Gastos</strong>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <br />

              {active === 'gasto' && (
                <ReactTable
                  data={lancamentosGastos}
                  filterable
                  columns={[
                    {
                      Header: 'Categoria',
                      accessor: 'nomeCategoria',
                    },
                    {
                      Header: 'Item',
                      accessor: 'nomeItem',
                    },
                    {
                      Header: 'Data',
                      accessor: 'data',
                    },
                    {
                      Header: 'O Quê',
                      accessor: 'descricao',
                    },
                    {
                      Header: 'Valor',
                      accessor: 'valor',
                    },
                    {
                      Header: 'Forma Pagamento',
                      accessor: 'formaPagamento',
                    },
                    {
                      Header: 'Vezes',
                      accessor: 'vezes',
                    },
                    {
                      Header: 'Valor Mensal',
                      accessor: 'valorMensal',
                    },
                    {
                      Header: 'Ações',
                      accessor: 'actions',
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              )}

              {active === 'recebimento' && (
                <ReactTable
                  data={lancamentosRecebimentos}
                  filterable
                  columns={[
                    {
                      Header: 'Categoria',
                      accessor: 'nomeCategoria',
                    },
                    {
                      Header: 'Item',
                      accessor: 'nomeItem',
                    },
                    {
                      Header: 'Data',
                      accessor: 'data',
                    },
                    {
                      Header: 'O Quê',
                      accessor: 'descricao',
                    },
                    {
                      Header: 'Valor',
                      accessor: 'valor',
                    },
                    {
                      Header: 'Forma Pagamento',
                      accessor: 'formaPagamento',
                    },
                    {
                      Header: 'Vezes',
                      accessor: 'vezes',
                    },
                    {
                      Header: 'Valor Mensal',
                      accessor: 'valorMensal',
                    },
                    {
                      Header: 'Ações',
                      accessor: 'actions',
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              )}
            </HeaderIcon>
          </div>
        </div>
      </BlankPage>
    </>
  );
};

Extrato.propTypes = {
  categorias: PropTypes.shape({
    categorias: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  removeLancamentoRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categorias: state.categorias,
});

const mapDispatchToProps = dispatch => bindActionCreators(CategoriasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Extrato);
