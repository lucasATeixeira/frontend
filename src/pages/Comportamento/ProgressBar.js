import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressBar({ resultContent }) {
  return (
    <div className="progress-container">
      <span className="progress-badge">
        Nível de {resultContent.cat.toUpperCase()}: {Math.round(resultContent.score)}%
      </span>
      <div className="progress">
        <div
          className="progress-bar progress-bar-danger"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${resultContent.score}%` }}
        />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  resultContent: PropTypes.shape().isRequired,
};
