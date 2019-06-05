import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SimulacaoActions } from '../../store/ducks/simulacao';
import { Container } from './style';

const LoadSimulation = ({ fetchDataRequest }) => (
  <Container>
    <button onClick={fetchDataRequest} className="btn btn-round pull-right btn-info" type="button">
      <strong>Carregar Simulação</strong>
    </button>
  </Container>
);

LoadSimulation.propTypes = {
  fetchDataRequest: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadSimulation);
