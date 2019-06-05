import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StageOne from './StageOne';

const Stage = ({ stage }) => {
  switch (stage) {
    case 1:
      return <StageOne />;
    default:
      return null;
  }
};

Stage.propTypes = {
  stage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  stage: state.simulacao.currentSimulation.stage,
});

export default connect(mapStateToProps)(Stage);
