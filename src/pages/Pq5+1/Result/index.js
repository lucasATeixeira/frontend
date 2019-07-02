import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Radar from './Radar';
import Bar from './Bar';
import Card from './Card';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';

const Result = ({
  simulacao, endResult, patrimonios, orcamento,
}) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <button
          onClick={() => endResult()}
          className="btn btn-grafiti btn-link btn-just-icon btn-sm"
          type="button"
        >
          <i className="fa fa-arrow-left" />
        </button>
      </div>
    </div>

    <h2>Resultados</h2>

    <div className="row">
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-icon card-header-info">
                <div className="card-icon">
                  <i className="material-icons">attach_money</i>
                </div>
              </div>

              <div className="card-body">
                <Bar simulacao={simulacao} patrimonios={patrimonios} orcamento={orcamento} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-6">
            <Card
              textColor="text-info"
              title={simulacao.gastos}
              info="Mudança dos Gastos"
              footer={[
                {
                  materialIcon: 'attach_money',
                  text: `Gastos Antes: ${orcamento.gastosOrcados.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}`,
                },
                {
                  materialIcon: 'attach_money',
                  text: `Gastos Depois: ${(
                    orcamento.gastosOrcados + simulacao.gastos
                  ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`,
                },
              ]}
            />
          </div>
          <div className="col-md-6">
            <Card
              info="Mudança PMT"
              title={simulacao.pmt}
              color="danger"
              materialIcon="business"
              faIcon="fa-files-o"
              textColor="text-danger"
              footer={[
                {
                  materialIcon: 'attach_money',
                  text: `PMT Antes: ${patrimonios.passivos.pmt.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}`,
                },
                {
                  materialIcon: 'attach_money',
                  text: `PMT Depois: ${(patrimonios.passivos.pmt + simulacao.pmt).toLocaleString(
                    'pt-br',
                    { style: 'currency', currency: 'BRL' },
                  )}`,
                },
              ]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-icon card-header-success">
                <div className="card-icon">
                  <i className="material-icons">business</i>
                </div>
              </div>
              <div className="card-body">
                <h4 className="catd-title">
                  Patrimônio Líquido:{' '}
                  {(
                    patrimonios.patrimonioLiquido
                    - simulacao.passivos
                    + simulacao.ativos
                    + simulacao.saldo
                  ).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </h4>
                <br />
                <Radar simulacao={simulacao} patrimonios={patrimonios} orcamento={orcamento} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

Result.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  patrimonios: PropTypes.shape().isRequired,
  endResult: PropTypes.func.isRequired,
  orcamento: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
  patrimonios: state.patrimonios,
  orcamento: state.categorias,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Result);
