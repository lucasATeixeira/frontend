/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TableAtivos from './TableAtivos';
import TableOrcamento from './TableOrcamento';
import { Creators as SimulacaoActions } from '../../../../../store/ducks/simulacao';

const StageOne = ({ simulacao, saveSimulation }) => {
  const handleClick = () => {
    if (!simulacao.currentSimulation.checked && simulacao.currentSimulation.stage === 1) return toast.error('Você deve selecionar um patrimônio', { containerId: 'alerts' });
    return saveSimulation({
      ...simulacao.currentSimulation,
      stage: simulacao.currentSimulation.stage + 1,
    });
  };
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <TableAtivos />
        </div>
        <div className="col-md-6">
          <TableOrcamento />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button
            onClick={handleClick}
            className="btn btn-round pull-right btn-success"
            type="button"
          >
            <strong>Próximo Estágio</strong>
          </button>
        </div>
      </div>
    </>
  );
};

StageOne.propTypes = {
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
)(StageOne);
