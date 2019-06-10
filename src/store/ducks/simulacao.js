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
};

const INITIAL_VALUE = {
  fetched: false,
  simulating: false,
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
};

export default function simulacao(state = INITIAL_VALUE, action) {
  switch (action.type) {
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
        ...action.payload.response,
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
          saldo: state.ativos - state.passivos,
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
