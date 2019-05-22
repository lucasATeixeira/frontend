import { call, put } from 'redux-saga/effects';
import { Creators as CategoriasActions } from '../ducks/categorias';
import api from '../../services/api';

export function* addCategoriaRequest(action) {
  try {
    const { data } = yield call(api.post, 'api/categoria', action.payload.categoria);
    data.realizado = 0;
    data.orcado = 0;
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    local.categorias.categorias.push(data);
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CategoriasActions.addCategoriaSuccess(data));
  } catch (err) {
    yield put(CategoriasActions.addCategoriaFailure(err));
  }
}

export function* removeCategoriaRequest(action) {
  try {
    yield call(api.delete, `api/categoria/${action.payload.categoria}`);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    local.categorias = {
      ...local.categorias,
      gastosOrcados:
        local.categorias.gastosOrcados
        - (action.payload.tipo === 'gasto' ? action.payload.orcado : 0),
      recebimentosOrcados:
        local.categorias.recebimentosOrcados
        - (action.payload.tipo === 'recebimento' ? action.payload.orcado : 0),
      gastosRealizados:
        local.categorias.gastosRealizados
        - (action.payload.tipo === 'gasto' ? action.payload.realizado : 0),
      recebimentosRealizados:
        local.categorias.recebimentosRealizados
        - (action.payload.tipo === 'recebimento' ? action.payload.realizado : 0),
      categorias: local.categorias.categorias.filter(c => c._id !== action.payload.categoria),
    };
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(
      CategoriasActions.removeCategoriaSuccess(
        action.payload.categoria,
        action.payload.orcado,
        action.payload.realizado,
        action.payload.tipo,
      ),
    );
  } catch (err) {
    yield put(CategoriasActions.removeCategoriaFailure(err));
  }
}

export function* removeItemRequest(action) {
  try {
    yield call(api.delete, `api/item/${action.payload.item}`);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    local.categorias = {
      ...local.categorias,
      gastosOrcados:
        local.categorias.gastosOrcados
        - (action.payload.tipo === 'gasto' ? action.payload.mensal : 0),
      gastosRealizados:
        local.categorias.gastosRealizados
        - (action.payload.tipo === 'gasto' ? action.payload.realizado : 0),
      recebimentosOrcados:
        local.categorias.recebimentosOrcados
        - (action.payload.tipo === 'recebimento' ? action.payload.mensal : 0),
      recebimentosRealizados:
        local.categorias.recebimentosRealizados
        - (action.payload.tipo === 'recebimento' ? action.payload.realizado : 0),
      categorias: local.categorias.categorias.map((c) => {
        if (action.payload.categoria !== c._id) return c;
        return {
          ...c,
          orcado: c.orcado - action.payload.mensal,
          realizado: c.realizado - action.payload.realizado,
          itens: c.itens.filter(i => i._id !== action.payload.item),
        };
      }),
    };
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(
      CategoriasActions.removeItemSuccess(
        action.payload.item,
        action.payload.mensal,
        action.payload.realizado,
        action.payload.tipo,
        action.payload.categoria,
      ),
    );
  } catch (err) {
    yield put(CategoriasActions.removeItemFailure(err));
  }
}

export function* addItemRequest(action) {
  try {
    const { data } = yield call(api.post, 'api/item', action.payload.item);
    data.mensal = data.classificacao === 'Eventual'
      ? data.orcado / data.recorrencia
      : data.orcado * data.recorrencia;
    data.realizado = 0;
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    local.categorias = {
      ...local.categorias,
      gastosOrcados: local.categorias.gastosOrcados + (data.tipo === 'gasto' ? data.mensal : 0),
      recebimentosOrcados:
        local.categorias.recebimentosOrcados + (data.tipo === 'recebimento' ? data.mensal : 0),
      categorias: local.categorias.categorias.map((c) => {
        if (c._id !== data.categoria) return c;
        return {
          ...c,
          itens: [...c.itens, data],
          orcado: c.orcado + data.mensal,
        };
      }),
    };
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CategoriasActions.addItemSuccess(data));
  } catch (err) {
    yield put(CategoriasActions.addItemFailure(err));
  }
}
