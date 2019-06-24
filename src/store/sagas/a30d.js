import { put, call } from 'redux-saga/effects';
import { Creators as A30dActions } from '../ducks/a30d';
import api from '../../services/api';

export function* addA30dRequest(action) {
  try {
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    const response = yield call(api.post, 'api/a30d', action.payload.body);
    local.a30d.push(response.data);
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(A30dActions.addA30dSuccess(local.a30d));
  } catch (err) {
    yield put(A30dActions.addA30dFailure(err));
  }
}

export function* removeA30dRequest(action) {
  try {
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    yield call(api.delete, `api/a30d/${action.payload.body._id}`);
    local.a30d = local.a30d.filter(a => a._id !== action.payload.body._id);
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(A30dActions.removeA30dSuccess(local.a30d));
  } catch (err) {
    yield put(A30dActions.removeA30dFailure(err));
  }
}

export function* updateA30dRequest(action) {
  try {
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    const response = yield call(api.put, `api/a30d/${action.payload._id}`, action.payload.body);
    local.a30d = local.a30d.map((a) => {
      if (a._id !== action.payload._id) return a;
      return response.data;
    });
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(A30dActions.updateA30dSuccess(local.a30d));
  } catch (err) {
    yield put(A30dActions.updateA30dFailure(err));
  }
}
