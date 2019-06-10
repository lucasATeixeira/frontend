/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Stage from './Stage';

const LiqPat = ({ simulacao }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <h2>Liquidação Patrimonial</h2>
        <h4>
          Saldo:{' '}
          {simulacao.currentSimulation.saldo.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </h4>
      </div>
    </div>
    <Stage />
  </>
);

LiqPat.propTypes = {
  simulacao: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

export default connect(mapStateToProps)(LiqPat);
