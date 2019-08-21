import React from 'react';
import PropTypes from 'prop-types';
import CrencaResultCard from './CrencaResultCard';

export default function PersonResultCrenca({ crenca }) {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <CrencaResultCard crenca={crenca} />
        </div>
      </div>
    </>
  );
}

PersonResultCrenca.propTypes = {
  crenca: PropTypes.shape().isRequired,
};
