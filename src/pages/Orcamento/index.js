import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlankPage from '../../components/BlankPage';
import Card from './Card';
import Content from './Content';
import ContentDividas from './ContentDividas';

const Orcamento = ({ categorias }) => {
  const [active, setActive] = useState(2);

  return (
    <BlankPage>
      <div className="row">
        <div className="col-md-4">
          <Card
            setActive={setActive}
            type={1}
            title={categorias.recebimentosOrcados.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
            textColor="text-grafit"
            info="Recebimentos"
            materialIcon="attach_money"
            color="grafit"
          />
        </div>
        <div className="col-md-4">
          <Card
            setActive={setActive}
            type={2}
            title={categorias.gastosOrcados.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
            textColor="text-info"
            faIcon="fa-shopping-cart"
            materialIcon="shopping_cart"
            info="Gastos"
          />
        </div>
        <div className="col-md-4">
          <Card
            setActive={setActive}
            type={3}
            title="R$ 0,00"
            textColor="text-danger"
            faIcon="fa-files-o"
            materialIcon="file_copy"
            info="Dívidas"
            color="danger"
          />
        </div>
      </div>

      {active === 1 && (
        <Content
          categorias={categorias.categorias.filter(categoria => categoria.tipo === 'recebimento')}
          color="grafit"
          materialIcon="attach_money"
        />
      )}
      {active === 2 && (
        <Content
          categorias={categorias.categorias.filter(categoria => categoria.tipo === 'gasto')}
          color="info"
          materialIcon="shopping_cart"
        />
      )}
      {active === 3 && <ContentDividas color="danger" materialIcon="file_copy" />}
    </BlankPage>
  );
};

Orcamento.propTypes = {
  categorias: PropTypes.shape({
    categorias: PropTypes.arrayOf(
      PropTypes.shape({
        tipo: PropTypes.string,
      }),
    ),
    err: PropTypes.bool,
    gastosOrcados: PropTypes.number,
    gastosRealizados: PropTypes.number,
    loading: PropTypes.bool,
    periodo: PropTypes.number,
    recebimentosOrcados: PropTypes.number,
    recebimentosRealizados: PropTypes.number,
    success: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  categorias: state.categorias,
});
export default connect(mapStateToProps)(Orcamento);
