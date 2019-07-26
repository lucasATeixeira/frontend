import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast, ToastContainer } from 'react-toastify';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';

const Options = ({
  icon, title, startSimulation, type, destaque, simulacao,
}) => (
  <div className="col-xl-2 col-lg-6 col-md-6 ml-auto mr-auto">
    <div className="card card-pricing ">
      <div className={`card-body ${destaque && 'bg-info'}`}>
        <div className={`card-icon icon-${destaque ? 'black' : 'info'}`}>
          <i className="material-icons">{icon}</i>
        </div>
        <strong>
          <h5 className="card-title">
            <ToastContainer autoClose={3000} />
            <strong>{title}</strong>
          </h5>
        </strong>
        <br />

        <button
          onClick={() => {
            if (type === 'eg') return startSimulation(type);
            if (!simulacao.simulacoes.length) {
              return toast.error('Antes de simular alguma estratégia, tente enxugar seus gastos', {
                containerId: 'alerts',
              });
            }
            return startSimulation(type);
          }}
          type="button"
          className={`btn btn-${destaque ? 'white' : 'info'} btn-round`}
        >
          <strong>Iniciar</strong>
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
  destaque: PropTypes.bool,
  simulacao: PropTypes.shape().isRequired,
};

Options.defaultProps = {
  destaque: false,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Options);
