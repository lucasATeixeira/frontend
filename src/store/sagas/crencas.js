import { put, call } from 'redux-saga/effects';
import { Creators as CrencaActions } from '../ducks/crencas';
import api from '../../services/api';

export function* updateRequest(action) {
  const { body } = action.payload;
  try {
    const response = yield call(api.put, `api/crenca/${body._id}`, body);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    local.crencas = {
      ...local.crencas,
      answers: local.crencas.answers.map((a) => {
        if (a._id !== response.data._id) return a;
        return response.data;
      }),
    };
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CrencaActions.updateSuccess(local.crencas));
  } catch (err) {
    yield put(CrencaActions.updateFailure(err));
  }
}

export function* saveRequest(action) {
  try {
    const response = yield call(api.post, 'api/crenca', action.payload.body);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    local.crencas = {
      answers: [...local.crencas.answers, response.data],
      done: true,
      coupleDone: action.payload.coupleDone,
    };
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(
      CrencaActions.saveSuccess({
        ...local.crencas,
        done: true,
        coupleDone: action.payload.coupleDone,
      }),
    );
  } catch (err) {
    yield put(CrencaActions.saveFailure(err));
  }
}
