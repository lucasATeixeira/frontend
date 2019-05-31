import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { Creators as PatrimoniosActions } from '../ducks/patrimonios';
import api from '../../services/api';

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
