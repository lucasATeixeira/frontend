import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Creators as SimulationActions } from '../../../../../store/ducks/simulacao';
import Input from './Input';

const CardOne = ({ simulacao, saveSimulation }) => {
  const { currentSimulation } = simulacao;
  const [aluguel, setAluguel] = useState(0);
  const [moradia, setMoradia] = useState(0);
  const [uber, setUber] = useState(0);
  const [assinatura, setAssinatura] = useState(0);
  const [bem, setBem] = useState(0);
  const [carro, setCarro] = useState(0);

  const handleChange = (fv, type, name) => {
    if (type === 'item') {
      if (!currentSimulation.itens.find(e => e.nome === name)) {
        saveSimulation({
          ...currentSimulation,
          itens: [
            ...currentSimulation.itens,
            {
              _id: Math.random(),
              nome: name,
              tipo: 'gasto',
              classificacao: 'Flexível',
              orcado: fv,
              recorrencia: 1,
            },
          ],
        });
        return;
      }
      saveSimulation({
        ...currentSimulation,
        itens: currentSimulation.itens.map((e) => {
          if (e.nome !== name) return e;
          return {
            ...e,
            orcado: fv,
          };
        }),
      });
    }
    if (type === 'patrimonio') {
      if (!currentSimulation.patrimonios.find(e => e.nome === name)) {
        saveSimulation({
          ...currentSimulation,
          patrimonios: [
            ...currentSimulation.patrimonios,
            { nome: name, valor: fv, id: Math.random() },
          ],
        });
        return;
      }
      saveSimulation({
        ...currentSimulation,
        patrimonios: currentSimulation.patrimonios.map((e) => {
          if (e.nome !== name) return e;
          return {
            ...e,
            valor: fv,
          };
        }),
      });
    }
  };
  return (
    <>
      <div className="card">
        <div className="card-header card-header-text card-header-success">
          <div className="card-text">
            <h4 className="card-title">
              <strong>Detalhamento</strong>
            </h4>
          </div>
        </div>

        <div className="card-body">
          {currentSimulation.estrategia === 'aluguel' && (
            <>
              <Input
                currency
                label="Valor do Aluguel"
                value={aluguel}
                onChange={(e, mv, fv) => {
                  setAluguel(fv);
                  handleChange(fv, 'item', 'Aluguel');
                }}
              />
            </>
          )}
          {currentSimulation.estrategia === 'outra moradia' && (
            <Input
              currency
              label="Valor Da Moradia"
              value={moradia}
              onChange={(e, mv, fv) => {
                setMoradia(fv);
                handleChange(fv, 'patrimonio', 'Outra Moradia');
              }}
            />
          )}
          {currentSimulation.estrategia === 'uber' && (
            <Input
              currency
              label="Gastos com Uber"
              value={uber}
              onChange={(e, mv, fv) => {
                setUber(fv);
                handleChange(fv, 'item', 'Uber');
              }}
            />
          )}
          {currentSimulation.estrategia === 'outro carro' && (
            <Input
              currency
              label="Valor do carro"
              value={carro}
              onChange={(e, mv, fv) => {
                setCarro(fv);
                handleChange(fv, 'patrimonio', 'Outro transporte');
              }}
            />
          )}
          {currentSimulation.estrategia === 'assinatura' && (
            <Input
              currency
              label="Mensalidade da Assinatura"
              value={assinatura}
              onChange={(e, mv, fv) => {
                setAssinatura(fv);
                handleChange(fv, 'item', 'Assinatura Veículo');
              }}
            />
          )}
          {currentSimulation.estrategia === 'outro bem' && (
            <Input
              currency
              label="Valor do Outro bem"
              value={bem}
              onChange={(e, mv, fv) => {
                setBem(fv);
                handleChange(fv, 'patrimonio', 'Comprar outro bem');
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

CardOne.propTypes = {
  simulacao: PropTypes.shape().isRequired,
  saveSimulation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  simulacao: state.simulacao,
});

const mapDispatchToProps = dispatch => bindActionCreators(SimulationActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardOne);
