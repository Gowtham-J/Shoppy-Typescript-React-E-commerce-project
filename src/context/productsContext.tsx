import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/productsReducers";
import axios from "axios";
import { GlobalTypes } from "../actions";
import { products_url as url } from "../utils/constants";
import {
  ProductState,
  ProductsType,
  SingleProductType,
  Action,
  ProductsContextType,
} from "../reducers/ActionTypes/ActionProduct";

const initialState: ProductState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {} as SingleProductType,
};

const initialContextValue: ProductsContextType = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {} as SingleProductType,
  openSidebar: () => null,
  closeSidebar: () => null,
  fetchProducts: (url: string) => null,
  fetchSingleProduct: (url: string) => null,
};

const ProductsContext = createContext(initialContextValue);
type Props = {
  children: JSX.Element | JSX.Element[];
};

// type

export const ProductsProvider = ({ children }: Props) => {
  const [state, dispatch]: [ProductState, React.Dispatch<Action>] = useReducer(
    reducer,
    initialState
  );

  const openSidebar = () => {
    dispatch({ type: GlobalTypes.SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: GlobalTypes.SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url: string) => {
    dispatch({ type: GlobalTypes.GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products: ProductsType[] = response.data;
      dispatch({ type: GlobalTypes.GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GlobalTypes.GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (url: string) => {
    dispatch({ type: GlobalTypes.GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const singleProduct: SingleProductType = response.data;
      console.log("singleProduct", singleProduct);
      dispatch({
        type: GlobalTypes.GET_SINGLE_PRODUCT_SUCCESS,
        payload: singleProduct,
      });
    } catch (error) {
      dispatch({ type: GlobalTypes.GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  const contextValue: ProductsContextType = {
    ...state,
    openSidebar,
    closeSidebar,
    fetchProducts,
    fetchSingleProduct,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

// to use context
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
