import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CategoriaActions } from '../../store/ducks/categorias';

const Title = ({ categoria, pencil, updateCategoriaRequest }) => {
  const [editTitle, setEditTitle] = useState(false);
  const [valueEditTitle, setValueEditTitle] = useState(categoria.nome);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategoriaRequest({
      ...categoria,
      nome: valueEditTitle,
    });
    setEditTitle(false);
  };

  return (
    <>
      {editTitle && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={valueEditTitle}
              onChange={e => setValueEditTitle(e.target.value)}
              style={{ width: '20%' }}
              className="form-control"
            />
            <br />
          </form>
        </>
      )}

      {!editTitle && (
        <>
          <h4 className="card-title text-uppercase">
            <b>{categoria.nome} </b>
            {pencil && (
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setEditTitle(true)}
              >
                <i className="fa fa-pencil small" />
              </button>
            )}
          </h4>
          <br />
        </>
      )}
    </>
  );
};

Title.propTypes = {
  categoria: PropTypes.shape().isRequired,
  pencil: PropTypes.bool,
  updateCategoriaRequest: PropTypes.func.isRequired,
};

Title.defaultProps = {
  pencil: true,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(CategoriaActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Title);
