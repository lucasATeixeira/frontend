import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ content }) => (
  <>
    <div className="col-md-3">
      <h3 className="text-center">Plano</h3>
    </div>
    <div className="col-md-3">
      <h3 className="text-center text-info">Orçamento</h3>
    </div>
    <div className="col-md-3">
      <h3 className="text-center text-success">Patrimônio</h3>
    </div>
  </>
);

Info.propTypes = {
  content: PropTypes.shape(),
};

Info.defaultProps = {
  content: {},
};

export default Info;
