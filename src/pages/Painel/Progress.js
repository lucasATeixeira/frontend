import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Progress = ({ content }) => {
  const [blue, setBlue] = useState(0);
  const [red, setRed] = useState(0);

  console.log(content.nome, blue);

  useEffect(() => {
    setBlue(
      (content.realizado * 100) / content.orcado > 100
        ? 200 - content.realizado / content.orcado < 0
          ? 0
          : 200 - content.realizado / content.orcado
        : (content.realizado * 100) / content.orcado,
    );
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
          className="progress-bar progress-bar-info"
          role="progressbar"
          style={{ width: `${blue}%` }}
        />
        <div
          className="progress-bar progress-bar-danger"
          role="progressbar"
          style={{ width: `${red}%` }}
        />
      </div>
    </div>
  );
};

Progress.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default Progress;
