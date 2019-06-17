import React from 'react';

const One = () => (
  <>
    <div className="card">
      <div className="card-header card-header-text card-header-success">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Patrimônios Ativos</strong>
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
                    <th className="text-success">
                      <strong>Ativo</strong>
                    </th>
                    <th className="text-success">
                      <strong>Valor</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>a.nome</td>
                    <td>a.valor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default One;
