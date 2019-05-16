import React from 'react';
import PropTypes from 'prop-types';

export default function MainPanel({ children }) {
  return <div className="main-panel">{children}</div>;
}

MainPanel.propTypes = {
  children: PropTypes.node,
};

MainPanel.defaultProps = {
  children: '',
};
