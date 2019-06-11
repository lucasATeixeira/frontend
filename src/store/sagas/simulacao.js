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

export function* submitSimulationRequest(action) {
  try {
    let { currentSimulation } = action.payload;
    currentSimulation = {
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
    };
    const { data } = yield call(api.post, 'api/simulacao', currentSimulation);
    const response = {
      _id: data._id,
      ...currentSimulation,
      recebimentos:
        (currentSimulation.itensRemovidos[0]
          ? currentSimulation.itensRemovidos
            .map((r) => {
              if (r.tipo === 'recebimento') return r.mensal;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - (currentSimulation.itens[0]
          ? currentSimulation.itens
            .map((r) => {
              if (r.tipo === 'recebimento') return r.mensal;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0),
      gastos:
        (currentSimulation.itensRemovidos[0]
          ? currentSimulation.itensRemovidos
            .map((r) => {
              if (r.tipo === 'gasto') return r.mensal;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - (currentSimulation.itens[0]
          ? currentSimulation.itens
            .map((r) => {
              if (r.tipo === 'gasto') return r.mensal;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0),
      ativos:
        (currentSimulation.patrimoniosRemovidos[0]
          ? currentSimulation.patrimoniosRemovidos
            .map((a) => {
              if (a.tipo === 'ativo') return a.valor;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - (currentSimulation.patrimonios[0]
          ? currentSimulation.patrimonios
            .map((a) => {
              if (a.tipo === 'ativo') return a.valor;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0),
      passivos:
        (currentSimulation.patrimoniosRemovidos[0]
          ? currentSimulation.patrimoniosRemovidos
            .map((a) => {
              if (a.tipo === 'passivo') return a.total;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - (currentSimulation.patrimonios[0]
          ? currentSimulation.patrimonios
            .map((a) => {
              if (a.tipo === 'passivo') return a.total;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0),
      pmt:
        (currentSimulation.patrimoniosRemovidos[0]
          ? currentSimulation.patrimoniosRemovidos
            .map((a) => {
              if (a.tipo === 'passivo') return a.pmt;
              return 0;
            })
            .reduce((a, b) => a + b)
          : 0)
        - (currentSimulation.patrimonios[0]
          ? currentSimulation.patrimonios
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
