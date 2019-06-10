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
    const { data } = yield call(api.post, 'api/simulacao', action.payload.currentSimulation);
    console.log(data);
  } catch (err) {
    yield put(SimulacaoActions.submitSimulationFailure(err));
  }
}
