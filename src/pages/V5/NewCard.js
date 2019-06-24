/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { Creators as V5Actions } from '../../store/ducks/v5';

const NewCard = ({ addV5Request, setNewCard }) => {
  const handleSubmit = (data) => {
    const { image, title, description } = data;
    if (!image) return alert('Insira o campo url da imagem');
    if (!title) return alert('Insira o campo do título');
    if (!description) return alert('Insira uma descrição');
    addV5Request({ image_url: image, title, description });
    return setNewCard(false);
  };

  return (
    <div className="col-md-4">
      <Form onSubmit={handleSubmit}>
        <div className="card card-product">
          <div className="card-header card-header-image">
            <a href="#p">
              <img className="img" alt="Imagem sonho" src="../assets/img/card-2.jpg" />
            </a>
          </div>
          <div className="card-body">
            <h4 className="card-title">
              <a href="#p">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <Input
                      name="image"
                      type="text"
                      placeholder="URL da imagem"
                      className="form-control"
                    />
                  </div>
                </div>
              </a>
            </h4>
            <br />
            <h4 className="card-title">
              <a href="#p">
                <div className="row">
                  <div className="col-md-8 ml-auto mr-auto">
                    <Input name="title" type="text" placeholder="Título" className="form-control" />
                  </div>
                </div>
              </a>
            </h4>
            <div className="card-description">
              <div className="row">
                <div className="col-md-11 ml-auto mr-auto">
                  <Textarea
                    name="description"
                    className="form-control"
                    placeholder="Descrição..."
                  />
                </div>
                <button
                  style={{ position: 'absolute', right: '10px' }}
                  type="submit"
                  className="btn btn-success btn-round btn-sm btn-just-icon"
                >
                  <i className="material-icons" role="button" tabIndex="0">
                    done
                  </i>
                </button>
              </div>
            </div>
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
      </Form>
    </div>
  );
};

NewCard.propTypes = {
  addV5Request: PropTypes.func.isRequired,
  setNewCard: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(V5Actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewCard);
