import { call, put } from 'redux-saga/effects';
import { Creators as DataActions } from '../ducks/data';
import { Creators as CategoriasActions } from '../ducks/categorias';
import api from '../../services/api';

export function* fetchDataRequest() {
  try {
    const local = {};
    const { data: categorias } = yield call(api.get, 'api/categoria');
    local.categorias = categorias;
    yield put(CategoriasActions.fetchDataCategorias(categorias));
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(DataActions.fetchDataSuccess());
  } catch (err) {
    yield put(DataActions.fetchDataFailure(err));
  }
}
