import React from 'react';
import PropTypes from 'prop-types';
import One from './One';
import Two from './Two';

const RecExt = ({ content }) => (
  <div className="row">
    <div className="col-md-6">
      <One content={content} />
    </div>
    <div className="col-md-6">
      <Two content={content} />
    </div>
  </div>
);

RecExt.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default RecExt;
