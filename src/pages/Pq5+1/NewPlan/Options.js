import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';

const Options = ({
  icon, title, description, startSimulation, type,
}) => (
  <div className="col-md-3 ml-auto mr-auto">
    <div className="card card-pricing bg-success">
      <div className="card-body ">
        <div className="card-icon">
          <i className="material-icons">{icon}</i>
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
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
  description: PropTypes.string.isRequired,
  startSimulation: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options);
