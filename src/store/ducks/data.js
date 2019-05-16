export const Types = {
  FETCH_DATA_REQUEST: 'data/FETCH_DATA_REQUEST',
  FETCH_DATA_FAILURE: 'data/FETCH_DATA_FAILURE',
  FETCH_DATA_SUCCESS: 'data/FETCH_DATA_SUCCESS',
};

const INITIAL_STATE = {
  loading: false,
  err: false,
  success: true,
};

export default function data(state = INITIAL_STATE, action) {
  switch (action.payload) {
    case Types.FETCH_DATA_REQUEST:
      return {
        loading: true,
        err: false,
        success: false,
      };
    case Types.FETCH_DATA_FAILURE:
      return {
        loading: false,
        err: action.payload.err,
        success: false,
      };
    case Types.FETCH_DATA_SUCCESS:
      return {
        loading: false,
        err: false,
        success: true,
      };
    default:
      return state;
  }
}

export const Creators = {
  fetchDataRequest: () => ({
    type: Types.FETCH_DATA_REQUEST,
  }),

  fetchDataSuccess: () => ({
    type: Types.FETCH_DATA_SUCCESS,
  }),

  fetchDataFailure: err => ({
    type: Types.FETCH_DATA_FAILURE,
    payload: { err },
  }),
};
