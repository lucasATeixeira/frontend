import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TopInfo = ({ simulacao }) => (
  <h4>
    Saldo:{' '}
    {simulacao.currentSimulation.saldo.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })}
  </h4>
);

TopInfo.propTypes = {
  simulacao: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

export default connect(mapStateToProps)(TopInfo);
