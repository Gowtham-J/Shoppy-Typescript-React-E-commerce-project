import {
  ProductState,
  Action,
  ProductsType,
} from "../reducers/ActionTypes/ActionProduct";
import { GlobalTypes } from "../actions";

const productsReducer = (state: ProductState, action: Action) => {
  if (action.type === GlobalTypes.SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === GlobalTypes.SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === GlobalTypes.GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (action.type === GlobalTypes.GET_PRODUCTS_SUCCESS) {
    // action.
    const products = action.payload;
    const featured_products: ProductsType[] = products.filter(
      (product: ProductsType) => {
        return product.featured === true;
      }
    );

    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
    };
  }

  if (action.type === GlobalTypes.GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }
  if (action.type === GlobalTypes.GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }
  if (action.type === GlobalTypes.GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }
  if (action.type === GlobalTypes.GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }
  throw new Error(`No Matching "${action.type}" - action-type`);
};

export default productsReducer;
