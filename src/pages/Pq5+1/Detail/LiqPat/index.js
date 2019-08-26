import React from 'react';
import PropTypes from 'prop-types';
import One from './One';
import Two from './Two';
import Three from './Three';
import DividasTable from '../DividasTable';

const LiqPat = ({ content }) => (
  <>
    <div className="row">
      <div className="col-lg-6 col-md-12 col-sm-12">
        <One content={content} />
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12">
        <Two content={content} />
      </div>
    </div>
    <div className="row">
      <div className="col-lg-5 col-md-12 col-sm-12">
        <Three content={content} />
      </div>
      <div className="col-lg-7 col-md-12 col-sm-12">
        <DividasTable content={content} />
      </div>
    </div>
  </>
);

LiqPat.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default LiqPat;
