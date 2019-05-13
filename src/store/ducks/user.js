export const Types = {
  LOGIN_REQUEST: 'user/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'user/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'user/LOGIN_FAILURE',
  LOGOUT: 'user/LOGOUT',
};

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('@Ondazul: user')) || {},
  token: localStorage.getItem('@Ondazul: token') || null,
  loading: false,
  err: false,
  success: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGOUT:
      return {
        user: {},
        token: null,
        loading: false,
        err: false,
        success: false,
      };
    case Types.LOGIN_REQUEST:
      return { ...state, loading: true, err: false };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        err: false,
        success: true,
      };
    case Types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
        success: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  loginRequest: (email, senha) => ({
    type: Types.LOGIN_REQUEST,
    payload: { email, senha },
  }),

  loginSuccess: (user, token) => ({
    type: Types.LOGIN_SUCCESS,
    payload: { user, token },
  }),

  loginFailure: err => ({
    type: Types.LOGIN_FAILURE,
    payload: { err },
  }),

  logout: () => ({
    type: Types.LOGOUT,
  }),
};
