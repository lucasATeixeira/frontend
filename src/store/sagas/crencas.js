import { put, call } from 'redux-saga/effects';
import { Creators as CrencaActions } from '../ducks/crencas';
import api from '../../services/api';

export function* saveRequest(action) {
  try {
    const response = yield call(api.post, 'api/crenca', action.payload.body);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    local.crencas = response.data;
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CrencaActions.saveSuccess({ ...local.crencas, done: true }));
  } catch (err) {
    yield put(CrencaActions.saveFailure(err));
  }
}
