import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderIcon({ color, materialIcon, children }) {
  return (
    <div className="card">
      <div className={`card-header card-header-icon card-header-${color}`}>
        <div className="card-icon">
          <i className="material-icons">{materialIcon}</i>
        </div>
      </div>

      <div className="card-body">{children}</div>
    </div>
  );
}

HeaderIcon.propTypes = {
  color: PropTypes.string,
  materialIcon: PropTypes.string,
  children: PropTypes.node,
};

HeaderIcon.defaultProps = {
  color: 'primary',
  materialIcon: 'attach_money',
  children: '',
};
