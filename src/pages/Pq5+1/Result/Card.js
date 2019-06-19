import React from 'react';
import PropTypes from 'prop-types';

export default function Card({
  color, faIcon, title, info, textColor, materialIcon, footerText,
}) {
  return (
    <div role="button" tabIndex="0" className="card card-stats">
      <div className={`card-header card-header-icon card-header-${color}`}>
        <div className="card-icon">
          <i className={`fa ${faIcon}`} />
        </div>
        <p className="card-category">{info}</p>
        <h3 className={`card-title ${textColor}`}>
          <strong>{title.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong>
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
  title: PropTypes.number,
  info: PropTypes.string,
  textColor: PropTypes.string,
  materialIcon: PropTypes.string,
  footerText: PropTypes.string,
};

Card.defaultProps = {
  color: 'info',
  faIcon: 'fa-usd',
  title: 10,
  info: 'info',
  textColor: '',
  materialIcon: 'bar_chart',
  footerText: '',
};
