import { all, takeLatest } from 'redux-saga/effects';
import { Types as UserTypes } from '../ducks/user';
import { Types as DataTypes } from '../ducks/data';
import { Types as CategoriasTypes } from '../ducks/categorias';
import { Types as PatrimoniosTypes } from '../ducks/patrimonios';
import { Types as SimulacaoTypes } from '../ducks/simulacao';
import { authUser } from './user';
import { fetchDataRequest } from './data';
import { addPatrimonioRequest, removePatrimonioRequest } from './patrimonios';
import { fetchSimulacaoRequest, submitSimulationRequest } from './simulacao';
import {
  addCategoriaRequest,
  addItemRequest,
  removeItemRequest,
  removeCategoriaRequest,
  lancamentoRequest,
  removeLancamentoRequest,
} from './categorias';

export default function* rootSaga() {
  yield all([
    takeLatest(UserTypes.LOGIN_REQUEST, authUser),
    takeLatest(DataTypes.FETCH_DATA_REQUEST, fetchDataRequest),
    takeLatest(CategoriasTypes.ADD_CATEGORIA_REQUEST, addCategoriaRequest),
    takeLatest(CategoriasTypes.ADD_ITEM_REQUEST, addItemRequest),
    takeLatest(CategoriasTypes.REMOVE_ITEM_REQUEST, removeItemRequest),
    takeLatest(CategoriasTypes.REMOVE_CATEGORIA_REQUEST, removeCategoriaRequest),
    takeLatest(CategoriasTypes.LANCAMENTO_REQUEST, lancamentoRequest),
    takeLatest(CategoriasTypes.REMOVE_LANCAMENTO_REQUEST, removeLancamentoRequest),
    takeLatest(PatrimoniosTypes.ADD_PATRIMONIO_REQUEST, addPatrimonioRequest),
    takeLatest(PatrimoniosTypes.REMOVE_PATRIMONIO_REQUEST, removePatrimonioRequest),
    takeLatest(SimulacaoTypes.FETCH_DATA_REQUEST, fetchSimulacaoRequest),
    takeLatest(SimulacaoTypes.SUBMIT_SIMULATION_REQUEST, submitSimulationRequest)
  ]);
}
