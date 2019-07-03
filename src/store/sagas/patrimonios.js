import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { Creators as PatrimoniosActions } from '../ducks/patrimonios';
import api from '../../services/api';

export function* updatePatrimonioRequest(action) {
  const { body } = action.payload;
  try {
    const { data } = yield call(api.put, `api/patrimonio/${body._id}`, body);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    if (data.tipo === 'passivo') {
      data.parcelas = moment(data.dataFinal).diff(moment(), 'months') + 1;
      data.total = (moment(data.dataFinal).diff(moment(), 'months') + 1) * data.pmt;

      body.parcelas = moment(body.dataFinal).diff(moment(), 'months') + 1;
      body.total = (moment(body.dataFinal).diff(moment(), 'months') + 1) * body.pmt;

      local.patrimonios.patrimonioLiquido += body.total - data.total;

      local.patrimonios.passivos.pmt += body.pmt - data.pmt;
      local.patrimonios.passivos.sumPassivosFinanceiros
        += (data.classificacao === 'financeiro' ? -data.total : 0)
        + (data.classificacao === 'financeiro' ? body.total : 0);
      local.patrimonios.passivos.sumPassivosPatrimoniais
        += (data.classificacao === 'patrimonial' ? -data.total : 0)
        + (data.classificacao === 'patrimonial' ? body.total : 0);
      local.patrimonios.passivos.total += body.total - data.total;
      local.patrimonios.passivos.list = local.patrimonios.passivos.list.map((p) => {
        if (p._id !== data._id) return p;
        return {
          ...data,
          ...body,
        };
      });
    }
    if (data.tipo === 'ativo') {
      local.patrimonios.patrimonioLiquido += body.valor - data.valor;

      local.patrimonios.ativos.sumAtivosFinanceiros
        += (data.classificacao === 'financeiro' ? -data.valor : 0)
        + (data.classificacao === 'financeiro' ? body.valor : 0);
      local.patrimonios.ativos.sumAtivosPatrimoniais
        += (data.classificacao === 'patrimonial' ? -data.valor : 0)
        + (data.classificacao === 'patrimonial' ? body.valor : 0);
      local.patrimonios.ativos.total += body.valor - data.valor;
      local.patrimonios.ativos.list = local.patrimonios.ativos.list.map((a) => {
        if (a._id !== data._id) return a;
        return {
          ...data,
          ...body,
        };
      });
    }

    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(PatrimoniosActions.updatePatrimonioSuccess(local.patrimonios));
  } catch (err) {
    yield put(PatrimoniosActions.updatePatrimonioFailure(err));
  }
}

export function* removePatrimonioRequest(action) {
  const { patrimonio } = action.payload;
  try {
    yield call(api.delete, `api/patrimonio/${patrimonio._id}`);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    if (patrimonio.tipo === 'ativo') {
      local.patrimonios.ativos.list = local.patrimonios.ativos.list.filter(
        p => p._id !== patrimonio._id,
      );
      local.patrimonios.ativos.total -= patrimonio.valor;
      local.patrimonios.ativos.sumAtivosFinanceiros
        -= patrimonio.classificacao === 'financeiro' ? patrimonio.valor : 0;
      local.patrimonios.ativos.sumAtivosPatrimoniais
        -= patrimonio.classificacao === 'patrimonial' ? patrimonio.valor : 0;
    }
    if (patrimonio.tipo === 'passivo') {
      local.patrimonios.passivos.list = local.patrimonios.passivos.list.filter(
        p => p._id !== patrimonio._id,
      );
      local.patrimonios.passivos.total -= patrimonio.total;
      local.patrimonios.passivos.pmt -= patrimonio.pmt;
      local.patrimonios.passivos.sumPassivosFinanceiros
        -= patrimonio.classificacao === 'financeiro' ? patrimonio.total : 0;
      local.patrimonios.passivos.sumPassivosPatrimoniais
        -= patrimonio.classificacao === 'patrimonial' ? patrimonio.total : 0;
    }
    local.patrimonios.patrimonioLiquido
      -= patrimonio.tipo === 'passivo' ? -1 * patrimonio.total : patrimonio.valor;
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(PatrimoniosActions.removePatrimonioSuccess(local.patrimonios));
  } catch (err) {
    yield put(PatrimoniosActions.removePatrimonioFailure(err));
  }
}

export function* addPatrimonioRequest(action) {
  try {
    const { data } = yield call(api.post, 'api/patrimonio', action.payload.patrimonio);
    const local = JSON.parse(localStorage.getItem('@Ondazul: data'));
    if (data.tipo === 'ativo') {
      local.patrimonios.ativos.list.push(data);
      local.patrimonios.ativos.total += data.valor;
      local.patrimonios.ativos.sumAtivosFinanceiros
        += data.classificacao === 'financeiro' ? data.valor : 0;
      local.patrimonios.ativos.sumAtivosPatrimoniais
        += data.classificacao === 'patrimonial' ? data.valor : 0;
    }
    if (data.tipo === 'passivo') {
      data.parcelas = moment(data.dataFinal).diff(moment(), 'months') + 1;
      data.total = (moment(data.dataFinal).diff(moment(), 'months') + 1) * data.pmt;
      local.patrimonios.passivos.list.push(data);
      local.patrimonios.passivos.total += data.total;
      local.patrimonios.passivos.pmt += data.pmt;
      local.patrimonios.passivos.sumPassivosFinanceiros
        += data.classificacao === 'financeiro' ? data.total : 0;
      local.patrimonios.passivos.sumPassivosPatrimoniais
        += data.classificacao === 'patrimonial' ? data.total : 0;
    }
    local.patrimonios.patrimonioLiquido += data.tipo === 'passivo' ? -1 * data.total : data.valor;
    localStorage.setItem('@Ondazul: data', JSON.stringify(local));
    yield put(PatrimoniosActions.addPatrimonioSuccess(local.patrimonios));
  } catch (err) {
    yield put(PatrimoniosActions.addPatrimonioFailure(err));
  }
}
