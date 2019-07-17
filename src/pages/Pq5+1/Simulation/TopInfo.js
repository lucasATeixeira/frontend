import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const TopInfo = ({ simulacao }) => (
  <>
    <ReactTooltip place="right" type="info" />
    <h4>
      Saldo:{' '}
      {simulacao.currentSimulation.saldo.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}{' '}
      <i
        className="fa fa-question text-info"
        data-tip={`Com essa estratégia você tem ${simulacao.currentSimulation.saldo.toLocaleString(
          'pt-br',
          {
            style: 'currency',
            currency: 'BRL',
          },
        )} para eliminar uma dívida`}
      />
    </h4>
  </>
);

TopInfo.propTypes = {
  simulacao: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

export default connect(mapStateToProps)(TopInfo);
