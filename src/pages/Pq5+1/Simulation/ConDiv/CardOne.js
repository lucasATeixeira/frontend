/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input';
import { Creators as SimulacaoActions } from '../../../../store/ducks/simulacao';

const CardOne = ({ simulacao, saveSimulation }) => {
  const { currentSimulation } = simulacao;
  const [nome, setNome] = useState('Consignado');
  const [necessario, setNecessario] = useState(0);
  const [newFinanciamento, setNewFinanciamento] = useState(true);
  const [instituicao, setInstituicao] = useState('');
  const [parcelas, setParcelas] = useState(1);
  const [taxa, setTaxa] = useState(0);
  const [carencia, setCarencia] = useState(0);
  const [pmt, setPmt] = useState(0);

  useEffect(() => {
    setPmt(
      isNaN(
        (necessario * (1 + taxa / 100) ** carencia * (taxa / 100)) /
          (1 - (1 + taxa / 100) ** -parcelas)
      )
        ? isFinite(necessario / parcelas)
          ? necessario / parcelas
          : 0
        : isFinite(
            (necessario * (1 + taxa / 100) ** carencia * (taxa / 100)) /
              (1 - (1 + taxa / 100) ** -parcelas)
          )
        ? (necessario * (1 + taxa / 100) ** carencia * (taxa / 100)) /
          (1 - (1 + taxa / 100) ** -parcelas)
        : 0
    );
  }, [necessario, taxa, parcelas, carencia]);

  useEffect(() => {
    if (!currentSimulation.patrimonios.length) setNewFinanciamento(true);
    if (currentSimulation.patrimonios.length) setNewFinanciamento(false);
  }, [currentSimulation.patrimonios]);

  const handleDelete = () =>
    saveSimulation({
      ...currentSimulation,
      patrimonios: [],
      patrimoniosRemovidos: [],
      saldo: simulacao.saldo,
    });

  const handleSubmit = e => {
    e.preventDefault();
    if (parcelas <= 0)
      return toast.error('Parcelas deve ser maior que zero', {
        containerId: 'alerts',
      });
    if (!instituicao)
      return toast.error('Coloque um Nome', { containerId: 'alerts' });
    const id = Math.random();
    saveSimulation({
      ...currentSimulation,
      saldo: simulacao.saldo + necessario,
      patrimoniosRemovidos: [],
      patrimonios: [
        {
          _id: id,
          nome,
          tipo: 'passivo',
          classificacao: 'financeiro',
          instituicao,
          pmt,
          carencia,
          necessario,
          parcelas,
          data: moment(),
          dataFinal: moment().add(parcelas - 1, 'month'),
          taxa,
          total: pmt * parcelas,
        },
      ],
    });
    setInstituicao('');
    setParcelas(1);
    setTaxa(0);
    setNecessario(0);
    return setCarencia(0);
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
                        <strong>Tipo do Empréstimo</strong>
                      </th>
                      <th className="text-success">
                        <strong>Instituição</strong>
                      </th>
                      <th className="text-success">
                        <strong>Valor do Empréstimo</strong>
                      </th>
                      <th className="text-success">
                        <strong>Parcelas</strong>
                      </th>
                      <th className="text-success">
                        <strong>Taxa</strong>
                      </th>
                      <th className="text-success">
                        <strong>Carência</strong>
                      </th>
                      <th className="text-success">
                        <strong>PMT</strong>
                      </th>
                      <th className="text-success">
                        <strong>Total com Juros</strong>
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
                          {c.necessario.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td>{c.parcelas}</td>
                        <td>{c.taxa}%</td>
                        <td>{c.carencia}</td>
                        <td>
                          {c.pmt.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
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
                          <select
                            className="form-control"
                            data-style="btn btn-link"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                          >
                            <option>Consignado</option>
                            <option>Crédito Pessoal</option>
                            <option>Refinanciamento</option>
                          </select>
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
                              value={necessario}
                              onChangeEvent={(e, mv, fv) => setNecessario(fv)}
                              className="form-control"
                              decimalSeparator=","
                              thousandSeparator="."
                              precision="2"
                              prefix="R$"
                            />
                          </span>
                        </td>
                        <td>
                          {
                            <span className="bmd-form-group">
                              <input
                                value={parcelas}
                                onChange={e => setParcelas(e.target.value)}
                                type="number"
                                placeholder="P. Restantes"
                                className="form-control"
                              />
                            </span>
                          }
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
                        <td>
                          <span className="bmd-form-group">
                            <input
                              value={carencia}
                              onChange={e => setCarencia(e.target.value)}
                              type="number"
                              placeholder="Carência"
                              className="form-control"
                            />
                          </span>
                        </td>

                        <td>
                          {pmt.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td>
                          {(pmt * parcelas).toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td className="text-center">
                          <button
                            type="submit"
                            className="btn btn-success btn-sm"
                          >
                            <i className="material-icons">add_circle_outline</i>
                            <strong>Adicionar</strong>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardOne);
