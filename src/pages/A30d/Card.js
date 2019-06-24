import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ content }) => (
  <div style={{ paddingTop: '30px' }} className="card card-product">
    <div className="card-header card-header-image">
      <a href="#p">
        <img className="img" alt="Imagem sonho" src={content.image_url} />
      </a>
    </div>
    <div className="card-body">
      <h4 className="card-title">
        <a href="#p">{content.title}</a>
      </h4>
      <div className="card-description">{content.description}</div>
    </div>
    <div className="card-footer">
      <div className="stats">
        <p className="card-category">
          <i className="material-icons">calendar_today</i>
        </p>
      </div>
      <div className="stats">
        <p className="card-category">
          <i className="material-icons">alarm</i>
        </p>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default Card;
