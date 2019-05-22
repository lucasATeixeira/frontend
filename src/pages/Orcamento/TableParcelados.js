import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';

const Table = ({ color }) => {
  const [newItem, setNewItem] = useState(false);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <form>
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Parcela Atual</th>
                  <th>Total Parcelas</th>
                  <th>Valor Parcela</th>
                  <th>Valor Restante da Dívida</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>nome</td>
                  <td>2</td>
                  <td>5</td>
                  <td>R$ 100,00</td>
                  <td>R$ 900,00</td>
                  <td className="td-actions text-right">
                    <button type="button" className="btn btn-danger btn-link btn-just-icon btn-sm">
                      <i className="material-icons" role="button" tabIndex="0">
                        close
                      </i>
                    </button>
                  </td>
                </tr>

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
                    <td className="text-center">Calculado</td>
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
};

Table.defaultProps = {
  color: 'info',
};

export default Table;
