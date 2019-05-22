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
};

const local = JSON.parse(localStorage.getItem('@Ondazul: data')) || {
  categorias: {
    categorias: [],
    gastosOrcados: 0,
    gastosRealizados: 0,
    recebimentosOrcados: 0,
    recebimentosRealizados: 0,
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
        gastosOrcados:
          state.gastosOrcados - (action.payload.tipo === 'gasto' ? action.payload.mensal : 0),
        gastosRealizados:
          state.gastosRealizados - (action.payload.tipo === 'gasto' ? action.payload.realizado : 0),
        recebimentosOrcados:
          state.recebimentosOrcados
          - (action.payload.tipo === 'recebimento' ? action.payload.mensal : 0),
        recebimentosRealizados:
          state.recebimentosRealizados
          - (action.payload.tipo === 'recebimento' ? action.payload.realizado : 0),
        categorias: state.categorias.map((c) => {
          if (action.payload.categoria !== c._id) return c;
          return {
            ...c,
            orcado: c.orcado - action.payload.mensal,
            realizado: c.realizado - action.payload.realizado,
            itens: c.itens.filter(i => i._id !== action.payload.item),
          };
        }),
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
        gastosOrcados:
          state.gastosOrcados
          + (action.payload.item.tipo === 'gasto' ? action.payload.item.mensal : 0),
        recebimentosOrcados:
          state.recebimentosOrcados
          + (action.payload.item.tipo === 'recebimento' ? action.payload.item.mensal : 0),
        categorias: state.categorias.map((c) => {
          if (action.payload.item.categoria !== c._id) return c;
          return {
            ...c,
            orcado: c.orcado + action.payload.item.mensal,
            itens: [...c.itens, action.payload.item],
          };
        }),
      };
    case Types.REMOVE_CATEGORIA_SUCCESS:
      return {
        ...state,
        loading: false,
        err: false,
        success: true,
        gastosOrcados:
          state.gastosOrcados - (action.payload.tipo === 'gasto' ? action.payload.orcado : 0),
        recebimentosOrcados:
          state.recebimentosOrcados
          - (action.payload.tipo === 'recebimento' ? action.payload.orcado : 0),
        gastosRealizados:
          state.gastosRealizados - (action.payload.tipo === 'gasto' ? action.payload.realizado : 0),
        recebimentosRealizados:
          state.recebimentosRealizados
          - (action.payload.tipo === 'recebimento' ? action.payload.realizado : 0),
        categorias: state.categorias.filter(c => c._id !== action.payload.categoria),
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
  removeItemRequest: (item, mensal, realizado, tipo, categoria) => ({
    type: Types.REMOVE_ITEM_REQUEST,
    payload: {
      item,
      mensal,
      realizado,
      tipo,
      categoria,
    },
  }),

  removeItemFailure: err => ({
    type: Types.REMOVE_ITEM_FAILURE,
    payload: { err },
  }),

  removeItemSuccess: (item, mensal, realizado, tipo, categoria) => ({
    type: Types.REMOVE_ITEM_SUCCESS,
    payload: {
      item,
      mensal,
      realizado,
      tipo,
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

  addItemSuccess: item => ({
    type: Types.ADD_ITEM_SUCCESS,
    payload: { item },
  }),

  removeCategoriaRequest: (categoria, orcado, realizado, tipo) => ({
    type: Types.REMOVE_CATEGORIA_REQUEST,
    payload: {
      categoria,
      orcado,
      realizado,
      tipo,
    },
  }),

  removeCategoriaFailure: err => ({
    type: Types.REMOVE_CATEGORIA_FAILURE,
    payload: { err },
  }),

  removeCategoriaSuccess: (categoria, orcado, realizado, tipo) => ({
    type: Types.REMOVE_CATEGORIA_SUCCESS,
    payload: {
      categoria,
      orcado,
      realizado,
      tipo,
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
