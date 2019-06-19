import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as SimulacaoActions } from '../../store/ducks/simulacao';
import PlanCard from './PlanCard';
import NewPlan from './NewPlan';

const Main = ({ simulacao, startResult }) => {
  const [newPlan, setNewPlan] = useState(false);
  return (
    <>
      <h2>
        Saldo:{' '}
        {simulacao.saldo.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </h2>

      <div className="row">
        <div className="col-md-12">
          <button
            onClick={() => startResult(true)}
            className="btn btn-round pull-right btn-success btn-sm pull-left"
            type="button"
          >
            <strong>Resultados </strong>
          </button>
        </div>
      </div>

      {simulacao.simulacoes.map(s => (
        <PlanCard key={s._id} content={s} />
      ))}

      {newPlan && (
        <>
          <NewPlan />
          <div className="row">
            <div className="col-md-12">
              <button
                onClick={() => setNewPlan(false)}
                className="btn btn-round pull-right btn-success pull-left"
                type="button"
              >
                <strong>Voltar</strong>
              </button>
            </div>
          </div>
        </>
      )}
      {!newPlan && (
        <div className="row">
          <div className="col-md-12">
            <button
              onClick={() => setNewPlan(true)}
              className="btn btn-round pull-right btn-success pull-left"
              type="button"
            >
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Main.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  startResult: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
