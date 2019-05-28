import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { Creators as DataActions } from '../ducks/data';
import { Creators as CategoriasActions } from '../ducks/categorias';
import api from '../../services/api';

export function* fetchDataRequest(action) {
  try {
    const local = {};
    const { data: categorias } = yield call(
      api.get,
      `api/categoria?start=${moment(action.payload.start).format('YYYY-MM-DD')}&end=${moment(
        action.payload.end,
      ).format('YYYY-MM-DD')}`,
    );
    local.categorias = categorias;
    yield put(CategoriasActions.fetchDataCategorias(categorias));
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(DataActions.fetchDataSuccess());
  } catch (err) {
    yield put(DataActions.fetchDataFailure(err));
  }
}
