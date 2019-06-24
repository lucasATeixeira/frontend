import { call, put } from 'redux-saga/effects';
import { Creators as V5Actions } from '../ducks/v5';
import api from '../../services/api';

export function* addV5Request(action) {
  try {
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    const response = yield call(api.post, 'api/v5', action.payload.body);
    local.v5 = [...local.v5, response.data];
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(V5Actions.addV5Success(local.v5));
  } catch (err) {
    yield put(V5Actions.addV5Failure(err));
  }
}

export function* removeV5Request(action) {
  try {
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    yield call(api.delete, `api/v5/${action.payload.body._id}`);
    local.v5 = local.v5.filter(v => v._id !== action.payload.body._id);
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(V5Actions.removeV5Success(local.v5));
  } catch (err) {
    yield put(V5Actions.removeV5Failure(err));
  }
}
