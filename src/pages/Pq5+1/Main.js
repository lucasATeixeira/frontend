import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as SimulacaoActions } from '../../store/ducks/simulacao';
import PlanCard from './PlanCard';
import NewPlan from './NewPlan';
import CardStats from './CardStats';

const Main = ({
  simulacao, startResult, orcamento, patrimonios,
}) => {
  const [newPlan, setNewPlan] = useState(false);
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <CardStats
            color="success"
            textColor="text-success"
            info="Você ainda tem para quitar suas dívidas"
            title={simulacao.saldo.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
            footer={[{ materialIcon: 'attach_money' }]}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <CardStats
            textColor="text-info"
            title={Math.abs(simulacao.gastos).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
            info={simulacao.gastos < 0 ? 'Reduziu seus Gastos em' : 'Aumentou seus Gastos em'}
            materialIcon="shopping_cart"
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
                text: `Gastos Depois: ${(orcamento.gastosOrcados + simulacao.gastos).toLocaleString(
                  'pt-br',
                  { style: 'currency', currency: 'BRL' },
                )}`,
              },
            ]}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <CardStats
            info={simulacao.pmt < 0 ? 'Reduziu as Parcelas em' : 'Aumentou as parcelas em'}
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

      {newPlan && (
        <>
          <div className="row">
            <div className="col-md-12">
              <button
                onClick={() => setNewPlan(false)}
                className="btn btn-round pull-right btn-info pull-left"
                type="button"
              >
                <strong>Voltar</strong>
              </button>
            </div>
          </div>
          <NewPlan />
        </>
      )}
      {!newPlan && (
        <div className="row">
          <div className="col-md-12">
            <button
              onClick={() => setNewPlan(true)}
              className="btn btn-round pull-right btn-info btn-sm pull-left"
              type="button"
            >
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-12">
          <button
            onClick={() => startResult(true)}
            className="btn btn-round pull-right btn-info btn-sm pull-left"
            type="button"
          >
            <strong>Resultados </strong>
          </button>
        </div>
      </div>

      {simulacao.simulacoes.map(s => (
        <PlanCard key={s._id} content={s} />
      ))}
    </>
  );
};

Main.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  startResult: PropTypes.func.isRequired,
  orcamento: PropTypes.shape().isRequired,
  patrimonios: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
  orcamento: state.categorias,
  patrimonios: state.patrimonios,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulacaoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
