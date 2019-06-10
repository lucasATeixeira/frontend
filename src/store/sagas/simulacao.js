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
    console.log(currentSimulation);
    const { data } = yield call(api.post, 'api/simulacao', currentSimulation);
    console.log(data);
  } catch (err) {
    yield put(SimulacaoActions.submitSimulationFailure(err));
  }
}
