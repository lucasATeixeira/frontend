import React from 'react';
import PropTypes from 'prop-types';

const TypeCard = ({ content }) => {
  let title = '';
  let icon = '';
  let description = '';
  if (content.type === 'lp') {
    title = 'Liquidação Patrimonial';
    icon = 'business';
    description = 'descrição aqui';
  }
  if (content.type === 'ea') {
    title = 'Empréstimo entre Amigos';
    icon = 'group';
    description = 'descrição aqui';
  }
  if (content.type === 're') {
    title = 'Recebimentos Extras';
    icon = 'attach_money';
    description = 'descrição aqui';
  }
  if (content.type === 'cd') {
    title = 'Consolidação de dívidas';
    icon = 'file_copy';
    description = 'descrição aqui';
  }
  return (
    <div className="col-md-3">
      <div className="card card-pricing bg-success">
        <div className="card-body ">
          <div className="card-icon">
            <i className="material-icons">{icon}</i>
          </div>
          <h3 className="card-title">
            <strong>{title}</strong>
          </h3>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

TypeCard.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default TypeCard;
