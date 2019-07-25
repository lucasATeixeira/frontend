import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from '@rocketseat/unform';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { Creators as CategoriasActions } from '../../store/ducks/categorias';
import scrollHook from '../../hooks/scrollHook';

import Table from './Table';
import Title from './Title';
import TableCard from './TableCard';

const Component = ({
  color, materialIcon, categorias, addCategoriaRequest,
}) => {
  const [addCategoria, setAddCategoria] = useState(false);
  const handleSubmit = (data) => {
    const { nome, classificacao } = data;
    const tipo = color === 'info' ? 'gasto' : 'recebimento';
    if (color === 'info' && !classificacao) return toast.error('Indique a classificação da categoria', { containerId: 'alerts' });
    addCategoriaRequest({ nome, tipo, classificacao });
    return setAddCategoria(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <button
            type="button"
            onClick={() => {
              setAddCategoria(true);
            }}
            className={`btn btn-round btn-sm pull-right btn-${color}`}
          >
            <strong>Criar uma nova categoria</strong>
          </button>
        </div>
      </div>

      {categorias
        .filter(c => c.classificacao !== 'diversos')
        .map(c => (
          <div key={c._id} className="row">
            <div className="col-md-12">
              <TableCard categoria={c} color={color} options materialIcon={materialIcon}>
                <Title categoria={c} pencil />
                <Table idCategoria={c._id} itens={c.itens} color={color} />
              </TableCard>
            </div>
          </div>
        ))}

      {addCategoria && (
        <div ref={scrollHook} className="row">
          <div className="col-md-12">
            <TableCard options={false} color={color}>
              <br />
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <span className="bmd-form-group">
                      <Input
                        name="nome"
                        type="text"
                        placeholder="Nome da Categoria"
                        className="form-control"
                      />
                    </span>
                  </div>
                  <div className="col-md-12">
                    {color === 'info' && (
                      <span className="bmd-form-group">
                        <Select
                          className="form-control"
                          name="classificacao"
                          placeholder="Classificação da Categoria"
                          options={[
                            { id: 'pessoal', title: 'Gastos Pessoais' },
                            { id: 'dependente', title: 'Gastos de Dependentes' },
                            { id: 'alimentação', title: 'Gastos com Alimentação' },
                            { id: 'saude', title: 'Gastos com Vida e Saúde' },
                            { id: 'lazer', title: 'Gastos com Lazer' },
                            { id: 'moradia', title: 'Gastos com Moradia' },
                            { id: 'transporte', title: 'Gastos com Transporte' },
                            { id: 'outros', title: 'Outros' },
                          ]}
                        />
                      </span>
                    )}
                  </div>
                </div>
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
