import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';
import Type from './Type';

const Simulation = ({ endSimulation }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <button
          onClick={() => endSimulation()}
          className="btn btn-grafiti btn-link btn-just-icon btn-sm"
          type="button"
        >
          <i className="fa fa-arrow-left" />
        </button>
      </div>
    </div>
    <Type />
  </>
);

Simulation.propTypes = {
  endSimulation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Simulation);
