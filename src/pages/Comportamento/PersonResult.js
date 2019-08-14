import React from 'react';
import PropTypes from 'prop-types';
import CrencaResultCard from './CrencaResultCard';

export default function PersonResult({ crenca }) {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h2>Comportamento {crenca.name}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <CrencaResultCard crenca={crenca} />
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md-12">
          <ResultCard />
        </div>
      </div> */}
    </>
  );
}

PersonResult.propTypes = {
  crenca: PropTypes.shape().isRequired,
};
