import React from 'react';
import PropTypes from 'prop-types';
import Plano from './Plano';
import Orcamento from './Orcamento';
import Patrimonio from './Patrimonio';

const Info = ({ content }) => (
  <>
    <Plano content={content} />
    <Orcamento content={content} />
    <Patrimonio content={content} />
  </>
);

Info.propTypes = {
  content: PropTypes.shape(),
};

Info.defaultProps = {
  content: {},
};

export default Info;
