import questions from '../../services/formCrencas';

export const Types = {
  NEXT: 'crencas/NEXT',
  NEW_QUIZ: 'crencas/NEW_QUIZ',
  FETCH_CRENCA: 'crencas/FETCH_CRENCA',
  SAVE_REQUEST: 'crencas/SAVE_REQUEST',
  SAVE_FAILURE: 'crencas/SAVE_FAILURE',
  SAVE_SUCCESS: 'crencas/SAVE_SUCCESS',
  UPDATE_REQUEST: 'crencas/UPDATE_REQUEST',
  UPDATE_FAILURE: 'crencas/UPDATE_FAILURE',
  UPDATE_SUCCESS: 'crencas/UPDATE_SUCCESS',
};

const local = JSON.parse(localStorage.getItem('@Ondazul: data')) || {
  crencas: {},
};

const INITIAL_STATE = {
  answers: [],
  loading: false,
  err: false,
  success: false,
  current: 0,
  questions,
  total: questions.length,
  ambiente: 0,
  causaEfeito: 0,
  capacidade: 0,
  valor: 0,
  identidade: 0,
  pertencimento: 0,
  espiritualidade: 0,
  done: false,
  coupleDone: false,
  ...local.crencas,
};

export default function crencas(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        err: false,
        success: false,
      };
    case Types.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
        success: false,
      };
    case Types.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        sucess: true,
        answers: [...action.payload.data],
      };
    case Types.NEW_QUIZ:
      return {
        ...state,
        done: false,
        current: 0,
        questions,
        total: questions.length,
        ambiente: 0,
        causaEfeito: 0,
        capacidade: 0,
        valor: 0,
        identidade: 0,
        pertencimento: 0,
        espiritualidade: 0,
      };
    case Types.FETCH_CRENCA:
      return {
        ...state,
        answers: [...action.payload.data],
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
  updateRequest: body => ({
    type: Types.UPDATE_REQUEST,
    payload: { body },
  }),

  updateFailure: err => ({
    type: Types.UPDATE_FAILURE,
    payload: { err },
  }),

  updateSuccess: data => ({
    type: Types.UPDATE_SUCCESS,
    payload: { data },
  }),

  newQuiz: () => ({
    type: Types.NEW_QUIZ,
  }),

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
    payload: { body: body.quiz, coupleDone: body.coupleDone },
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
