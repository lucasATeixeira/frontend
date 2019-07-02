import React from 'react';
import PropTypes from 'prop-types';

export default function Card({
  color, faIcon, title, info, textColor, footer,
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
        {footer.map(f => (
          <div key={Math.random()} className="stats">
            <i className="material-icons">{f.materialIcon}</i>
            <strong>{f.text}</strong>
          </div>
        ))}
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
  footer: PropTypes.arrayOf(PropTypes.shape()),
};

Card.defaultProps = {
  color: 'info',
  faIcon: 'fa-usd',
  title: 10,
  info: 'info',
  textColor: '',
  footer: [
    {
      materialIcon: 'shopping_cart',
      text: '',
    },
  ],
};
