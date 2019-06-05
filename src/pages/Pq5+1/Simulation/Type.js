import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConDiv from './ConDiv';
import EmpAmig from './EmpAmig';
import LiqPat from './LiqPat';
import RecExt from './RecExt';

const Type = ({ type }) => {
  switch (type) {
    case 'lp':
      return <LiqPat />;
    case 'ea':
      return <EmpAmig />;
    case 're':
      return <RecExt />;
    case 'cd':
      return <ConDiv />;
    default:
      return null;
  }
};

Type.propTypes = {
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ type: state.simulacao.currentSimulation.type });

export default connect(mapStateToProps)(Type);
