import { all, takeLatest } from 'redux-saga/effects';
import { Types as UserTypes } from '../ducks/user';
import { Types as DataTypes } from '../ducks/data';
import { Types as CategoriasTypes } from '../ducks/categorias';
import { Types as PatrimoniosTypes } from '../ducks/patrimonios';
import { Types as SimulacaoTypes } from '../ducks/simulacao';
import { Types as V1Types } from '../ducks/v1';
import { Types as V5Types } from '../ducks/v5';
import { Types as A30dTypes } from '../ducks/a30d';
import { authUser } from './user';
import { fetchDataRequest } from './data';
import { addPatrimonioRequest, removePatrimonioRequest } from './patrimonios';
import { addV1Request, removeV1Request } from './v1';
import { addV5Request, removeV5Request } from './v5';
import { addA30dRequest, removeA30dRequest, updateA30dRequest } from './a30d';
import {
  fetchSimulacaoRequest,
  submitSimulationRequest,
  removeSimulationRequest,
} from './simulacao';
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
    takeLatest(SimulacaoTypes.SUBMIT_SIMULATION_REQUEST, submitSimulationRequest),
    takeLatest(SimulacaoTypes.REMOVE_SIMULATION_REQUEST, removeSimulationRequest),
    takeLatest(V1Types.ADD_V1_REQUEST, addV1Request),
    takeLatest(V1Types.REMOVE_V1_REQUEST, removeV1Request),
    takeLatest(V5Types.ADD_V5_REQUEST, addV5Request),
    takeLatest(V5Types.REMOVE_V5_REQUEST, removeV5Request),
    takeLatest(A30dTypes.ADD_A30D_REQUEST, addA30dRequest),
    takeLatest(A30dTypes.REMOVE_A30D_REQUEST, removeA30dRequest),
    takeLatest(A30dTypes.UPDATE_A30D_REQUEST, updateA30dRequest),
  ]);
}
