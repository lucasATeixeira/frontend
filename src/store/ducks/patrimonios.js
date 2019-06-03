export const Types = {
  FETCH_DATA_PATRIMONIO: 'patrimonios/FETCH_DATA_PATRIMONIOS',
  ADD_PATRIMONIO_REQUEST: 'patrimonios/ADD_PATRIMONIO_REQUEST',
  ADD_PATRIMONIO_FAILURE: 'patrimonios/ADD_PATRIMONIO_FAILURE',
  ADD_PATRIMONIO_SUCCESS: 'patrimonios/ADD_PATRIMONIO_SUCCESS',
  REMOVE_PATRIMONIO_REQUEST: 'patrimonios/REMOVE_PATRIMONIO_REQUEST',
  REMOVE_PATRIMONIO_FAILURE: 'patrimonios/REMOVE_PATRIMONIO_FAILURE',
  REMOVE_PATRIMONIO_SUCCESS: 'patrimonios/REMOVE_PATRIMONIO_SUCCESS',
};

const local = JSON.parse(localStorage.getItem('@Ondazul: data')) || {
  patrimonios: {
    ativos: {
      total: 0,
      sumAtivosFinanceiros: 0,
      sumAtivosPatrimoniais: 0,
      list: [],
    },
    passivos: {
      total: 0,
      pmt: 0,
      sumPassivosFinanceiros: 0,
      sumPassivosPatrimoniais: 0,
      list: [],
    },
    patrimonioLiquido: 0,
  },
};
const INITIAL_STATE = {
  ...local.patrimonios,
  loading: false,
  success: false,
  err: false,
};

export default function patrimonios(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REMOVE_PATRIMONIO_REQUEST:
      return {
        ...state,
        loading: true,
        err: false,
        success: false,
      };
    case Types.REMOVE_PATRIMONIO_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
        success: false,
      };
    case Types.REMOVE_PATRIMONIO_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        ...action.payload.patrimonio,
      };
    case Types.ADD_PATRIMONIO_REQUEST:
      return {
        ...state,
        loading: true,
        err: false,
        success: false,
      };
    case Types.ADD_PATRIMONIO_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
        success: false,
      };
    case Types.ADD_PATRIMONIO_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        ...action.payload.patrimonio,
      };
    case Types.FETCH_DATA_PATRIMONIO:
      return {
        ...state,
        ...action.payload.patrimonio,
      };
    default:
      return state;
  }
}

export const Creators = {
  removePatrimonioRequest: patrimonio => ({
    type: Types.REMOVE_PATRIMONIO_REQUEST,
    payload: { patrimonio },
  }),

  removePatrimonioFailure: err => ({
    type: Types.REMOVE_PATRIMONIO_FAILURE,
    payload: { err },
  }),

  removePatrimonioSuccess: patrimonio => ({
    type: Types.REMOVE_PATRIMONIO_SUCCESS,
    payload: { patrimonio },
  }),

  fetchDataPatrimonios: patrimonio => ({
    type: Types.FETCH_DATA_PATRIMONIO,
    payload: { patrimonio },
  }),

  addPatrimonioRequest: patrimonio => ({
    type: Types.ADD_PATRIMONIO_REQUEST,
    payload: { patrimonio },
  }),

  addPatrimonioFailure: err => ({
    type: Types.ADD_PATRIMONIO_FAILURE,
    payload: { err },
  }),

  addPatrimonioSuccess: patrimonio => ({
    type: Types.ADD_PATRIMONIO_SUCCESS,
    payload: { patrimonio },
  }),
};
