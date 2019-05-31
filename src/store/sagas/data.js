import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { Creators as DataActions } from '../ducks/data';
import { Creators as CategoriasActions } from '../ducks/categorias';
import { Creators as PatrimonioActions } from '../ducks/patrimonios';
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
    const { data: patrimonios } = yield call(
      api.get,
      `api/patrimonio?start=${moment(action.payload.start).format('YYYY-MM-DD')}&end=${moment(
        action.payload.end,
      ).format('YYYY-MM-DD')}`,
    );
    local.categorias = categorias;
    local.patrimonios = patrimonios;
    yield put(CategoriasActions.fetchDataCategorias(categorias));
    yield put(PatrimonioActions.fetchDataPatrimonios(patrimonios));
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(DataActions.fetchDataSuccess());
  } catch (err) {
    yield put(DataActions.fetchDataFailure(err));
  }
}
