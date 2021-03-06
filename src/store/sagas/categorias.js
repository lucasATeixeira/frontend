import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { Creators as CategoriasActions } from '../ducks/categorias';
import api from '../../services/api';

export function* updateLancamentoRequest(action) {
  const { body } = action.payload;
  body.mensal =
    body.formaPagamento === 'Parcelado' ? body.valor / body.vezes : body.valor;
  try {
    const { data } = yield call(api.put, `api/lancamento/${body._id}`, body);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));

    const start = moment(data.data)
      .utc()
      .isBetween(local.categorias.start, local.categorias.end);
    const end = moment(data.dataFinal)
      .utc()
      .isBetween(local.categorias.start, local.categorias.end);
    const middleStart = moment(local.categorias.start)
      .utc()
      .isBetween(data.data, data.dataFinal);
    const middleEnd = moment(local.categorias.end)
      .utc()
      .isBetween(data.data, data.dataFinal);

    const startAdd = moment(data.data)
      .utc()
      .isBetween(local.categorias.start, local.categorias.end);
    const endAdd = moment(data.dataFinal)
      .utc()
      .isBetween(local.categorias.start, local.categorias.end);
    const middleStartAdd = moment(local.categorias.start)
      .utc()
      .isBetween(data.data, data.dataFinal);
    const middleEndAdd = moment(local.categorias.end)
      .utc()
      .isBetween(data.data, data.dataFinal);

    data.mensal =
      data.formaPagamento === 'Parcelado'
        ? data.valor / data.vezes
        : data.valor;

    if (start || end || middleStart || middleEnd) {
      local.categorias.gastosRealizados -=
        data.tipo === 'gasto'
          ? data.formaPagamento !== 'Parcelado'
            ? data.mensal
            : 0
          : 0;

      local.categorias.gastosRealizadosParcelados -=
        data.tipo === 'gasto'
          ? data.formaPagamento === 'Parcelado'
            ? data.mensal
            : 0
          : 0;

      local.categorias.recebimentosRealizados -=
        data.tipo === 'recebimento'
          ? data.formaPagamento !== 'Parcelado'
            ? data.mensal
            : 0
          : 0;

      local.categorias.recebimentosRealizadosParcelados -=
        data.tipo === 'recebimento'
          ? data.formaPagamento === 'Parcelado'
            ? data.mensal
            : 0
          : 0;

      local.categorias.categorias = local.categorias.categorias.map(c => {
        if (c._id !== data.categoria) return c;
        return {
          ...c,
          realizado:
            c.realizado -
            (data.formaPagamento !== 'Parcelado' ? data.mensal : 0),
          realizadoParcelado:
            c.realizadoParcelado -
            (data.formaPagamento === 'Parcelado' ? data.mensal : 0),
          itens: c.itens.map(i => {
            if (i._id !== data.item) return i;
            if (i._id === data.item) {
              return {
                ...i,
                lancamentos: i.lancamentos.filter(l => l._id !== data._id),
                realizado:
                  c.realizado -
                  (data.formaPagamento !== 'Parcelado' ? data.mensal : 0),
                realizadoParcelado:
                  c.realizadoParcelado -
                  (data.formaPagamento === 'Parcelado' ? data.mensal : 0),
              };
            }
            return i;
          }),
        };
      });
    }

    if (startAdd || endAdd || middleStartAdd || middleEndAdd) {
      local.categorias.gastosRealizados +=
        data.tipo === 'gasto'
          ? body.formaPagamento !== 'Parcelado'
            ? body.mensal
            : 0
          : 0;

      local.categorias.gastosRealizadosParcelados +=
        data.tipo === 'gasto'
          ? body.formaPagamento === 'Parcelado'
            ? body.mensal
            : 0
          : 0;

      local.categorias.recebimentosRealizados +=
        data.tipo === 'recebimento'
          ? body.formaPagamento !== 'Parcelado'
            ? body.mensal
            : 0
          : 0;

      local.categorias.recebimentosRealizadosParcelados +=
        data.tipo === 'recebimento'
          ? body.formaPagamento === 'Parcelado'
            ? body.mensal
            : 0
          : 0;

      local.categorias.categorias = local.categorias.categorias.map(c => {
        if (c._id !== body.categoria) return c;
        return {
          ...c,
          realizado:
            c.realizado +
            (body.formaPagamento !== 'Parcelado' ? body.mensal : 0),
          realizadoParcelado:
            c.realizadoParcelado +
            (body.formaPagamento === 'Parcelado' ? body.mensal : 0),
          itens: c.itens.map(i => {
            if (i._id !== body.item) return i;
            return {
              ...i,
              lancamentos: [
                ...i.lancamentos,
                {
                  ...data,
                  ...body,
                },
              ],
              realizado:
                c.realizado +
                (body.formaPagamento !== 'Parcelado' ? body.mensal : 0),
              realizadoParcelado:
                c.realizadoParcelado +
                (body.formaPagamento === 'Parcelado' ? body.mensal : 0),
            };
          }),
        };
      });
    }

    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CategoriasActions.updateLancamentoSuccess(local.categorias));
  } catch (err) {
    yield put(CategoriasActions.updateLancamentoFailure(err));
  }
}

