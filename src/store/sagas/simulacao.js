import { call, put } from 'redux-saga/effects';
import { Creators as SimulacaoActions } from '../ducks/simulacao';
import api from '../../services/api';

export function* fetchSimulacaoRequest() {
  try {
    const { data } = yield call(api.get, 'api/simulacao');
    yield put(SimulacaoActions.fetchDataSuccess(data));
  } catch (err) {
    yield put(SimulacaoActions.fetchDataFailure(err));
  }
}

export function* removeSimulationRequest(action) {
  const { simulation } = action.payload;
  try {
    yield call(api.delete, `api/simulacao/${simulation._id}`);
    yield put(SimulacaoActions.removeSimulationSuccess(simulation));
  } catch (err) {
    yield put(SimulacaoActions.removeSimulationFailure(err));
  }
}

export function* submitSimulationRequest(action) {
  try {
    let { currentSimulation } = action.payload;
    console.log(currentSimulation);
    currentSimulation = {
      enxugar: currentSimulation.enxugar.map(e => ({
        tipo: e.tipo,
        nomeCategoria: e.nomeCategoria,
        nome: e.nome,
        classificacao: e.classificacao,
        orcado: e.orcado,
        recorrencia: e.recorrencia,
        valorEnxugado: e.valorEnxugado,
      })),
      estrategia: currentSimulation.estrategia,
      itens: currentSimulation.itens.map(i => ({
        ...i,
        _id: null,
      })),
      patrimonios: currentSimulation.patrimonios.map(p => ({
        ...p,
        _id: null,
      })),
      type: currentSimulation.type,
      itensRemovidos: currentSimulation.itensRemovidos,
      patrimoniosRemovidos: currentSimulation.patrimoniosRemovidos,
      saldo: currentSimulation.saldo,
    };
    const { data } = yield call(api.post, 'api/simulacao', currentSimulation);
    const response = {
      _id: data._id,
      ...currentSimulation,
      saldo: currentSimulation.saldo,
      recebimentos:
        (currentSimulation.itens[0]
          ? currentSimulation.itens
            .map((r) => {
              if (r.tipo === 'recebimento' && r.classificacao !== 'Eventual') return r.mensal;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - (currentSimulation.itensRemovidos[0]
          ? currentSimulation.itensRemovidos
            .map((r) => {
              if (r.tipo === 'recebimento' && r.classificacao !== 'Eventual') return r.mensal;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0),
      gastos:
        (currentSimulation.itens[0]
          ? currentSimulation.itens
            .map((r) => {
              if (r.tipo === 'gasto') return r.mensal;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - ((currentSimulation.itensRemovidos[0]
          ? currentSimulation.itensRemovidos
            .map((r) => {
              if (r.tipo === 'gasto') return r.mensal;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
          + currentSimulation.enxugar.map(e => e.orcado).reduce((a, b) => a + b)
          - currentSimulation.enxugar.map(e => e.valorEnxugado).reduce((a, b) => a + b)),
      ativos:
        (currentSimulation.patrimonios[0]
          ? currentSimulation.patrimonios
            .map((a) => {
              if (a.tipo === 'ativo') return a.valor;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - (currentSimulation.patrimoniosRemovidos[0]
          ? currentSimulation.patrimoniosRemovidos
            .map((a) => {
              if (a.tipo === 'ativo') return a.valor;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0),
      passivos:
        (currentSimulation.patrimonios[0]
          ? currentSimulation.patrimonios
            .map((a) => {
              if (a.tipo === 'passivo') return a.total;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - (currentSimulation.patrimoniosRemovidos[0]
          ? currentSimulation.patrimoniosRemovidos
            .map((a) => {
              if (a.tipo === 'passivo') return a.total;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0),
      pmt:
        (currentSimulation.patrimonios[0]
          ? currentSimulation.patrimonios
            .map((a) => {
              if (a.tipo === 'passivo') return a.pmt;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - (currentSimulation.patrimoniosRemovidos[0]
          ? currentSimulation.patrimoniosRemovidos
            .map((a) => {
              if (a.tipo === 'passivo') return a.pmt;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0),
    };
    yield put(SimulacaoActions.submitSimulationSuccess(response));
  } catch (err) {
    yield put(SimulacaoActions.submitSimulationFailure(err));
  }
}
