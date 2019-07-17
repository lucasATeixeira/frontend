import React from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';

const One = ({
  orcamento,
  listData,
  handlePrioridadeChange,
  handleSubstituivelChange,
  setEnxugar,
}) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header card-header-icon card-header-info">
            <div className="card-icon">
              <i className="material-icons">assignment</i>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <ReactTable
                  showPagination={false}
                  data={listData.map(i => ({
                    ...i,
                    prioridade: (
                      <div className="togglebutton text-center">
                        <label htmlFor={i._id}>
                          N
                          <input
                            onChange={e => handlePrioridadeChange(e, i._id, i.mensal <= orcamento.mediaGastos)
                            }
                            id={i._id}
                            type="checkbox"
                          />
                          <span className="toggle" />S
                        </label>
                      </div>
                    ),
                    substituivel: (
                      <div className="togglebutton text-center">
                        <label htmlFor={i._id + i._id}>
                          N
                          <input
                            onChange={e => handleSubstituivelChange(e, i._id, i.mensal <= orcamento.mediaGastos)
                            }
                            id={i._id + i._id}
                            type="checkbox"
                          />
                          <span className="toggle" />S
                        </label>
                      </div>
                    ),
                  }))}
                  columns={[
                    {
                      Header: 'Gasto',
                      accessor: 'nome',
                    },
                    {
                      Header: 'Categoria',
                      accessor: 'nomeCategoria',
                    },
                    {
                      Header: 'Tipo',
                      accessor: 'classificacao',
                    },
                    {
                      Header: 'Valor Orcado',
                      accessor: 'orcadoLocale',
                    },
                    {
                      Header: 'Recorrência',
                      accessor: 'recorrencia',
                    },
                    {
                      Header: 'Valor Mensal',
                      accessor: 'mensalLocale',
                    },
                    {
                      Header: 'Prioridade',
                      accessor: 'prioridade',
                      sortable: false,
                      filterable: false,
                    },
                    {
                      Header: 'Insubstituível',
                      accessor: 'substituivel',
                      sortable: false,
                      filterable: false,
                    },
                    {
                      Header: 'Média',
                      accessor: 'media',
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  defaultPageSize={listData.length}
                  className="-striped -highlight"
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <button
                  onClick={() => setEnxugar(true)}
                  className="btn btn-round pull-right btn-info"
                  type="button"
                >
                  <strong>Enxugar Gastos</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

One.propTypes = {
  orcamento: PropTypes.shape().isRequired,
  listData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handlePrioridadeChange: PropTypes.func.isRequired,
  handleSubstituivelChange: PropTypes.func.isRequired,
  setEnxugar: PropTypes.func.isRequired,
};

export default One;
