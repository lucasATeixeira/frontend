export const Types = {
  FETCH_DATA_REQUEST: 'v5/FETCH_DATA_REQUEST',
  ADD_V5_REQUEST: 'v5/ADD_V5_REQUEST',
  ADD_V5_SUCCESS: 'v5/ADD_V5_SUCCESS',
  ADD_V5_FAILURE: 'v5/ADD_V5_FAILURE',
  REMOVE_V5_REQUEST: 'v5/REMOVE_V5_REQUEST',
  REMOVE_V5_FAILURE: 'v5/REMOVE_V5_FAILURE',
  REMOVE_V5_SUCCESS: 'v5/REMOVE_V5_SUCCESS',
};

const local = JSON.parse(localStorage.getItem('@Ondazul: data')) || { v5: [] };

const INITIAL_STATE = {
  err: false,
  success: false,
  loading: false,
  v5: local.v5,
};

export default function v5(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_DATA_REQUEST:
      return {
        ...state,
        v5: [...action.payload.data],
      };
    case Types.ADD_V5_REQUEST:
      return {
        ...state,
        err: false,
        success: false,
        loading: true,
      };
    case Types.ADD_V5_FAILURE:
      return {
        ...state,
        err: action.payload.err,
        success: false,
        loading: false,
      };
    case Types.ADD_V5_SUCCESS:
      return {
        ...state,
        err: false,
        success: true,
        loading: false,
        v5: action.payload.data,
      };
    case Types.REMOVE_V5_REQUEST:
      return {
        ...state,
        err: false,
        success: false,
        loading: true,
      };
    case Types.REMOVE_V5_FAILURE:
      return {
        ...state,
        err: action.payload.err,
        success: false,
        loading: false,
      };
    case Types.REMOVE_V5_SUCCESS:
      return {
        ...state,
        err: false,
        success: true,
        loading: false,
        v5: action.payload.data,
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

  addV5Request: body => ({
    type: Types.ADD_V5_REQUEST,
    payload: { body },
  }),

  addV5Failure: err => ({
    type: Types.ADD_V5_FAILURE,
    payload: { err },
  }),

  addV5Success: data => ({
    type: Types.ADD_V5_SUCCESS,
    payload: { data },
  }),

  removeV5Request: body => ({
    type: Types.REMOVE_V5_REQUEST,
    payload: { body },
  }),

  removeV5Failure: err => ({
    type: Types.REMOVE_V5_FAILURE,
    payload: { err },
  }),

  removeV5Success: data => ({
    type: Types.REMOVE_V5_SUCCESS,
    payload: { data },
  }),
};
