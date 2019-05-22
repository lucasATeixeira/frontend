import React from 'react';
import PropTypes from 'prop-types';

export default function Card({
  color,
  faIcon,
  title,
  info,
  textColor,
  materialIcon,
  footerText,
  setActive,
  type,
}) {
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => setActive(type)}
      onKeyPress={() => setActive(type)}
      role="button"
      tabIndex="0"
      className="card card-stats"
    >
      <div className={`card-header card-header-icon card-header-${color}`}>
        <div className="card-icon">
          <i className={`fa ${faIcon}`} />
        </div>
        <p className="card-category">{info}</p>
        <h3 className={`card-title ${textColor}`}>
          <strong>{title}</strong>
        </h3>
      </div>

      <div className="card-footer">
        <div className="stats">
          <i className="material-icons">{materialIcon}</i>
          {footerText}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  color: PropTypes.string,
  faIcon: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
  textColor: PropTypes.string,
  materialIcon: PropTypes.string,
  footerText: PropTypes.string,
  setActive: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
};

Card.defaultProps = {
  color: 'info',
  faIcon: 'fa-usd',
  title: 'título',
  info: 'info',
  textColor: '',
  materialIcon: 'bar_chart',
  footerText: '',
};
