import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as CategoriasActions } from '../../store/ducks/categorias';

import Table from './Table';
import Title from './Title';
import TableCard from './TableCard';

const Component = ({
  color, materialIcon, categorias, addCategoriaRequest,
}) => {
  const [addCategoria, setAddCategoria] = useState(false);
  const handleSubmit = (data) => {
    const { nome } = data;
    const tipo = color === 'info' ? 'gasto' : 'recebimento';
    addCategoriaRequest({ nome, tipo });
    setAddCategoria(false);
  };
  return (
    <>
      {color !== 'danger' && (
        <div className="row">
          <div className="col-md-12">
            <button
              type="button"
              onClick={() => setAddCategoria(true)}
              className={`btn btn-round btn-sm pull-right btn-${color}`}
            >
              <strong>Criar uma nova categoria</strong>
            </button>
          </div>
        </div>
      )}

      {categorias.map(c => (
        <div key={c._id} className="row">
          <div className="col-md-12">
            <TableCard
              categoria={c}
              color={color}
              options={color !== 'danger'}
              materialIcon={materialIcon}
            >
              <Title title={c.nome} pencil={color !== 'danger'} />
              <Table idCategoria={c._id} itens={c.itens} color={color} />
            </TableCard>
          </div>
        </div>
      ))}

      {addCategoria && (
        <div className="row">
          <div className="col-md-12">
            <TableCard options={false} color={color}>
              <br />
              <Form onSubmit={handleSubmit}>
                <span className="bmd-form-group">
                  <Input
                    name="nome"
                    type="text"
                    placeholder="Nome da Categoria"
                    className="form-control"
                  />
                </span>
                <br />
                <button type="submit" className={`btn btn-${color} btn-sm`}>
                  <strong>Criar</strong>
                </button>
                <button
                  type="button"
                  onClick={() => setAddCategoria(false)}
                  className="btn btn-danger btn-sm"
                >
                  <strong>Cancelar</strong>
                </button>
              </Form>
            </TableCard>
          </div>
        </div>
      )}
    </>
  );
};

Component.propTypes = {
  color: PropTypes.string,
  materialIcon: PropTypes.string,
  addCategoriaRequest: PropTypes.func.isRequired,
  categorias: PropTypes.arrayOf(
    PropTypes.shape({
      itens: PropTypes.arrayOf(PropTypes.shape()),
      nome: PropTypes.string,
      orcado: PropTypes.number,
      realizado: PropTypes.number,
      tipo: PropTypes.string,
      _id: PropTypes.string,
    }),
  ),
};

Component.defaultProps = {
  color: 'info',
  materialIcon: 'materialIcon',
  categorias: [],
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(CategoriasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
