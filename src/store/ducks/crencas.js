import questions from '../../services/formCrencas';

export const Types = {
  NEXT: 'crencas/NEXT',
  FETCH_CRENCA: 'crencas/FETCH_CRENCA',
  SAVE_REQUEST: 'crencas/SAVE_REQUEST',
  SAVE_FAILURE: 'crencas/SAVE_FAILURE',
  SAVE_SUCCESS: 'crencas/SAVE_SUCCESS',
};

const local = JSON.parse(localStorage.getItem('@Ondazul: data')) || {
  crencas: {
    crencas: [],
    cat: null,
    done: false,
    ambiente: 0,
    causaEfeito: 0,
    capacidade: 0,
    valor: 0,
    identidade: 0,
    pertencimento: 0,
    espiritualidade: 0,
  },
};

const INITIAL_STATE = {
  loading: false,
  err: false,
  success: false,
  current: 0,
  questions,
  total: questions.length,
  ...local.crencas,
};

export default function crencas(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_CRENCA:
      return {
        ...state,
        ...action.payload.data,
      };
    case Types.SAVE_REQUEST:
      return {
        ...state,
        err: false,
        success: false,
        loading: true,
      };
    case Types.SAVE_FAILURE:
      return {
        ...state,
        err: action.payload.err,
        success: false,
        loading: false,
      };
    case Types.SAVE_SUCCESS:
      return {
        ...state,
        err: false,
        success: true,
        loading: false,
        ...action.payload.data,
      };
    case Types.NEXT:
      return {
        ...state,
        ...action.payload.data,
        current: state.current + 1,
      };
    default:
      return state;
  }
}

export const Creators = {
  fetchCrenca: data => ({
    type: Types.FETCH_CRENCA,
    payload: { data },
  }),

  next: data => ({
    type: Types.NEXT,
    payload: { data },
  }),

  saveRequest: body => ({
    type: Types.SAVE_REQUEST,
    payload: { body },
  }),

  saveFailure: err => ({
    type: Types.SAVE_FAILURE,
    payload: { err },
  }),

  saveSuccess: data => ({
    type: Types.SAVE_SUCCESS,
    payload: { data },
  }),
};
