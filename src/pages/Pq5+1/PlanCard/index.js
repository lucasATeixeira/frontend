/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TypeCard from './TypeCard';
import Info from './Info';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';

const PlanCard = ({ content, removeSimulationRequest }) => {
  const handleClick = () => {
    if (!window.confirm('Você tem certeza que deseja excluir?')) return;
    removeSimulationRequest(content);
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div style={{ position: 'absolute', right: '0' }} className="card-header">
            <div>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-danger btn-link btn-just-icon btn-sm"
              >
                <i className="material-icons">close</i>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <TypeCard content={content} />
              <Info content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  content: PropTypes.shape(),
  removeSimulationRequest: PropTypes.func.isRequired,
};

PlanCard.defaultProps = {
  content: {},
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanCard);
