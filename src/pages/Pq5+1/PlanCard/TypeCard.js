import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';

const TypeCard = ({ content, startDetails }) => {
  let title = '';
  let icon = '';
  if (content.type === 'lp') {
    title = 'Liquidação Patrimonial';
    icon = 'business';
  }
  if (content.type === 'ea') {
    title = 'Empréstimo entre Amigos';
    icon = 'group';
  }
  if (content.type === 're') {
    title = 'Recebimentos Extras';
    icon = 'attach_money';
  }
  if (content.type === 'cd') {
    title = 'Consolidação de dívidas';
    icon = 'file_copy';
  }

  if (content.type === 'eg') {
    title = 'Enxugar Gastos';
    icon = 'colorize';
  }
  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="card card-pricing bg-info">
        <div className="card-body ">
          <div className="card-icon">
            <i className="material-icons">{icon}</i>
          </div>
          <h3 className="card-title">
            <strong>{title}</strong>
          </h3>
          <button
            onClick={() => startDetails(content)}
            type="button"
            className="btn btn-white btn-round btn-sm"
          >
            <strong>Detalhes</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

TypeCard.propTypes = {
  content: PropTypes.shape().isRequired,
  startDetails: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TypeCard);
