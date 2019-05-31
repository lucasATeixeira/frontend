import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderText({
  color, title, children, total, showTotal,
}) {
  return (
    <div className="card">
      <div className={`card-header card-header-text card-header-${color}`}>
        <div className="card-text">
          <h4 className="card-title">
            <strong>{title}</strong>
          </h4>
        </div>
        {showTotal && (
          <h6 className={`pull-right card-title text-${color}`}>
            <strong>
              Total:
              {' '}
              {total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </strong>
          </h6>
        )}
      </div>

      <div className="card-body">{children}</div>
    </div>
  );
}

HeaderText.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  total: PropTypes.number,
  showTotal: PropTypes.bool,
};

HeaderText.defaultProps = {
  color: 'primary',
  title: 'title',
  children: '',
  total: 0,
  showTotal: true,
};
