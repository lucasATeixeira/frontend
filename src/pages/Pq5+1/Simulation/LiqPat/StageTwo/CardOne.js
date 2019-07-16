import React, { useState, useEffect } from 'react';
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
  const [condominioAluguel, setCondominioAluguel] = useState(0);
  const [iptuAluguel, setIptuAluguel] = useState(0);
  const [contasAluguel, setContasAluguel] = useState(0);
  const [condominioOutro, setCondominioOutro] = useState(0);
  const [iptuOutro, setIptuOutro] = useState(0);
  const [contasOutro, setContasOutro] = useState(0);
  const [combustivelOutro, setCombustivelOutro] = useState(0);
  const [seguroOutro, setSeguroOutro] = useState(0);
  const [ipvaOutro, setIpvaOutro] = useState(0);
  const [manutencaoOutro, setManutencaoOutro] = useState(0);
  const [combustivelAssinado, setCombustivelAssinado] = useState(0);
  const [gastosBem, setGastosBem] = useState(0);

  useEffect(() => {
    setGastosBem(0);
    setCombustivelAssinado(0);
    setManutencaoOutro(0);
    setIpvaOutro(0);
    setSeguroOutro(0);
    setCombustivelOutro(0);
    setContasOutro(0);
    setIptuOutro(0);
    setAluguel(0);
    setMoradia(0);
    setUber(0);
    setAssinatura(0);
    setBem(0);
    setCarro(0);
    setCondominioAluguel(0);
    setIptuAluguel(0);
    setCondominioOutro(0);
    setContasAluguel(0);
  }, [currentSimulation.estrategia]);

  const handleChange = (fv, type, name, classificacao, recorrencia) => {
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
              classificacao,
              orcado: fv,
              recorrencia,
              mensal: classificacao === 'Eventual' ? fv / recorrencia : fv * recorrencia,
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
            mensal: e.classificacao === 'Eventual' ? fv / e.recorrencia : fv * e.recorrencia,
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
            {
              nome: name,
              valor: fv,
              id: Math.random(),
              tipo: 'ativo',
              classificacao: 'patrimonial',
            },
          ],
          saldo: simulacao.saldo + currentSimulation.checked.valor - fv,
          patrimoniosRemovidos: currentSimulation.patrimoniosRemovidos.filter(
            p => p._id === currentSimulation.checked._id,
          ),
        });
        return;
      }
      saveSimulation({
        ...currentSimulation,
        saldo: simulacao.saldo + currentSimulation.checked.valor - fv,
        patrimoniosRemovidos: currentSimulation.patrimoniosRemovidos.filter(
          p => p._id === currentSimulation.checked._id,
        ),
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
                  handleChange(fv, 'item', 'Aluguel', 'Comprometido', 1);
                }}
              />
              <Input
                currency
                label="Condomínio"
                value={condominioAluguel}
                onChange={(e, mv, fv) => {
                  setCondominioAluguel(fv);
                  handleChange(fv, 'item', 'Condomínio', 'Comprometido', 1);
                }}
              />
              <Input
                currency
                label="IPTU"
                value={iptuAluguel}
                onChange={(e, mv, fv) => {
                  setIptuAluguel(fv);
                  handleChange(fv, 'item', 'IPTU', 'Eventual', 12);
                }}
              />
              <Input
                currency
                label="Contas da casa (água, luz, telefone)"
                value={contasAluguel}
                onChange={(e, mv, fv) => {
                  setContasAluguel(fv);
                  handleChange(fv, 'item', 'Demais Contas', 'Comprometido', 1);
                }}
              />
            </>
          )}
          {currentSimulation.estrategia === 'outra moradia' && (
            <>
              <Input
                currency
                label="Valor Da Moradia"
                value={moradia}
                onChange={(e, mv, fv) => {
                  setMoradia(fv);
                  handleChange(fv, 'patrimonio', 'Outra Moradia');
                }}
              />
              <Input
                currency
                label="Condomínio"
                value={condominioOutro}
                onChange={(e, mv, fv) => {
                  setCondominioOutro(fv);
                  handleChange(fv, 'item', 'Condomínio', 'Comprometido', 1);
                }}
              />
              <Input
                currency
                label="IPTU"
                value={iptuOutro}
                onChange={(e, mv, fv) => {
                  setIptuOutro(fv);
                  handleChange(fv, 'item', 'IPTU', 'Eventual', 12);
                }}
              />
              <Input
                currency
                label="Contas da casa (água, luz, telefone)"
                value={contasOutro}
                onChange={(e, mv, fv) => {
                  setContasOutro(fv);
                  handleChange(fv, 'item', 'Demais Contas', 'Comprometido', 1);
                }}
              />
            </>
          )}
          {currentSimulation.estrategia === 'uber' && (
            <Input
              currency
              label="Gastos com Uber"
              value={uber}
              onChange={(e, mv, fv) => {
                setUber(fv);
                handleChange(fv, 'item', 'Uber', 'Flexível', 1);
              }}
            />
          )}
          {currentSimulation.estrategia === 'outro carro' && (
            <>
              <Input
                currency
                label="Valor do carro"
                value={carro}
                onChange={(e, mv, fv) => {
                  setCarro(fv);
                  handleChange(fv, 'patrimonio', 'Outro transporte');
                }}
              />
              <Input
                currency
                label="Combustível"
                value={combustivelOutro}
                onChange={(e, mv, fv) => {
                  setCombustivelOutro(fv);
                  handleChange(fv, 'item', 'Combustível', 'Flexível', 1);
                }}
              />
              <Input
                currency
                label="Seguro do veículo (anual)"
                value={seguroOutro}
                onChange={(e, mv, fv) => {
                  setSeguroOutro(fv);
                  handleChange(fv, 'item', 'Seguro do Veículo', 'Eventual', 12);
                }}
              />
              <Input
                currency
                label="IPVA"
                value={ipvaOutro}
                onChange={(e, mv, fv) => {
                  setIpvaOutro(fv);
                  handleChange(fv, 'item', 'IPVA', 'Eventual', 12);
                }}
              />
              <Input
                currency
                label="Manutenções / Revisões (anual)"
                value={manutencaoOutro}
                onChange={(e, mv, fv) => {
                  setManutencaoOutro(fv);
                  handleChange(fv, 'item', 'Manutenções / Revisões', 'Eventual', 12);
                }}
              />
            </>
          )}
          {currentSimulation.estrategia === 'assinatura' && (
            <>
              <Input
                currency
                label="Mensalidade da Assinatura"
                value={assinatura}
                onChange={(e, mv, fv) => {
                  setAssinatura(fv);
                  handleChange(fv, 'item', 'Assinatura Veículo', 'Comprometido', 1);
                }}
              />
              <Input
                currency
                label="Combustível"
                value={combustivelAssinado}
                onChange={(e, mv, fv) => {
                  setCombustivelAssinado(fv);
                  handleChange(fv, 'item', 'Combustível', 'Flexível', 1);
                }}
              />
            </>
          )}
          {currentSimulation.estrategia === 'outro bem' && (
            <>
              <Input
                currency
                label="Valor do Outro bem"
                value={bem}
                onChange={(e, mv, fv) => {
                  setBem(fv);
                  handleChange(fv, 'patrimonio', 'Comprar outro bem');
                }}
              />
              <Input
                currency
                label="Possíveis gastos (mensal)"
                value={gastosBem}
                onChange={(e, mv, fv) => {
                  setGastosBem(fv);
                  handleChange(fv, 'item', 'Possíveis Gastos', 'Flexível', 1);
                }}
              />
            </>
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
