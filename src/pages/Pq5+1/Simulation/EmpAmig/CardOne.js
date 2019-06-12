/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import { Creators as SimulacaoActions } from '../../../../store/ducks/simulacao';

// CARENCIA E PAGAMENTO UNICO, SE FOR PAGAMENTO ÚNICO MOSTRA O VALOR QUE ELE VAI PAGAR E QUANDO

const CardOne = ({ simulacao, saveSimulation }) => {
  const { currentSimulation } = simulacao;
  const [newFinanciamento, setNewFinanciamento] = useState(true);
  const [nomePassivo, setNomePassivo] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [parcelas, setParcelas] = useState(0);
  const [pmt, setPmt] = useState(0);
  const [taxa, setTaxa] = useState(0);
  useEffect(() => {
    if (!currentSimulation.patrimonios.length) setNewFinanciamento(true);
    if (currentSimulation.patrimonios.length) setNewFinanciamento(false);
  }, [currentSimulation.patrimonios]);

  const handleDelete = () => saveSimulation({
    ...currentSimulation,
    patrimonios: [],
    patrimoniosRemovidos: [],
    saldo: simulacao.ativos - simulacao.passivos,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parcelas <= 0) return alert('Parcelas deve ser maior que zero');
    if (!nomePassivo) return alert('Coloque um nome');
    if (!instituicao) return alert('Coloque uma Instituição');
    const id = Math.random();
    setNomePassivo('');
    setInstituicao('');
    setParcelas(0);
    setPmt(0);
    setTaxa(0);
    return saveSimulation({
      ...currentSimulation,
      saldo: simulacao.ativos - simulacao.passivos + pmt * parcelas,
      patrimoniosRemovidos: [],
      patrimonios: [
        {
          _id: id,
          nome: nomePassivo,
          tipo: 'passivo',
          classificacao: 'financeiro',
          instituicao,
          pmt,
          parcelas,
          data: moment(),
          dataFinal: moment().add(parcelas - 1, 'month'),
          taxa,
          total: pmt * parcelas,
        },
      ],
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header card-header-text card-header-success">
          <div className="card-text">
            <h4 className="card-title">
              <strong>Empréstimo</strong>
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
                        <strong>Passivo</strong>
                      </th>
                      <th className="text-success">
                        <strong>Instituição</strong>
                      </th>
                      <th className="text-success">
                        <strong>PMT</strong>
                      </th>
                      <th className="text-success">
                        <strong>Parcelas</strong>
                      </th>
                      <th className="text-success">
                        <strong>Taxa</strong>
                      </th>
                      <th className="text-success">
                        <strong>Saldo Total</strong>
                      </th>

                      <th className="text-right text-success">
                        <strong>Actions</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSimulation.patrimonios.map(c => (
                      <tr key={c._id}>
                        <td>{c.nome}</td>
                        <td>{c.instituicao}</td>
                        <td>
                          {c.pmt.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td>{c.parcelas}</td>
                        <td>{c.taxa}%</td>
                        <td>
                          {c.total.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td className="td-actions text-right">
                          <button
                            onClick={() => handleDelete()}
                            type="button"
                            className="btn btn-danger btn-link btn-just-icon btn-sm"
                          >
                            <i className="material-icons">close</i>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {newFinanciamento && (
                      <tr>
                        <td>
                          <span className="bmd-form-group">
                            <input
                              value={nomePassivo}
                              onChange={e => setNomePassivo(e.target.value)}
                              type="text"
                              placeholder="Nome"
                              className="form-control"
                            />
                          </span>
                        </td>
                        <td>
                          <span className="bmd-form-group">
                            <input
                              value={instituicao}
                              onChange={e => setInstituicao(e.target.value)}
                              type="text"
                              placeholder="Instituição"
                              className="form-control"
                            />
                          </span>
                        </td>
                        <td>
                          <span className="bmd-form-group">
                            <CurrencyInput
                              value={pmt}
                              onChangeEvent={(e, mv, fv) => setPmt(fv)}
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
                            <input
                              value={parcelas}
                              onChange={e => setParcelas(e.target.value)}
                              type="number"
                              placeholder="P. Restantes"
                              className="form-control"
                            />
                          </span>
                        </td>
                        <td>
                          <span className="bmd-form-group">
                            <CurrencyInput
                              value={taxa}
                              onChangeEvent={(e, mv, fv) => setTaxa(fv)}
                              className="form-control"
                              decimalSeparator=","
                              thousandSeparator="."
                              precision="2"
                              suffix="%"
                            />
                          </span>
                        </td>
                        <td className="text-center">
                          {(parcelas * pmt).toLocaleString('pt-br', {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

CardOne.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  saveSimulation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardOne);
