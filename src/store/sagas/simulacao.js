import { call, put } from 'redux-saga/effects';
import { Creators as SimulacaoActions } from '../ducks/simulacao';
import { Creators as A30dActions } from '../ducks/a30d';
import api from '../../services/api';

function createAction(content) {
  let estrategia = '';
  if (content.type === 'lp') {
    if (content.estrategia === 'uber') {
      estrategia = 'começar a andar de Uber';
    }
    if (content.estrategia === 'outro carro') {
      estrategia = 'comprar um carro mais barato';
    }
    if (content.estrategia === 'assinatura') {
      estrategia = 'fazer assinatura de um veículo';
    }
    return `Vender o patrimônio "${
      content.patrimoniosRemovidos[0].nome
    }", remover ${
      content.itensRemovidos.length
    } gastos do Orçamento, ${estrategia}${
      content.patrimoniosRemovidos.length && content.amortizacao.length
        ? ','
        : ' e'
    } ${
      content.patrimoniosRemovidos.length
        ? `quitar ${content.patrimoniosRemovidos.length - 1} dívida`
        : ''
    } ${
      content.amortizacao.length
        ? `e amortizar ${content.amortizacao.length} dívida`
        : ''
    }`;
  }

  if (content.type === 'eg') {
    return `Enxugar ${content.enxugar.length} gastos para abrir espaço no orçamento`;
  }

  if (content.type === 'ea') {
    return `Fazer um empréstimo de ${content.patrimonios[0].necessario.toLocaleString(
      'pt-br',
      {
        style: 'currency',
        currency: 'BRL',
      }
    )} com o(a) ${content.patrimonios[0].instituicao}${
      content.patrimoniosRemovidos.length && content.amortizacao.length
        ? ','
        : ' e'
    } ${
      content.patrimoniosRemovidos.length
        ? `quitar ${content.patrimoniosRemovidos.length} dívida`
        : ''
    } ${
      content.amortizacao.length
        ? `e amortizar ${content.amortizacao.length} dívida`
        : ''
    }`;
  }

  if (content.type === 're') {
    return `Utilizar ${content.patrimonios[0].nome} de recebimento extra${
      content.patrimoniosRemovidos.length && content.amortizacao.length
        ? ','
        : ' e'
    } ${
      content.patrimoniosRemovidos.length
        ? `quitar ${content.patrimoniosRemovidos.length} dívidas`
        : ''
    } ${
      content.amortizacao.length
        ? `e amortizar ${content.amortizacao.length} dívida`
        : ''
    }`;
  }

  if (content.type === 'cd') {
    return `Contratar o novo empréstimo ${content.patrimonios[0].nome} ${
      content.patrimoniosRemovidos.length
        ? `para quitar ${content.patrimoniosRemovidos.length} dívidas`
        : ''
    } ${
      content.amortizacao.length
        ? `e amortizar ${content.amortizacao.length} dívida`
        : ''
    }`;
  }

  return '';
}

export function* fetchSimulacaoRequest() {
  try {
    const { data } = yield call(api.get, 'api/simulacao');
    yield put(SimulacaoActions.fetchDataSuccess(data));
  } catch (err) {
    yield put(SimulacaoActions.fetchDataFailure(err));
  }
}

export function* removeSimulationRequest(action) {
  const { simulation } = action.payload;
  try {
    yield call(api.delete, `api/simulacao/${simulation._id}`);
    yield put(SimulacaoActions.removeSimulationSuccess(simulation));
  } catch (err) {
    yield put(SimulacaoActions.removeSimulationFailure(err));
  }
}

