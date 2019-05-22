import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CategoriasActions } from '../../store/ducks/categorias';

const TableCard = ({
  children,
  materialIcon,
  color,
  options,
  categoria,
  removeCategoriaRequest,
}) => {
  const handleDelete = () => {
    if (
      !window.confirm(
        'Esta categoria pode conter itens e lancamnentos atrelados a ela, tem certeza que deseja excluir?',
      )
    ) return;
    removeCategoriaRequest(categoria._id, categoria.orcado, categoria.realizado, categoria.tipo);
  };
  return (
    <>
      <div className="card">
        <div className={`card-header card-header-icon card-header-${color}`}>
          <div className="card-icon">
            <i className="material-icons">{materialIcon}</i>
          </div>

          {options && (
            <div className="pull-right">
              <button
                onClick={handleDelete}
                type="button"
                className="btn btn-danger btn-link btn-just-icon btn-sm"
              >
                <i className="material-icons">close</i>
              </button>
            </div>
          )}
        </div>

        <div className="card-body">{children}</div>
      </div>
    </>
  );
};

TableCard.propTypes = {
  children: PropTypes.node,
  materialIcon: PropTypes.string,
  color: PropTypes.string,
  options: PropTypes.bool,
  removeCategoriaRequest: PropTypes.func.isRequired,
  categoria: PropTypes.shape({
    _id: PropTypes.string,
    orcado: PropTypes.number,
    realizado: PropTypes.number,
  }),
};

TableCard.defaultProps = {
  children: '',
  materialIcon: 'attach_money',
  color: 'grafit',
  options: true,
  categoria: {},
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(CategoriasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableCard);
