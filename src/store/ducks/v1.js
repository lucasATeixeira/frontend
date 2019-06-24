export const Types = {
  FETCH_DATA_REQUEST: 'v1/FETCH_DATA_REQUEST',
  ADD_V1_REQUEST: 'v1/ADD_V1_REQUEST',
  ADD_V1_SUCCESS: 'v1/ADD_V1_SUCCESS',
  ADD_V1_FAILURE: 'v1/ADD_V1_FAILURE',
  REMOVE_V1_REQUEST: 'v1/REMOVE_V1_REQUEST',
  REMOVE_V1_FAILURE: 'v1/REMOVE_V1_FAILURE',
  REMOVE_V1_SUCCESS: 'v1/REMOVE_V1_SUCCESS',
};

const local = JSON.parse(localStorage.getItem('@Ondazul: data')) || { v1: [] };

const INITIAL_STATE = {
  err: false,
  success: false,
  loading: false,
  v1: local.v1,
};

export default function v1(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_DATA_REQUEST:
      return {
        ...state,
        v1: [...action.payload.data],
      };
    case Types.ADD_V1_REQUEST:
      return {
        ...state,
        err: false,
        success: false,
        loading: true,
      };
    case Types.ADD_V1_FAILURE:
      return {
        ...state,
        err: action.payload.err,
        success: false,
        loading: false,
      };
    case Types.ADD_V1_SUCCESS:
      return {
        ...state,
        err: false,
        success: true,
        loading: false,
        v1: action.payload.data,
      };
    case Types.REMOVE_V1_REQUEST:
      return {
        ...state,
        err: false,
        success: false,
        loading: true,
      };
    case Types.REMOVE_V1_FAILURE:
      return {
        ...state,
        err: action.payload.err,
        success: false,
        loading: false,
      };
    case Types.REMOVE_V1_SUCCESS:
      return {
        ...state,
        err: false,
        success: true,
        loading: false,
        v1: action.payload.data,
      };
    default:
      return state;
  }
}

export const Creators = {
  fetchDataRequest: data => ({
    type: Types.FETCH_DATA_REQUEST,
    payload: { data },
  }),

  addV1Request: body => ({
    type: Types.ADD_V1_REQUEST,
    payload: { body },
  }),

  addV1Failure: err => ({
    type: Types.ADD_V1_FAILURE,
    payload: { err },
  }),

  addV1Success: data => ({
    type: Types.ADD_V1_SUCCESS,
    payload: { data },
  }),

  removeV1Request: body => ({
    type: Types.REMOVE_V1_REQUEST,
    payload: { body },
  }),

  removeV1Failure: err => ({
    type: Types.REMOVE_V1_FAILURE,
    payload: { err },
  }),

  removeV1Success: data => ({
    type: Types.REMOVE_V1_SUCCESS,
    payload: { data },
  }),
};
