/* eslint-disable no-alert */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';
import moment from 'moment';
import { Creators as SimulacaoActions } from '../../../../store/ducks/simulacao';


const CardOne = ({ simulacao, categorias, saveSimulation }) => {  
  const { currentSimulation } = simulacao;
  const [newRecebimento, setNewRecebimento] = useState(false);
  const [nome, setNome] = useState('');
  const [orcado, setOrcado] = useState(0);
  const [recorrencia, setRecorrencia] = useState(1);
  const handleSubmit = (e) => {
    if (recorrencia <= 0) return alert('Recorrência não pode ser igual ou menor que zero');
    e.preventDefault();
    const id = Math.random();
    saveSimulation({
      ...currentSimulation,
      itensRemovidos: [],
      patrimonios: [{
        _id: id,
        nome: `Saldo do Recebimento Extra: ${nome}`,
        tipo: 'passivo',
        classificacao: 'financeiro',
        instituicao: 'recebimentos',
        pmt: 0,
        carencia: 0,
        necessario: orcado,
        parcelas: 1,
        data: moment(),
        dataFinal: moment(),
        taxa: 0,
        total: 0,
      }],
      patrimoniosRemovidos: [],
      itens: [
        {
          nome,
          orcado,
          recorrencia,
          classificacao: 'Eventual',
          mensal: orcado / recorrencia,
          _id: id,
        },
      ],
      checked: {
        nome,
        orcado,
        recorrencia,
        classificacao: 'Eventual',
        mensal: orcado / recorrencia,
        _id: id,
      },
      saldo: simulacao.saldo + orcado,
    });
    return setNewRecebimento(false);
  };
  const handleChange = (i, type) => {
    saveSimulation({
      ...simulacao.currentSimulation,
      itensRemovidos: type === 'removidos' ? [i] : [],
      itens: type === 'add' ? [i] : [],
      patrimonios: [{
        _id: i._id,
        nome: `Saldo do Recebimento Extra: ${i.nome}`,
        tipo: 'passivo',
        classificacao: 'financeiro',
        instituicao: 'recebimentos',
        pmt: 0,
        carencia: 0,
        necessario: i.orcado,
        parcelas: 1,
        data: moment(),
        dataFinal: moment(),
        taxa: 0,
        total: 0,
      }],
      checked: i,
      patrimoniosRemovidos: [],
      saldo: simulacao.saldo + i.orcado,
    });
  };
  return (
    <div className="card">
      <div className="card-header card-header-text card-header-grafit">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Recebimentos</strong>
          </h4>
        </div>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              <form onSubmit={handleSubmit}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Orçado</th>
                      <th>Recorrência</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorias
                      .filter(c => c.tipo === 'recebimento')
                      .map(c => c.itens
                        .filter(
                          i => i.classificacao === 'Eventual'
                              && !simulacao.itensRemovidos.map(ir => ir._id).includes(i._id),
                        )
                        .map(i => (
                          <tr key={i._id}>
                            <td>{i.nome}</td>
                            <td>
                              {i.orcado.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td>{i.recorrencia}</td>
                            <td className="td-actions text-right">
                              <div className="form-check">
                                <label htmlFor={i._id} className="form-check-label">
                                  <input
                                    id={i._id}
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={currentSimulation.itensRemovidos.includes(i)}
                                    onChange={() => handleChange(i, 'removidos')}
                                  />
                                  <span className="form-check-sign">
                                    <span className="check" />
                                  </span>
                                </label>
                              </div>
                            </td>
                          </tr>
                        )))}
                    {currentSimulation.itens.map(i => (
                      <tr key={i._id}>
                        <td>{i.nome}</td>
                        <td>
                          {i.orcado.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </td>
                        <td>{i.recorrencia}</td>
                        <td className="td-actions text-right">
                          <div className="form-check">
                            <label htmlFor={i._id} className="form-check-label">
                              <input
                                id={i._id}
                                className="form-check-input"
                                type="checkbox"
                                checked={currentSimulation.itens.includes(i)}
                                onChange={() => handleChange('add', i)}
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {newRecebimento && (
                      <tr>
                        <td>
                          <span className="bmd-form-group">
                            <input
                              value={nome}
                              onChange={e => setNome(e.target.value)}
                              type="text"
                              placeholder="Nome do Recebimento"
                              className="form-control"
                            />
                          </span>
                        </td>
                        <td>
                          <span className="bmd-form-group">
                            <CurrencyInput
                              value={orcado}
                              onChangeEvent={(e, mv, fv) => setOrcado(fv)}
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
                              value={recorrencia}
                              onChange={e => setRecorrencia(e.target.value)}
                              type="number"
                              placeholder="Recorrência"
                              className="form-control"
                            />
                          </span>
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
              onClick={() => setNewRecebimento(true)}
              type="button"
              className="btn btn-grafit btn-sm"
            >
              <strong>
                <i className="material-icons">add_circle_outline</i> Adicionar Recebimento
              </strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CardOne.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  categorias: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveSimulation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
  categorias: state.categorias.categorias,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardOne);
