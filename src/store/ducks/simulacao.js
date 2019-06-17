export const Types = {
  FETCH_DATA_REQUEST: 'simulacao/FETCH_DATA_REQUEST',
  FETCH_DATA_SUCCESS: 'simulacao/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILURE: 'simulacao/FETCH_DATA_FAILURE',
  START_SIMULATION: 'simulacao/START_SIMULATION',
  END_SIMULATION: 'simulacao/END_SIMULATION',
  SAVE_SIMULATION: 'simulacao/SAVE_SIMULATION',
  SUBMIT_SIMULATION_REQUEST: 'simulacao/SUBMIT_SIMULATION_REQUEST',
  SUBMIT_SIMULATION_FAILURE: 'simulacao/SUBMIT_SIMULATION_FAILURE',
  SUBMIT_SIMULATION_SUCCESS: 'simulacao/SUBMIT_SIMULATION_SUCCESS',
  REMOVE_SIMULATION_REQUEST: 'simulacao/REMOVE_SIMULATION_REQUEST',
  REMOVE_SIMULATION_SUCCESS: 'simlacao/REMOVE_SIMULATION_SUCCESS',
  REMOVE_SIMULATION_FAILURE: 'simulacao/REMOVE_SIMULATION_FAILURE',
  START_DETAILS: 'simulacao/START_DETAILS',
  END_DETAILS: 'simulacao/END_DETAILS',
};

const INITIAL_VALUE = {
  fetched: false,
  simulating: false,
  details: false,
  currentDetail: {},
  currentSimulation: {},
  loading: false,
  err: false,
  success: false,
  simulacoes: [],
  patrimonios: [],
  patrimoniosRemovidos: [],
  itens: [],
  itensRemovidos: [],
  recebimentos: 0,
  gastos: 0,
  ativos: 0,
  passivos: 0,
  pmt: 0,
  saldo: 0,
};

export default function simulacao(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case Types.START_DETAILS:
      return {
        ...state,
        details: true,
        currentDetail: {
          ...action.payload.content,
        },
      };
    case Types.END_DETAILS:
      return {
        ...state,
        details: false,
        currentDetail: {},
      };
    case Types.REMOVE_SIMULATION_REQUEST:
      return {
        ...state,
        loading: true,
        err: false,
        success: false,
      };
    case Types.REMOVE_SIMULATION_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
        success: false,
      };
    case Types.REMOVE_SIMULATION_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        simulacoes: state.simulacoes.filter(s => s._id !== action.payload.simulation._id),
        patrimonios: state.patrimonios.filter(
          p => !action.payload.simulation.patrimonios.map(s => s._id).includes(p._id),
        ),
        patrimoniosRemovidos: state.patrimoniosRemovidos.filter(
          p => !action.payload.simulation.patrimoniosRemovidos.map(s => s._id).includes(p._id),
        ),
        itens: state.itens.filter(
          i => !action.payload.simulation.itens.map(s => s._id).includes(i._id),
        ),
        itensRemovidos: state.itensRemovidos.filter(
          i => !action.payload.simulation.itensRemovidos.map(s => s._id).includes(i._id),
        ),
        recebimentos: state.recebimentos - action.payload.simulation.recebimentos,
        gastos: state.gastos - action.payload.simulation.gastos,
        ativos: state.ativos - action.payload.simulation.ativos,
        passivos: state.passivos - action.payload.simulation.passivos,
        pmt: state.pmt - action.payload.simulation.pmt,
        saldo: state.saldo - action.payload.simulation.saldo,
      };
    case Types.SUBMIT_SIMULATION_REQUEST:
      return {
        ...state,
        loading: true,
        currentSimulation: {},
        simulating: false,
        err: false,
        success: false,
      };
    case Types.SUBMIT_SIMULATION_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
        success: false,
      };
    case Types.SUBMIT_SIMULATION_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        simulacoes: [
          {
            ...action.payload.currentSimulation,
            saldo: action.payload.currentSimulation.saldo - state.saldo,
          },
          ...state.simulacoes,
        ],
        patrimonios: [...state.patrimonios, ...action.payload.currentSimulation.patrimonios],
        patrimoniosRemovidos: [
          ...state.patrimoniosRemovidos,
          ...action.payload.currentSimulation.patrimoniosRemovidos,
        ],
        itens: [...state.itens, ...action.payload.currentSimulation.itens],
        itensRemovidos: [
          ...state.itensRemovidos,
          ...action.payload.currentSimulation.itensRemovidos,
        ],
        recebimentos: state.recebimentos + action.payload.currentSimulation.recebimentos,
        gastos: state.gastos + action.payload.currentSimulation.gastos,
        ativos: state.ativos + action.payload.currentSimulation.ativos,
        passivos: state.passivos + action.payload.currentSimulation.passivos,
        pmt: state.pmt + action.payload.currentSimulation.pmt,
        saldo: action.payload.currentSimulation.saldo,
      };
    case Types.SAVE_SIMULATION:
      return {
        ...state,
        currentSimulation: {
          ...action.payload.currentSimulation,
        },
      };
    case Types.END_SIMULATION:
      return {
        ...state,
        simulating: false,
        currentSimulation: {},
      };
    case Types.START_SIMULATION:
      return {
        ...state,
        simulating: true,
        currentSimulation: {
          stage: 1,
          type: action.payload.type,
          itens: [],
          itensRemovidos: [],
          patrimonios: [],
          patrimoniosRemovidos: [],
          saldo: state.saldo,
          orcamento: 0,
          checked: undefined,
          estrategia: undefined,
        },
      };
    case Types.FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        err: false,
        fetched: true,
        ...action.payload.simulacaoResult,
      };
    default:
      return state;
  }
}

export const Creators = {
  startDetails: content => ({
    type: Types.START_DETAILS,
    payload: { content },
  }),

  endDetails: () => ({
    type: Types.END_DETAILS,
  }),

  removeSimulationRequest: simulation => ({
    type: Types.REMOVE_SIMULATION_REQUEST,
    payload: { simulation },
  }),

  removeSimulationFailure: err => ({
    type: Types.REMOVE_SIMULATION_FAILURE,
    payload: { err },
  }),

  removeSimulationSuccess: simulation => ({
    type: Types.REMOVE_SIMULATION_SUCCESS,
    payload: { simulation },
  }),

  submitSimulationRequest: currentSimulation => ({
    type: Types.SUBMIT_SIMULATION_REQUEST,
    payload: { currentSimulation },
  }),

  submitSimulationFailure: err => ({
    type: Types.SUBMIT_SIMULATION_FAILURE,
    payload: { err },
  }),

  submitSimulationSuccess: currentSimulation => ({
    type: Types.SUBMIT_SIMULATION_SUCCESS,
    payload: { currentSimulation },
  }),

  startSimulation: type => ({
    type: Types.START_SIMULATION,
    payload: { type },
  }),

  saveSimulation: currentSimulation => ({
    type: Types.SAVE_SIMULATION,
    payload: { currentSimulation },
  }),

  endSimulation: () => ({
    type: Types.END_SIMULATION,
  }),

  fetchDataRequest: () => ({
    type: Types.FETCH_DATA_REQUEST,
  }),

  fetchDataFailure: err => ({
    type: Types.FETCH_DATA_FAILURE,
    payload: { err },
  }),

  fetchDataSuccess: simulacaoResult => ({
    type: Types.FETCH_DATA_SUCCESS,
    payload: { simulacaoResult },
  }),
};
