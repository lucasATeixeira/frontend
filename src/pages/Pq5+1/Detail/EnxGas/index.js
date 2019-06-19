import React from 'react';
import PropTypes from 'prop-types';

const EnxGas = ({ content }) => (
  <>
    <div className="card">
      <div className="card-header card-header-text card-header-info">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Gastos Enxugados</strong>
          </h4>
        </div>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-info">
                      <strong>Gasto</strong>
                    </th>
                    <th className="text-info">
                      <strong>Categoria</strong>
                    </th>
                    <th className="text-info">
                      <strong>Classificação</strong>
                    </th>
                    <th className="text-info">
                      <strong>Valor Mensal</strong>
                    </th>
                    <th className="text-info">
                      <strong>Recorrência</strong>
                    </th>
                    <th className="text-info">
                      <strong>Valor Orcado Original</strong>
                    </th>
                    <th className="text-info">
                      <strong>Valor Pós Enxugar</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.enxugar.map(e => (
                    <tr key={e._id}>
                      <td>{e.nome}</td>
                      <td>{e.nomeCategoria}</td>
                      <td>{e.classificacao}</td>
                      <td>
                        {e.mensal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td>{e.recorrencia}</td>
                      <td>
                        {e.orcado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td>
                        {e.valorEnxugado.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

EnxGas.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default EnxGas;
