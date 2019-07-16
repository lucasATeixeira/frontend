/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Creators as SimulacaoActions } from '../../../../../store/ducks/simulacao';
import CardOne from './CardOne';
import DividasTable from '../../DividasTable';

const StageTwo = ({ simulacao, saveSimulation, submitSimulationRequest }) => {
  const { currentSimulation } = simulacao;
  const handleClick = () => {
    if (!currentSimulation.estrategia) return toast.error('Escolha uma Estratégia', { containerId: 'alerts' });
    return submitSimulationRequest(currentSimulation);
  };
  const moradia = [
    { id: 'aluguel', title: 'Morar de Aluguel' },
    { id: 'outra moradia', title: 'Comprar um mais barato' },
  ];
  const transporte = [
    { id: 'uber', title: 'Andar de Uber' },
    { id: 'outro carro', title: 'Comprar um mais barato' },
    { id: 'assinatura', title: 'Assinatura de um carro' },
  ];
  const outros = [{ id: 'outro bem', title: 'Comprar outro Bem' }, { id: 'nada', title: 'Nada' }];
  const handleChange = (e) => {
    saveSimulation({
      ...currentSimulation,
      estrategia: e.target.value,
      patrimonios: currentSimulation.patrimonios.filter(
        p => p._id === currentSimulation.checked._id,
      ),
      itens: [],
      saldo: simulacao.saldo + currentSimulation.checked.valor,
      patrimoniosRemovidos: currentSimulation.patrimoniosRemovidos.filter(
        p => p._id === currentSimulation.checked._id,
      ),
    });
  };
  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-4">
          <span className="bmd-form-group">
            <select
              className="form-control"
              data-style="select-with-transition"
              data-size="7"
              data-live-search="true"
              name="estrategia"
              onChange={handleChange}
            >
              <option value="plano">Plano</option>
              {!currentSimulation.checked.categoria ? (
                <>
                  {outros.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.title}
                    </option>
                  ))}
                </>
              ) : currentSimulation.checked.categoria === 'transporte' ? (
                <>
                  {transporte.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.title}
                    </option>
                  ))}
                </>
              ) : (
                <>
                  {moradia.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.title}
                    </option>
                  ))}
                </>
              )}
            </select>
          </span>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-6">
          <CardOne />
        </div>
        <div className="col-md-6">
          <DividasTable />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button
            onClick={handleClick}
            className="btn btn-round pull-right btn-success"
            type="button"
          >
            <strong>Salvar</strong>
          </button>
        </div>
      </div>
    </>
  );
};

StageTwo.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  saveSimulation: PropTypes.func.isRequired,
  submitSimulationRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StageTwo);
