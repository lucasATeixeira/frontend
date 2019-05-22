import { all, takeLatest } from 'redux-saga/effects';
import { Types as UserTypes } from '../ducks/user';
import { Types as DataTypes } from '../ducks/data';
import { Types as CategoriasTypes } from '../ducks/categorias';
import { authUser } from './user';
import { fetchDataRequest } from './data';
import {
  addCategoriaRequest,
  addItemRequest,
  removeItemRequest,
  removeCategoriaRequest,
} from './categorias';

export default function* rootSaga() {
  yield all([
    takeLatest(UserTypes.LOGIN_REQUEST, authUser),
    takeLatest(DataTypes.FETCH_DATA_REQUEST, fetchDataRequest),
    takeLatest(CategoriasTypes.ADD_CATEGORIA_REQUEST, addCategoriaRequest),
    takeLatest(CategoriasTypes.ADD_ITEM_REQUEST, addItemRequest),
    takeLatest(CategoriasTypes.REMOVE_ITEM_REQUEST, removeItemRequest),
    takeLatest(CategoriasTypes.REMOVE_CATEGORIA_REQUEST, removeCategoriaRequest),
  ]);
}
