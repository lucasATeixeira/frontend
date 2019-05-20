/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';

const Table = ({ color, itens }) => {
  const [newItem, setNewItem] = useState(false);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState(0);
  const [recorrencia, setRecorrencia] = useState(1);
  const [classificacao, setClassificacao] = useState('Flexível');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome) return alert('Preencha o nome');
    if (recorrencia <= 0) return alert('Recorrência deve ser maior que zero');
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
                  <th>Classificação</th>
                  <th>Valor</th>
                  <th>Recorrência</th>
                  <th>Valor Mensal</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {itens.map(i => (
                  <tr key={i._id}>
                    <td>{i.nome}</td>
                    <td>{i.classificacao}</td>
                    <td>
                      {i.orcado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td>{i.recorrencia}</td>
                    <td>
                      {i.classificacao !== 'Eventual'
                        ? (i.orcado * i.recorrencia).toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                        : (i.orcado / i.recorrencia).toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                    </td>
                    <td className="td-actions text-right">
                      <button
                        type="button"
                        className="btn btn-danger btn-link btn-just-icon btn-sm"
                      >
                        <i className="material-icons">close</i>
                      </button>
                    </td>
                  </tr>
                ))}

                {newItem && (
                  <tr>
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
                        <div className="form-group has-feedback">
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
                        </div>
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
                          ? (valor / recorrencia).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })
                          : (valor * recorrencia).toLocaleString('pt-br', {
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
          onClick={() => setNewItem(true)}
          className={`btn btn-${color} btn-sm`}
        >
          <strong>
            <i className="material-icons">add_circle_outline</i>
            {' '}
Adicionar item
          </strong>
        </button>
      </div>
    </div>
  );
};

Table.propTypes = {
  color: PropTypes.string,
  itens: PropTypes.array,
};

Table.defaultProps = {
  color: 'info',
  itens: [],
};

export default Table;
