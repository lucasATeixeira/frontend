export const Types = {
  FETCH_DATA_CATEGORIAS: 'categorias/FETCH_DATA_CATEGORIAS',
  ADD_CATEGORIA_REQUEST: 'categorias/ADD_CATEGORIA_REQUEST',
  ADD_CATEGORIA_SUCCESS: 'categorias/ADD_CATEGORIA_SUCCESS',
  ADD_CATEGORIA_FAILURE: 'categorias/ADD_CATEGORIA_FAILURE',
  ADD_ITEM_REQUEST: 'categorias/ADD_ITEM_REQUEST',
  ADD_ITEM_FAILURE: 'categorias/ADD_ITEM_FAILURE',
  ADD_ITEM_SUCCESS: 'categorias/ADD_ITEM_SUCCESS',
  REMOVE_ITEM_REQUEST: 'categorias/REMOVE_ITEM_REQUEST',
  REMOVE_ITEM_FAILURE: 'categorias/REMOVE_ITEM_FAILURE',
  REMOVE_ITEM_SUCCESS: 'categorias/REMOVE_ITEM_SUCCESS',
  REMOVE_CATEGORIA_REQUEST: 'categorias/REMOVE_CATEGORIA_REQUEST',
  REMOVE_CATEGORIA_SUCCESS: 'categorias/REMOVE_CATEGORIA_SUCCESS',
  REMOVE_CATEGORIA_FAILURE: 'categorias/REMOVE_CATEGORIA_FAILURE',
  LANCAMENTO_REQUEST: 'categorias/LANCAMENTO_REQUEST',
  LANCAMENTO_SUCCESS: 'categorias/LANCAMENTO_SUCCESS',
  LANCAMENTO_FAILURE: 'categorias/LANCAMENTO_FAILURE',
  REMOVE_LANCAMENTO_REQUEST: 'categorias/REMOVE_LANCAMENTO_REQUEST',
  REMOVE_LANCAMENTO_SUCCESS: 'categorias/REMOVE_LANCAMENTO_SUCCESS',
  REMOVE_LANCAMENTO_FAILURE: 'categorias/REMOVE_LANCAMENTO_FAILURE',
  UPDATE_CATEGORIA_REQUEST: 'categorias/UPDATE_CATEGORIA_REQUEST',
  UPDATE_CATEGORIA_FAILURE: 'categorias/UPDATE_CATEGORIA_FAILURE',
  UPDATE_CATEGORIA_SUCCESS: 'categorias/UPDATE_CATEGORIA_SUCCESS',
  UPDATE_ITEM_REQUEST: 'categorias/UPDATE_ITEM_REQUEST',
  UPDATE_ITEM_FAILURE: 'categorias/UPDATE_ITEM_FAILURE',
  UPDATE_ITEM_SUCCESS: 'categorias/UPDATE_ITEM_SUCCESS',
  UPDATE_LANCAMENTO_REQUEST: 'categorias/UPDATE_LANCAMENTO_REQUEST',
  UPDATE_LANCAMENTO_FAILURE: 'categorias/UPDATE_LANCAMENTO_FAILURE',
  UPDATE_LANCAMENTO_SUCCESS: 'categorias/UPDATE_LANCAMENTO_SUCCESS',
};

