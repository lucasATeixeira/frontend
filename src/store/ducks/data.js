export const Types = {
  FETCH_DATA_REQUEST: 'data/FETCH_DATA_REQUEST',
  FETCH_DATA_FAILURE: 'data/FETCH_DATA_FAILURE',
  FETCH_DATA_SUCCESS: 'data/FETCH_DATA_SUCCESS',
};

const INITIAL_STATE = {
  loading: false,
  err: false,
  success: false,
};

export default function data(state = INITIAL_STATE, action) {
  switch (action.type) {
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
  fetchDataRequest: (start = new Date(), end = new Date()) => ({
    type: Types.FETCH_DATA_REQUEST,
    payload: { start, end },
  }),

  fetchDataSuccess: () => ({
    type: Types.FETCH_DATA_SUCCESS,
  }),

  fetchDataFailure: err => ({
    type: Types.FETCH_DATA_FAILURE,
    payload: { err },
  }),
};
