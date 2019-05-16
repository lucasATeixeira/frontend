import { all, takeLatest } from 'redux-saga/effects';
import { Types as UserTypes } from '../ducks/user';
import { Types as DataTypes } from '../ducks/data';
import { Types as CategoriasTypes } from '../ducks/categorias';
import { authUser } from './user';
import { fetchDataRequest } from './data';
import { addCategoriaRequest } from './categorias';

export default function* rootSaga() {
  yield all([
    takeLatest(UserTypes.LOGIN_REQUEST, authUser),
    takeLatest(DataTypes.FETCH_DATA_REQUEST, fetchDataRequest),
    takeLatest(CategoriasTypes.ADD_CATEGORIA_REQUEST, addCategoriaRequest),
  ]);
}
