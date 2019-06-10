import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlanCard from './PlanCard';
import NewPlan from './NewPlan';

const Main = ({ simulacao }) => {
  const [newPlan, setNewPlan] = useState(false);
  return (
    <>
      <h2>
        Saldo:{' '}
        {(simulacao.ativos - simulacao.passivos).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </h2>
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
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

export default connect(mapStateToProps)(Main);
