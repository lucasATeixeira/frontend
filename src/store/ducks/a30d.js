export const Types = {
  FETCH_DATA_A30D: 'a30d/FETCH_DATA_A30D',
  ADD_A30D_REQUEST: 'a30d/ADD_A30D_REQUEST',
  ADD_A30D_FAILURE: 'a30d/ADD_A30D_FAILURE',
  ADD_A30D_SUCCESS: 'a30d/ADD_A30D_SUCCESS',
  REMOVE_A30D_REQUEST: 'a30d/REMOVE_A30D_REQUEST',
  REMOVE_A30D_FAILURE: 'a30d/REMOVE_A30D_FAILURE',
  REMOVE_A30D_SUCCESS: 'a30d/REMOVE_A30D_SUCCESS',
  UPDATE_A30D_REQUEST: 'a30d/UPDATE_A30D_REQUEST',
  UPDATE_A30D_FAILURE: 'a30d/UPDATE_A30D_FAILURE',
  UPDATE_A30D_SUCCESS: 'a30d/UPDATE_A30D_SUCCESS',
};

const local = JSON.parse(localStorage.getItem('@Ondazul: data')) || { a30d: [] };

const INITIAL_STATE = {
  loading: false,
  err: false,
  success: false,
  a30d: local.a30d,
};

export default function a30d(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_DATA_A30D:
      return {
        ...state,
        a30d: action.payload.data,
      };
    case Types.ADD_A30D_REQUEST:
      return {
        ...state,
        loading: true,
        err: false,
        success: false,
      };
    case Types.ADD_A30D_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
        success: false,
      };
    case Types.ADD_A30D_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        a30d: action.payload.data,
      };
    case Types.REMOVE_A30D_REQUEST:
      return {
        ...state,
        loading: true,
        err: false,
        success: false,
      };
    case Types.REMOVE_A30D_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
        success: false,
      };
    case Types.REMOVE_A30D_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        a30d: action.payload.data,
      };
    case Types.UPDATE_A30D_REQUEST:
      return {
        ...state,
        loading: true,
        err: false,
        success: false,
      };
    case Types.UPDATE_A30D_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
        success: false,
      };
    case Types.UPDATE_A30D_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        a30d: action.payload.data,
      };
    default:
      return state;
  }
}

export const Creators = {
  fetchDataA30d: data => ({
    type: Types.FETCH_DATA_A30D,
    payload: { data },
  }),

  addA30dRequest: body => ({
    type: Types.ADD_A30D_REQUEST,
    payload: { body },
  }),

  addA30dFailure: err => ({
    type: Types.ADD_A30D_FAILURE,
    payload: { err },
  }),

  addA30dSuccess: data => ({
    type: Types.ADD_A30D_SUCCESS,
    payload: { data },
  }),

  removeA30dRequest: body => ({
    type: Types.REMOVE_A30D_REQUEST,
    payload: { body },
  }),

  removeA30dFailure: err => ({
    type: Types.REMOVE_A30D_FAILURE,
    payload: { err },
  }),

  removeA30dSuccess: data => ({
    type: Types.REMOVE_A30D_SUCCESS,
    payload: { data },
  }),

  updateA30dRequest: body => ({
    type: Types.UPDATE_A30D_REQUEST,
    payload: { body: body.body, _id: body._id },
  }),

  updateA30dFailure: err => ({
    type: Types.UPDATE_A30D_FAILURE,
    payload: { err },
  }),

  updateA30dSuccess: data => ({
    type: Types.UPDATE_A30D_SUCCESS,
    payload: { data },
  }),
};
