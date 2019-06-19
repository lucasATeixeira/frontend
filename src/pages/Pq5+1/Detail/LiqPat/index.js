import React from 'react';
import PropTypes from 'prop-types';
import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';

const LiqPat = ({ content }) => (
  <>
    <div className="row">
      <div className="col-md-6">
        <One content={content} />
      </div>
      <div className="col-md-6">
        <Two content={content} />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <Three content={content} />
      </div>
      <div className="col-md-6">
        <Four content={content} />
      </div>
    </div>
  </>
);

LiqPat.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default LiqPat;
