import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as V5Actions } from '../../store/ducks/v5';

const Card = ({ content, removeV5Request }) => {
  const handleDelete = () => {
    removeV5Request(content);
  };
  return (
    <div className="col-md-4">
      <div className="card card-product">
        <div className="card-header card-header-image" data-header-animation="true">
          <a href="#p">
            <img className="img" alt="Imagem sonho" src={content.image_url} />
          </a>
        </div>
        <div className="card-body">
          <div className="card-actions text-center">
            <button type="button" className="btn btn-danger btn-link fix-broken-card">
              <i className="material-icons">build</i> Fix Header!
            </button>

            <button
              type="button"
              className="btn btn-success btn-link btn-edit"
              data-toggle="modal"
              data-target="#edicao_modal-investimentos"
            >
              <i className="material-icons">edit</i>
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className="btn btn-danger btn-link btn-remove"
            >
              <i className="material-icons">close</i>
            </button>
          </div>
          <h4 className="card-title">
            <a href="#p">{content.title}</a>
          </h4>
          <div className="card-description">{content.description}</div>
        </div>
        {/* <div className="card-footer">
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
        </div> */}
      </div>
    </div>
  );
};

Card.propTypes = {
  content: PropTypes.shape().isRequired,
  removeV5Request: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(V5Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);
