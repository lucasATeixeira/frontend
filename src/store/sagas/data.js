import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { Creators as DataActions } from '../ducks/data';
import { Creators as CategoriasActions } from '../ducks/categorias';
import { Creators as PatrimonioActions } from '../ducks/patrimonios';
import { Creators as V1Actions } from '../ducks/v1';
import { Creators as V5Actions } from '../ducks/v5';
import { Creators as A30dActions } from '../ducks/a30d';
import { Creators as CrencaActions } from '../ducks/crencas';
import api from '../../services/api';

export function* fetchDataRequest(action) {
  try {
    const local = {};
    const { data: categorias } = yield call(
      api.get,
      `api/categoria?start=${moment(action.payload.start)
        .utc()
        .format('YYYY-MM-DD')}&end=${moment(action.payload.end)
        .utc()
        .format('YYYY-MM-DD')}`
    );
    const { data: patrimonios } = yield call(
      api.get,
      `api/patrimonio?start=${moment(action.payload.start)
        .utc()
        .format('YYYY-MM-DD')}&end=${moment(action.payload.end)
        .utc()
        .format('YYYY-MM-DD')}`
    );
    const { data: v1 } = yield call(api.get, 'api/v1');
    const { data: v5 } = yield call(api.get, 'api/v5');
    const { data: a30d } = yield call(api.get, 'api/a30d');
    const { data: crenca } = yield call(api.get, 'api/crenca');
    local.crencas = {
      answers: crenca,
    };
    local.a30d = a30d;
    local.v1 = v1;
    local.v5 = v5;
    local.categorias = categorias;
    local.patrimonios = patrimonios;
    yield put(CategoriasActions.fetchDataCategorias(categorias));
    yield put(PatrimonioActions.fetchDataPatrimonios(patrimonios));
    yield put(V1Actions.fetchDataRequest(v1));
    yield put(V5Actions.fetchDataRequest(v5));
    yield put(A30dActions.fetchDataA30d(a30d));
    yield put(CrencaActions.fetchCrenca(local.crencas.answers));

    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(DataActions.fetchDataSuccess());
  } catch (err) {
    yield put(DataActions.fetchDataFailure(err));
  }
}