export function* updateItemRequest(action) {
  const { body } = action.payload;
  try {
    const { data } = yield call(api.put, `api/item/${body._id}`, body);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    data.mensal =
      data.classificacao === 'Eventual'
        ? (data.orcado * local.categorias.periodo) / data.recorrencia
        : data.orcado * local.categorias.periodo * data.recorrencia;
    body.mensal =
      body.classificacao === 'Eventual'
        ? (body.orcado * local.categorias.periodo) / body.recorrencia
        : body.orcado * local.categorias.periodo * body.recorrencia;

    local.categorias.gastosOrcados +=
      data.tipo === 'gasto' ? body.mensal - data.mensal : 0;
    local.categorias.recebimentosOrcados +=
      data.tipo === 'recebimento'
        ? (body.classificacao === 'Eventual' ? 0 : body.mensal) -
          (data.classificacao === 'Eventual' ? 0 : data.mensal)
        : 0;
    local.categorias.categorias = local.categorias.categorias.map(c => {
      if (c._id !== data.categoria) return c;
      return {
        ...c,
        orcado:
          c.orcado -
          (data.classificacao === 'Eventual' ? 0 : data.mensal) +
          (body.classificacao === 'Eventual' ? 0 : body.mensal),
        itens: c.itens.map(i => {
          if (i._id !== data._id) return i;
          return {
            ...i,
            nome: body.nome,
            classificacao: body.classificacao,
            mensal: body.mensal,
            orcado: body.orcado,
            recorrencia: body.recorrencia,
          };
        }),
      };
    });
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CategoriasActions.updateItemSuccess(local.categorias));
  } catch (err) {
    yield put(CategoriasActions.updateItemFailure(err));
  }
}

export function* updateCategoriaRequest(action) {
  const { body } = action.payload;
  try {
    const { data } = yield call(api.put, `api/categoria/${body._id}`, {
      nome: body.nome,
      classificacao: body.classificacao,
    });
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    local.categorias.categorias = local.categorias.categorias.map(c => {
      if (c._id !== body._id) return c;
      return {
        ...c,
        nome: data.nome,
        classificacao: data.classificacao,
      };
    });
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(CategoriasActions.updateCategoriaSuccess(local.categorias));
  } catch (err) {
    yield put(CategoriasActions.updateCategoriaFailure(err));
  }
}

