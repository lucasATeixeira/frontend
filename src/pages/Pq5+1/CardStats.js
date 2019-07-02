import React from 'react';
import PropTypes from 'prop-types';

const CardStats = ({
  color, faIcon, title, info, textColor, footer,
}) => (
  <div role="button" tabIndex="0" className="card card-stats">
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
      {footer.map(f => (
        <div key={Math.random()} className="stats">
          <i className="material-icons">{f.materialIcon}</i>
          {f.text}
        </div>
      ))}
    </div>
  </div>
);

CardStats.propTypes = {
  color: PropTypes.string,
  faIcon: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
  textColor: PropTypes.string,
  footer: PropTypes.arrayOf(PropTypes.shape()),
};

CardStats.defaultProps = {
  color: 'info',
  faIcon: 'fa-usd',
  title: 'título',
  info: 'info',
  textColor: '',
  footer: [
    {
      materialIcon: 'shopping_cart',
      text: '',
    },
  ],
};

export default CardStats;
