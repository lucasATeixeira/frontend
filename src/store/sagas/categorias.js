import { call, put } from 'redux-saga/effects';
import { Creators as CategoriasActions } from '../ducks/categorias';
import api from '../../services/api';

export function* addCategoriaRequest(action) {
  try {
    const { data } = yield call(api.post, 'api/categoria', action.payload.categoria);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    local.categorias.categorias.push(data);
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CategoriasActions.addCategoriaSuccess(data));
  } catch (err) {
    yield put(CategoriasActions.addCategoriaFailure(err));
  }
}
