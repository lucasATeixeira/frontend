import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';

const Options = ({
  icon, title, startSimulation, type,
}) => (
  <div className="col-md-2 ml-auto mr-auto">
    <div className="card card-pricing bg-success">
      <div className="card-body ">
        <div className="card-icon">
          <i className="material-icons">{icon}</i>
        </div>
        <strong>
          <h5 className="card-title">{title}</h5>
        </strong>
        <button
          onClick={() => startSimulation(type)}
          type="button"
          className="btn btn-white btn-round"
        >
          Botão
        </button>
      </div>
    </div>
  </div>
);

Options.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  startSimulation: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options);