export function* removeLancamentoRequest(action) {
  try {
    yield call(api.delete, `api/lancamento/${action.payload.lancamento._id}`);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    const start = moment(action.payload.lancamento.data)
      .utc()
      .isBetween(local.categorias.start, local.categorias.end);
    const end = moment(action.payload.lancamento.dataFinal)
      .utc()
      .isBetween(local.categorias.start, local.categorias.end);
    const middleStart = moment(local.categorias.start)
      .utc()
      .isBetween(
        action.payload.lancamento.data,
        action.payload.lancamento.dataFinal
      );
    const middleEnd = moment(local.categorias.end)
      .utc()
      .isBetween(
        action.payload.lancamento.data,
        action.payload.lancamento.dataFinal
      );
    if (start || end || middleStart || middleEnd) {
      local.categorias = {
        ...local.categorias,
        gastosRealizadosParcelados:
          local.categorias.gastosRealizadosParcelados -
          (action.payload.lancamento.tipo === 'gasto' &&
          action.payload.lancamento.formaPagamento === 'Parcelado'
            ? action.payload.lancamento.mensal
            : 0),
        gastosRealizados:
          local.categorias.gastosRealizados -
          (action.payload.lancamento.tipo === 'gasto' &&
          action.payload.lancamento.formaPagamento !== 'Parcelado'
            ? action.payload.lancamento.mensal
            : 0),
        recebimentosRealizadosParcelados:
          local.categorias.recebimentosRealizadosParcelados -
          (action.payload.lancamento.tipo === 'recebimento' &&
          action.payload.lancamento.formaPagamento === 'Parcelado'
            ? action.payload.lancamento.mensal
            : 0),
        recebimentosRealizados:
          local.categorias.recebimentosRealizados -
          (action.payload.lancamento.tipo === 'recebimento'
            ? action.payload.lancamento.mensal
            : 0),
        categorias: local.categorias.categorias.map(c => {
          if (c._id !== action.payload.lancamento.categoria) return c;
          return {
            ...c,
            realizado:
              c.formaPagamento !== 'Parcelado'
                ? c.realizado - action.payload.lancamento.mensal
                : c.realizado,
            realizadoParcelado:
              c.formaPagamento === 'Parcelado'
                ? c.realizadoParcelado - action.payload.lancamento.mensal
                : c.realizadoParcelado,
            itens: c.itens.map(i => {
              if (i._id !== action.payload.lancamento.item) return i;
              return {
                ...i,
                realizado:
                  i.formaPagamento !== 'Parcelado'
                    ? i.realizado - action.payload.lancamento.mensal
                    : i.realizado,
                realizadoParcelado:
                  i.formaPagamento === 'Pagamento'
                    ? i.realizado - action.payload.lancamento.mensal
                    : i.realizado,
                lancamentos: i.lancamentos.filter(
                  l => l._id !== action.payload.lancamento._id
                ),
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
    const { data } = yield call(
      api.post,
      'api/categoria',
      action.payload.categoria
    );

    data.realizado = 0;
    data.realizadoParcelado = 0;
    data.orcado = 0;

    data.itens = data.itens.map(item => ({
      ...item,
      mensal: 0,
      realizado: 0,
      realizadoParcelado: 0,
    }));

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
        local.categorias.gastosOrcados -
        (action.payload.tipo === 'gasto' ? action.payload.orcado : 0),
      recebimentosOrcados:
        local.categorias.recebimentosOrcados -
        (action.payload.tipo === 'recebimento' ? action.payload.orcado : 0),

      gastosRealizadosParcelados:
        local.categorias.gastosRealizadosParcelados -
        (action.payload.tipo === 'gasto'
          ? action.payload.realizadoParcelado
          : 0),
      gastosRealizados:
        local.categorias.gastosRealizados -
        (action.payload.tipo === 'gasto' ? action.payload.realizado : 0),
      recebimentosRealizadosParcelados:
        local.categorias.recebimentosRealizadosParcelados -
        (action.payload.tipo === 'recebimento'
          ? action.payload.realizadoParcelado
          : 0),
      recebimentosRealizados:
        local.categorias.recebimentosRealizados -
        (action.payload.tipo === 'recebimento' ? action.payload.realizado : 0),
      categorias: local.categorias.categorias.filter(
        c => c._id !== action.payload.categoria
      ),
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
        local.categorias.gastosOrcados -
        (action.payload.tipo === 'gasto' ? action.payload.mensal : 0),
      gastosRealizados:
        local.categorias.gastosRealizados -
        (action.payload.tipo === 'gasto' ? action.payload.realizado : 0),
      gastosRealizadosParcelados:
        local.categorias.gastosRealizadosParcelados -
        (action.payload.tipo === 'gasto'
          ? action.payload.realizadoParcelado
          : 0),
      recebimentosOrcados:
        local.categorias.recebimentosOrcados -
        (action.payload.tipo === 'recebimento'
          ? action.payload.classificacao === 'Eventual'
            ? 0
            : action.payload.mensal
          : 0),
      recebimentosRealizados:
        local.categorias.recebimentosRealizados -
        (action.payload.tipo === 'recebimento' ? action.payload.realizado : 0),
      recebimentosRealizadosParcelados:
        local.categorias.recebimentosRealizadosParcelados -
        (action.payload.tipo === 'recebimento'
          ? action.payload.realizadoParcelado
          : 0),
      categorias: local.categorias.categorias.map(c => {
        if (action.payload.categoria !== c._id) return c;
        return {
          ...c,
          orcado:
            c.orcado -
            (action.payload.tipo === 'recebimento'
              ? action.payload.classificacao === 'Eventual'
                ? 0
                : action.payload.mensal
              : action.payload.mensal),
          realizado: c.realizado - action.payload.realizado,
          realizadoParcelado:
            c.realizadoParcelado - action.payload.realizadoParcelado,
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
    data.mensal =
      data.classificacao === 'Eventual'
        ? (data.orcado * local.categorias.periodo) / data.recorrencia
        : data.orcado * local.categorias.periodo * data.recorrencia;
    data.realizado = 0;
    data.realizadoParcelado = 0;
    local.categorias = {
      ...local.categorias,
      gastosOrcados:
        local.categorias.gastosOrcados +
        (data.tipo === 'gasto' ? data.mensal : 0),
      recebimentosOrcados:
        local.categorias.recebimentosOrcados +
        (data.tipo === 'recebimento'
          ? data.classificacao === 'Eventual'
            ? 0
            : data.mensal
          : 0),
      categorias: local.categorias.categorias.map(c => {
        if (c._id !== data.categoria) return c;
        return {
          ...c,
          itens: [...c.itens, data],
          orcado:
            c.orcado +
            (data.tipo === 'recebimento'
              ? data.classificacao === 'Eventual'
                ? 0
                : data.mensal
              : data.mensal),
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
    const { data } = yield call(
      api.post,
      'api/lancamento',
      action.payload.lancamento
    );
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    const start = moment(data.data)
      .utc()
      .isBetween(local.categorias.start, local.categorias.end);
    const end = moment(data.dataFinal)
      .utc()
      .isBetween(local.categorias.start, local.categorias.end);
    const middleStart = moment(local.categorias.start)
      .utc()
      .isBetween(data.data, data.dataFinal);
    const middleEnd = moment(local.categorias.end)
      .utc()
      .isBetween(data.data, data.dataFinal);
    data.mensal =
      data.formaPagamento === 'Parcelado'
        ? data.valor / data.vezes
        : data.valor;
    if (start || end || middleStart || middleEnd) {
      local.categorias = {
        ...local.categorias,
        gastosRealizados:
          local.categorias.gastosRealizados +
          (data.tipo === 'gasto' && data.formaPagamento !== 'Parcelado'
            ? data.mensal
            : 0),
        gastosRealizadosParcelados:
          local.categorias.gastosRealizadosParcelados +
          (data.tipo === 'gasto' && data.formaPagamento === 'Parcelado'
            ? data.mensal
            : 0),
        recebimentosRealizados:
          local.categorias.recebimentosRealizados +
          (data.tipo === 'recebimento' ? data.mensal : 0),
        recebimentosRealizadosParcelados:
          local.categorias.recebimentosRealizadosParcelados +
          (data.tipo === 'recebimento' && data.formaPagamento === 'Parcelado'
            ? data.mensal
            : 0),
        categorias: local.categorias.categorias.map(c => {
          if (data.categoria !== c._id) return c;
          return {
            ...c,
            realizado:
              data.formaPagamento !== 'Parcelado'
                ? c.realizado + data.mensal
                : c.realizado,
            realizadoParcelado:
              data.formaPagamento === 'Parcelado'
                ? c.realizadoParcelado + data.mensal
                : c.realizadoParcelado,
            itens: c.itens.map(i => {
              if (data.item !== i._id) return i;
              return {
                ...i,
                realizadoParcelado:
                  data.formaPagamento === 'Parcelado'
                    ? i.realizadoParcelado + data.mensal
                    : i.realizadoParcelado,
                realizado:
                  data.formaPagamento !== 'Parcelado'
                    ? i.realizado + data.mensal
                    : i.realizado,
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
