import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';

const Table = ({ color, itens }) => {
  const [newItem, setNewItem] = useState(false);
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
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
                    <button type="button" className="btn btn-danger btn-link btn-just-icon btn-sm">
                      <i className="material-icons">close</i>
                    </button>
                  </td>
                </tr>
              ))}

              {newItem && (
                <tr>
                  <td>
                    <span className="bmd-form-group">
                      <input type="text" placeholder="Nome do item" className="form-control" />
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
                      />
                    </span>
                  </td>
                  <td>
                    <span className="bmd-form-group">
                      <input type="number" className="form-control" placeholder="Recorrência" />
                    </span>
                  </td>
                  <td className="text-center">Valor calculado</td>
                  <td className="text-center">
                    <button type="button" className="btn btn-success btn-link btn-just-icon btn-sm">
                      <i className="material-icons">add_circle_outline</i>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
};

Table.defaultProps = {
  color: 'info',
};

export default Table;
