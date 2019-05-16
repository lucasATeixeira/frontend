export const Types = {
  FETCH_DATA_CATEGORIAS: 'categorias/FETCH_DATA_CATEGORIAS',
  ADD_CATEGORIA_REQUEST: 'categorias/ADD_CATEGORIA_REQUEST',
  ADD_CATEGORIA_SUCCESS: 'categorias/ADD_CATEGORIA_SUCCESS',
  ADD_CATEGORIA_FAILURE: 'categorias/ADD_CATEGORIA_FAILURE',
  REMOVE_CATEGORIA_REQUEST: 'categorias/REMOVE_CATEGORIA_REQUEST',
  REMOVE_CATEGORIA_SUCCESS: 'categorias/REMOVE_CATEGORIA_SUCCESS',
  REMOVE_CATEGORIA_FAILURE: 'categorias/REMOVE_CATEGORIA_FAILURE',
};

const local = JSON.parse(localStorage.getItem('@Ondazul: data')) || {
  categorias: {
    categorias: [{}],
    gastosOrcados: 0,
    gastosRealizados: 0,
    recebimentosOrcados: 0,
    recebimentosRealizados: 0,
  },
};

const INITIAL_STATE = {
  ...local.categorias,
  loading: false,
  err: false,
  success: false,
};

export default function categorias(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.REMOVE_CATEGORIA_SUCCESS:
      return state;
    case Types.REMOVE_CATEGORIA_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.REMOVE_CATEGORIA_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.ADD_CATEGORIA_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.ADD_CATEGORIA_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.ADD_CATEGORIA_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        categorias: [...state.categorias, action.payload.categoria],
      };
    case Types.FETCH_DATA_CATEGORIAS:
      return {
        ...action.payload.newCategorias,
        loading: false,
        err: false,
        success: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  removeCategoriaRequest: id => ({
    type: Types.REMOVE_CATEGORIA_REQUEST,
    payload: { id },
  }),

  removeCategoriaFailure: err => ({
    type: Types.REMOVE_CATEGORIA_FAILURE,
    payload: { err },
  }),

  removeCategoriaSuccess: id => ({
    type: Types.REMOVE_CATEGORIA_SUCCESS,
    payload: { id },
  }),

  fetchDataCategorias: newCategorias => ({
    type: Types.FETCH_DATA_CATEGORIAS,
    payload: { newCategorias },
  }),

  addCategoriaRequest: categoria => ({
    type: Types.ADD_CATEGORIA_REQUEST,
    payload: { categoria },
  }),

  addCategoriaFailure: err => ({
    type: Types.ADD_CATEGORIA_FAILURE,
    payload: { err },
  }),

  addCategoriaSuccess: categoria => ({
    type: Types.ADD_CATEGORIA_SUCCESS,
    payload: { categoria },
  }),
};