export function* submitSimulationRequest(action) {
  try {
    let { currentSimulation } = action.payload;
    currentSimulation = {
      enxugar: currentSimulation.enxugar.map(e => ({
        tipo: e.tipo,
        nomeCategoria: e.nomeCategoria,
        nome: e.nome,
        classificacao: e.classificacao,
        orcado: e.orcado,
        recorrencia: e.recorrencia,
        valorEnxugado: e.valorEnxugado,
        mensal:
          e.classificacao === 'Eventual'
            ? e.orcado / e.recorrencia
            : e.orcado * e.recorrencia,
        valorEnxugadoMensal:
          e.classificacao === 'Eventual'
            ? e.valorEnxugado / e.recorrencia
            : e.valorEnxugado * e.recorrencia,
      })),
      estrategia: currentSimulation.estrategia,
      itens: currentSimulation.itens.map(i => ({
        ...i,
        _id: null,
      })),
      patrimonios: currentSimulation.patrimonios.map(p => ({
        ...p,
        _id: null,
      })),
      type: currentSimulation.type,
      itensRemovidos: currentSimulation.itensRemovidos,
      patrimoniosRemovidos: currentSimulation.patrimoniosRemovidos,
      saldo: currentSimulation.saldo,
      amortizacao: currentSimulation.amortizacao,
    };
    const { data } = yield call(api.post, 'api/simulacao', currentSimulation);
    const response = {
      _id: data._id,
      ...currentSimulation,
      saldo: currentSimulation.saldo,
      recebimentos:
        (currentSimulation.itens[0]
          ? currentSimulation.itens
              .map(r => {
                if (r.tipo === 'recebimento' && r.classificacao !== 'Eventual')
                  return r.mensal;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0) -
        (currentSimulation.itensRemovidos[0]
          ? currentSimulation.itensRemovidos
              .map(r => {
                if (r.tipo === 'recebimento' && r.classificacao !== 'Eventual')
                  return r.mensal;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0),
      gastos:
        (currentSimulation.itens[0]
          ? currentSimulation.itens
              .map(r => {
                if (r.tipo === 'gasto') return r.mensal;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0) -
        ((currentSimulation.itensRemovidos[0]
          ? currentSimulation.itensRemovidos
              .map(r => {
                if (r.tipo === 'gasto') return r.mensal;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0) +
          currentSimulation.enxugar
            .map(e => e.mensal)
            .reduce((a, b) => a + b, 0) -
          currentSimulation.enxugar
            .map(e => e.valorEnxugadoMensal)
            .reduce((a, b) => a + b, 0)),
      ativos:
        (currentSimulation.patrimonios[0]
          ? currentSimulation.patrimonios
              .map(a => {
                if (a.tipo === 'ativo') return a.valor;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0) -
        (currentSimulation.patrimoniosRemovidos[0]
          ? currentSimulation.patrimoniosRemovidos
              .map(a => {
                if (a.tipo === 'ativo') return a.valor;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0),
      passivos:
        (currentSimulation.patrimonios[0]
          ? currentSimulation.patrimonios
              .map(a => {
                if (a.tipo === 'passivo') return a.total;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0) -
        (currentSimulation.patrimoniosRemovidos[0]
          ? currentSimulation.patrimoniosRemovidos
              .map(a => {
                if (a.tipo === 'passivo') return a.total;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0),
      pmt:
        (currentSimulation.patrimonios[0]
          ? currentSimulation.patrimonios
              .map(a => {
                if (a.tipo === 'passivo') return a.pmt;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0) -
        (currentSimulation.patrimoniosRemovidos[0]
          ? currentSimulation.patrimoniosRemovidos
              .map(a => {
                if (a.tipo === 'passivo') return a.pmt;
                return 0;
              })
              .reduce((a, b) => a + b)
          : 0),
    };

    const pmtSumValue = response.amortizacao
      .filter(a => !response.patrimoniosRemovidos.includes(a.divida))
      .reduce((total, next) => total + next.pmtDiff, 0);

    const totalDiff = response.amortizacao
      .filter(a => !response.patrimoniosRemovidos.includes(a.divida))
      .reduce((total, next) => total + next.totalDiff, 0);

    response.passivos += totalDiff;
    response.pmt += pmtSumValue;

    yield put(
      A30dActions.addA30dRequest({
        acao: createAction(response),
      })
    );

    yield put(SimulacaoActions.submitSimulationSuccess(response));
  } catch (err) {
    yield put(SimulacaoActions.submitSimulationFailure(err));
  }
}
