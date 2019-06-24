import { call, put } from 'redux-saga/effects';
import { Creators as V1Actions } from '../ducks/v1';
import api from '../../services/api';

export function* addV1Request(action) {
  try {
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    const response = yield call(api.post, 'api/v1', action.payload.body);
    local.v1 = [...local.v1, response.data];
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(V1Actions.addV1Success(local.v1));
  } catch (err) {
    yield put(V1Actions.addV1Failure(err));
  }
}

export function* removeV1Request(action) {
  try {
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    yield call(api.delete, `api/v1/${action.payload.body._id}`);
    local.v1 = local.v1.filter(v => v._id !== action.payload.body._id);
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(V1Actions.removeV1Success(local.v1));
  } catch (err) {
    yield put(V1Actions.removeV1Failure(err));
  }
}
