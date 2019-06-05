import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Stage from './Stage';

const LiqPat = ({ simulation }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <h2>Liquidação Patrimonial {simulation.stage} / x</h2>
      </div>
    </div>
    <Stage />
  </>
);

LiqPat.propTypes = {
  simulation: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  simulation: state.simulacao.currentSimulation,
});

export default connect(mapStateToProps)(LiqPat);
