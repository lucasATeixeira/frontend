import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BlankPage from '../../components/BlankPage';
import CardStats from './CardStats';
import Avanco from './Avanco';
import Detalhamento from './Detalhamento';
import Pote from './Pote';

const Relatorio = ({ orcamento, patrimonios }) => (
  <BlankPage>
    <div className="row">
      <div className="col-md-7">
        <div className="row">
          <div className="col-md-6">
            <CardStats
              faIcon="fa-shopping-cart"
              info="Gastos Realizados"
              textColor="text-info"
              title={orcamento.gastosRealizados.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            />
          </div>
          <div className="col-md-6">
            <CardStats
              color="danger"
              faIcon="fa-files-o"
              info="Dívidas Parceladas"
              textColor="text-danger"
              title={(
                patrimonios.passivos.pmt + orcamento.gastosRealizadosParcelados
              ).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Avanco orcamento={orcamento} />
          </div>
        </div>
      </div>
      <div className="col-md-5">
        <div className="row">
          <div className="col-md-12">
            <Pote orcamento={orcamento} patrimonios={patrimonios} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Detalhamento orcamento={orcamento} patrimonios={patrimonios} />
          </div>
        </div>
      </div>
    </div>
  </BlankPage>
);

Relatorio.propTypes = {
  orcamento: PropTypes.shape().isRequired,
  patrimonios: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  orcamento: state.categorias,
  patrimonios: state.patrimonios,
});

export default connect(mapStateToProps)(Relatorio);
