import React from 'react';
import PropTypes from 'prop-types';
import One from './One';
import DividasTable from '../DividasTable';

const RecExt = ({ content }) => (
  <div className="row">
    <div className="col-lg-6 col-md-12 col-sm-12">
      <One content={content} />
    </div>
    <div className="col-lg-6 col-md-12 col-sm-12">
      <DividasTable content={content} />
    </div>
  </div>
);

RecExt.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default RecExt;
