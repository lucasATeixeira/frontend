import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TopInfo from '../TopInfo';
import DividasTable from '../DividasTable';
import CardOne from './CardOne';
import { Creators as SimulacaoActions } from '../../../../store/ducks/simulacao';

const ConDiv = ({ simulacao, submitSimulationRequest }) => {
  const { currentSimulation } = simulacao;
  const handleClick = () => {
    if (!currentSimulation.patrimonios.length) return alert('Adicione uma consolidação');
    return submitSimulationRequest(currentSimulation);
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <h2>Consolidação de Dívidas</h2>
        <TopInfo />
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
      </div>
    </div>
  );
};

ConDiv.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  submitSimulationRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConDiv);
