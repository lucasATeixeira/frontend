import React from 'react';
import PropTypes from 'prop-types';
import MmdResultCard from './MmdResultCard';

export default function PersonResultMmd({ mmd }) {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <MmdResultCard mmd={mmd} />
        </div>
      </div>
    </>
  );
}

PersonResultMmd.propTypes = {
  mmd: PropTypes.shape().isRequired,
};
