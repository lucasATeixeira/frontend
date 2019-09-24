import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Radar from './Radar';
import RealRadar from './RealRadar';
import Bar from './Bar';
import Card from './Card';
import { Creators as SimulacaoActions } from '../../../store/ducks/simulacao';

const Result = ({ simulacao, endResult, patrimonios, orcamento }) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <button
          onClick={() => endResult()}
          className="btn btn-success"
          type="button"
        >
          <i className="fa fa-arrow-left" />
          <strong> Voltar</strong>
        </button>
      </div>
    </div>

    <h2>Resultados</h2>

    <div className="row">
      <div className="col-md-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-header-icon card-header-info">
                <div className="card-icon">
                  <i className="material-icons">attach_money</i>
                </div>
              </div>

              <div className="card-body">
                <Bar
                  simulacao={simulacao}
                  patrimonios={patrimonios}
                  orcamento={orcamento}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-7">
        <div className="row">
          <div className="col-md-6">
            <Card
              textColor="text-info"
              title={Math.abs(simulacao.gastos).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
              info={
                simulacao.gastos < 0
                  ? 'Reduziu seus Gastos em'
                  : 'Aumentou seus Gastos em'
              }
              materialIcon="shopping_cart"
              footer={[
                {
                  materialIcon: 'attach_money',
                  text: `Gastos Antes: ${orcamento.gastosOrcados.toLocaleString(
                    'pt-br',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    }
                  )}`,
                },
                {
                  materialIcon: 'attach_money',
                  text: `Gastos Depois: ${(
                    orcamento.gastosOrcados + simulacao.gastos
                  ).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}`,
                },
              ]}
            />
          </div>
          <div className="col-md-6">
            <Card
              info={
                simulacao.pmt < 0
                  ? 'Reduziu as Parcelas em'
                  : 'Aumentou as parcelas em'
              }
              title={Math.abs(simulacao.pmt).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
              color="danger"
              materialIcon="business"
              faIcon="fa-files-o"
              textColor="text-danger"
              footer={[
                {
                  materialIcon: 'attach_money',
                  text: `Parcelas Antes: ${patrimonios.passivos.pmt.toLocaleString(
                    'pt-br',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    }
                  )}`,
                },
                {
                  materialIcon: 'attach_money',
                  text: `Parcelas Depois: ${(
                    patrimonios.passivos.pmt + simulacao.pmt
                  ).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}`,
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
                  <strong>
                    Patrimônio Líquido Antes:{' '}
                    {patrimonios.patrimonioLiquido.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </strong>
                  <strong className="pull-right">
                    Patrimônio Líquido Depois:{' '}
                    {(
                      patrimonios.patrimonioLiquido -
                      simulacao.passivos +
                      simulacao.ativos +
                      simulacao.saldo
                    ).toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </strong>
                </h4>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <RealRadar
                      width={100}
                      height={50}
                      options={{ maintainAspectRatio: false }}
                    />
                  </div>
                  <div className="col-md-6">
                    <Radar
                      width={100}
                      height={50}
                      options={{ maintainAspectRatio: false }}
                      simulacao={simulacao}
                      patrimonios={patrimonios}
                      orcamento={orcamento}
                    />
                  </div>
                </div>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
