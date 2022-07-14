import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_PAGINATION,
  PRODUCT_PARAMS,
  SEARCH_PRODUCT,
  SIGNIN,
  SIGNUP,
  UPDATE_PRODUCT,
  SORT_PRODUCT,
  FILTER_PRODUCT,
  SEARCH_SORT_PRODUCT,
  SET_UPDATE,
  ORDER_PRODUCT,
  SEARCH_FILTER_PRODUCT,
  FILTER_SORT_PRODUCT,
  FILTER_STATISTIC,
  TARGET_STATISTIC,
} from "../constant";

const initialState = {
  signup: {},
  signin: {},
  data_product: [],
  data_update: [],
  data_order: [],
  data_statistic: [],
  data_tager_statistic: [],
  isDelete: false,
  isCreate: false,
  isUpdate: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      state.signup = action.payload;
      return { ...state };
    case SIGNIN:
      state.signin = action.payload;
      return { ...state };
    case SEARCH_PRODUCT:
      state.data_product = action.payload;
      return { ...state };
    case SORT_PRODUCT:
      state.data_product = action.payload;
      return { ...state };
    case FILTER_PRODUCT:
      state.data_product = action.payload;
      return { ...state };
    case SEARCH_SORT_PRODUCT:
      state.data_product = action.payload;
      return { ...state };
    case SEARCH_FILTER_PRODUCT:
      state.data_product = action.payload;
      return { ...state };
    case FILTER_SORT_PRODUCT:
      state.data_product = action.payload;
      return { ...state };
    case PRODUCT_PARAMS:
      state.data_product = action.payload;
      return { ...state };
    case GET_PRODUCT_PAGINATION:
      state.data_product = action.payload;
      return { ...state };
    case DELETE_PRODUCT:
      state.isDelete = action.payload;
      return { ...state };
    case UPDATE_PRODUCT:
      state.isUpdate = action.payload;
      return { ...state };
    case SET_UPDATE:
      state.data_update = action.payload;
      return { ...state };
    case CREATE_PRODUCT:
      state.isCreate = action.payload;
      return { ...state };
    case ORDER_PRODUCT:
      state.data_order = action.payload;
      return { ...state };
    case FILTER_STATISTIC:
      state.data_statistic = action.payload;
      return { ...state };
    case TARGET_STATISTIC:
      state.data_tager_statistic = action.payload;
      return { ...state };
    default:
      return state;
  }
};
