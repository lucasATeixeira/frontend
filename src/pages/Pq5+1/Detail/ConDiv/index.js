import React from 'react';
import PropTypes from 'prop-types';
import One from './One';
import DividasTable from '../DividasTable';

const ConDiv = ({ content }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <One content={content} />
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <DividasTable content={content} />
      </div>
    </div>
  </>
);

ConDiv.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default ConDiv;
