import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Progress = ({ content }) => {
  const [blueBar, setBlueBar] = useState(0);
  const [redBar, setRedBar] = useState(0);
  const [grey, setGrey] = useState(false);

  useEffect(() => {
    setGrey(content.orcado === 0 && content.realizado !== 0);
    let red = 0;
    let blue = 0;
    if (content.orcado !== 0) {
      blue = content.realizado === 0 ? 0 : (content.realizado * 100) / content.orcado;
      if (blue > 200) blue = 200;
      if (blue > 100) {
        red = blue - 100;
        blue = 100 - red;
      }
    }
    setBlueBar(blue);
    setRedBar(red);
  }, [content]);
  return (
    <div className="progress-container">
      <span className="progress-badge">
        <strong>{content.nome}</strong>
      </span>
      <span className="progress-badge pull-right">
        {content.realizado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} /{' '}
        {content.orcado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </span>
      <div className="progress">
        <div
          className={`progress-bar progress-bar-${grey ? 'grafit' : 'info'}`}
          role="progressbar"
          style={{ width: `${grey ? '100' : blueBar}%` }}
        />
        <div
          className="progress-bar progress-bar-danger"
          role="progressbar"
          style={{ width: `${redBar}%` }}
        />
      </div>
    </div>
  );
};

Progress.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default Progress;