const local = JSON.parse(localStorage.getItem('@Ondazul: data')) || {
  categorias: {
    categorias: [],
    gastosOrcados: 0,
    gastosRealizados: 0,
    gastosRealizadosParcelados: 0,
    recebimentosOrcados: 0,
    recebimentosRealizados: 0,
    recebimentosRealizadosParcelados: 0,
    mediaGastos: 0,
    mediaRecebimentos: 0,
    qntCategoriasRecebimentos: 0,
    qntCategoriasGastos: 0,
    qntItensRecebimentos: 0,
    qntItensGastos: 0,
    start: new Date(),
    end: new Date(),
    periodo: 1,
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
    case Types.UPDATE_LANCAMENTO_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.UPDATE_LANCAMENTO_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.UPDATE_LANCAMENTO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        err: false,
        ...action.payload.data,
      };
    case Types.UPDATE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.UPDATE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        err: false,
        ...action.payload.data,
      };
    case Types.UPDATE_CATEGORIA_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.UPDATE_CATEGORIA_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.UPDATE_CATEGORIA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        err: false,
        ...action.payload.data,
      };
    case Types.REMOVE_LANCAMENTO_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.REMOVE_LANCAMENTO_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.REMOVE_LANCAMENTO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        err: false,
        ...action.payload.categoria,
      };
    case Types.LANCAMENTO_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.LANCAMENTO_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.LANCAMENTO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        err: false,
        ...action.payload.categoria,
      };
    case Types.REMOVE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.REMOVE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        err: false,
        ...action.payload.categoria,
      };
    case Types.ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        err: false,
      };
    case Types.ADD_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        err: action.payload.err,
      };
    case Types.ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        err: false,
        ...action.payload.categoria,
      };
    case Types.REMOVE_CATEGORIA_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        ...action.payload.categoria,
      };
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
  updateLancamentoRequest: body => ({
    type: Types.UPDATE_LANCAMENTO_REQUEST,
    payload: { body },
  }),

  updateLancamentoFailure: err => ({
    type: Types.UPDATE_LANCAMENTO_FAILURE,
    payload: { err },
  }),

  updateLancamentoSuccess: data => ({
    type: Types.UPDATE_LANCAMENTO_SUCCESS,
    payload: { data },
  }),

  updateItemRequest: body => ({
    type: Types.UPDATE_ITEM_REQUEST,
    payload: { body },
  }),

  updateItemFailure: err => ({
    type: Types.UPDATE_ITEM_FAILURE,
    payload: { err },
  }),

  updateItemSuccess: data => ({
    type: Types.UPDATE_ITEM_SUCCESS,
    payload: { data },
  }),

  updateCategoriaRequest: body => ({
    type: Types.UPDATE_CATEGORIA_REQUEST,
    payload: { body },
  }),

  updateCategoriaFailure: err => ({
    type: Types.UPDATE_CATEGORIA_FAILURE,
    payload: { err },
  }),

  updateCategoriaSuccess: data => ({
    type: Types.UPDATE_CATEGORIA_SUCCESS,
    payload: { data },
  }),

  removeLancamentoRequest: lancamento => ({
    type: Types.REMOVE_LANCAMENTO_REQUEST,
    payload: { lancamento },
  }),

  removeLancamentoFailure: err => ({
    type: Types.REMOVE_LANCAMENTO_FAILURE,
    payload: { err },
  }),

  removeLancamentoSuccess: categoria => ({
    type: Types.REMOVE_LANCAMENTO_SUCCESS,
    payload: { categoria },
  }),

  lancamentoRequest: lancamento => ({
    type: Types.LANCAMENTO_REQUEST,
    payload: { lancamento },
  }),

  lancamentoFailure: err => ({
    type: Types.LANCAMENTO_FAILURE,
    payload: { err },
  }),

  lancamentoSuccess: categoria => ({
    type: Types.LANCAMENTO_SUCCESS,
    payload: { categoria },
  }),

  removeItemRequest: (item, mensal, realizado, tipo, categoria, realizadoParcelado) => ({
    type: Types.REMOVE_ITEM_REQUEST,
    payload: {
      item,
      mensal,
      realizado,
      tipo,
      categoria,
      realizadoParcelado,
    },
  }),

  removeItemFailure: err => ({
    type: Types.REMOVE_ITEM_FAILURE,
    payload: { err },
  }),

  removeItemSuccess: categoria => ({
    type: Types.REMOVE_ITEM_SUCCESS,
    payload: {
      categoria,
    },
  }),
  addItemRequest: item => ({
    type: Types.ADD_ITEM_REQUEST,
    payload: { item },
  }),

  addItemFailure: err => ({
    type: Types.ADD_ITEM_FAILURE,
    payloadg: { err },
  }),

  addItemSuccess: categoria => ({
    type: Types.ADD_ITEM_SUCCESS,
    payload: { categoria },
  }),

  removeCategoriaRequest: (categoria, orcado, realizado, tipo, realizadoParcelado) => ({
    type: Types.REMOVE_CATEGORIA_REQUEST,
    payload: {
      categoria,
      orcado,
      realizado,
      tipo,
      realizadoParcelado,
    },
  }),

  removeCategoriaFailure: err => ({
    type: Types.REMOVE_CATEGORIA_FAILURE,
    payload: { err },
  }),

  removeCategoriaSuccess: categoria => ({
    type: Types.REMOVE_CATEGORIA_SUCCESS,
    payload: {
      categoria,
    },
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
