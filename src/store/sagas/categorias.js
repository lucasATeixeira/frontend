import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { Creators as CategoriasActions } from '../ducks/categorias';
import api from '../../services/api';

export function* removeLancamentoRequest(action) {
  try {
    yield call(api.delete, `api/lancamento/${action.payload.lancamento._id}`);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    const start = moment(action.payload.lancamento.data).isBetween(
      local.categorias.start,
      local.categorias.end,
    );
    const end = moment(action.payload.lancamento.dataFinal).isBetween(
      local.categorias.start,
      local.categorias.end,
    );
    if (start || end) {
      local.categorias = {
        ...local.categorias,
        gastosRealizados:
          local.categorias.gastosRealizados
          - (action.payload.lancamento.tipo === 'gasto' ? action.payload.lancamento.mensal : 0),
        recebimentosRealizados:
          local.categorias.recebimentosRealizados
          - (action.payload.lancamento.tipo === 'recebimento' ? action.payload.lancamento.mensal : 0),
        categorias: local.categorias.categorias.map((c) => {
          if (c._id !== action.payload.lancamento.categoria) return c;
          return {
            ...c,
            realizado: c.realizado - action.payload.lancamento.mensal,
            itens: c.itens.map((i) => {
              if (i._id !== action.payload.lancamento.item) return i;
              return {
                ...i,
                realizado: i.realizado - action.payload.lancamento.mensal,
                lancamentos: i.lancamentos.filter(l => l._id !== action.payload.lancamento._id),
              };
            }),
          };
        }),
      };
    }
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CategoriasActions.removeLancamentoSuccess(local.categorias));
  } catch (err) {
    yield put(CategoriasActions.removeLancamentoFailure(err));
  }
}

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
    yield put(CategoriasActions.removeCategoriaSuccess(local.categorias));
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
    yield put(CategoriasActions.removeItemSuccess(local.categorias));
  } catch (err) {
    yield put(CategoriasActions.removeItemFailure(err));
  }
}

export function* addItemRequest(action) {
  try {
    const { data } = yield call(api.post, 'api/item', action.payload.item);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    data.mensal = data.classificacao === 'Eventual'
      ? (data.orcado * local.categorias.periodo) / data.recorrencia
      : data.orcado * local.categorias.periodo * data.recorrencia;
    data.realizado = 0;
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
    yield put(CategoriasActions.addItemSuccess(local.categorias));
  } catch (err) {
    yield put(CategoriasActions.addItemFailure(err));
  }
}

export function* lancamentoRequest(action) {
  try {
    const { data } = yield call(api.post, 'api/lancamento', action.payload.lancamento);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    const start = moment(data.data).isBetween(local.categorias.start, local.categorias.end);
    const end = moment(data.dataFinal).isBetween(local.categorias.start, local.categorias.end);
    data.mensal = data.formaPagamento === 'Parcelado' ? data.valor / data.vezes : data.valor;
    if (start || end) {
      local.categorias = {
        ...local.categorias,
        gastosRealizados:
          local.categorias.gastosRealizados + (data.tipo === 'gasto' ? data.mensal : 0),
        recebimentosRealizados:
          local.categorias.recebimentosRealizados + (data.tipo === 'recebimento' ? data.mensal : 0),
        categorias: local.categorias.categorias.map((c) => {
          if (data.categoria !== c._id) return c;
          return {
            ...c,
            realizado: c.realizado + data.mensal,
            itens: c.itens.map((i) => {
              if (data.item !== i._id) return i;
              return {
                ...i,
                realizado: i.realizado + data.mensal,
                lancamentos: [...i.lancamentos, data],
              };
            }),
          };
        }),
      };
    }
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CategoriasActions.lancamentoSuccess(local.categorias));
  } catch (err) {
    yield put(CategoriasActions.lancamentoFailure(err));
  }
}
