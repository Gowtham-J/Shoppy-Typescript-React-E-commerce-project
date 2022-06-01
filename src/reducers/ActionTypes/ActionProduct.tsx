import { GlobalTypes } from "../../actions";

export interface ProductsType {
  category: string;
  colors: string[];
  company: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  shipping: boolean;
  featured?: boolean;
}

export interface SingleProductType {
  category: string;
  colors: string[];
  company: string;
  description: string;
  id: string;
  images: SingleProductImage[];
  name: string;
  price: number;
  reviews: number;
  stars: number;
  stock: number;
}

export interface SingleProductImage {
  filename: string;
  height: number;
  id: string;
  size: number;
  thumbnails: {};
  type: string;
  url: string;
  width: number;
}

export interface ProductState {
  isSidebarOpen: boolean;
  products_loading: boolean;
  products_error: boolean;
  products: ProductsType[];
  featured_products: ProductsType[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: SingleProductType;
}

type ProductsActionType = {
  type: GlobalTypes.GET_PRODUCTS_SUCCESS;
  payload: ProductsType[];
};
type SingleProductActionType = {
  type: GlobalTypes.GET_SINGLE_PRODUCT_SUCCESS;
  payload: SingleProductType;
};

type ActionType = {
  type:
    | GlobalTypes.GET_PRODUCTS_BEGIN
    | GlobalTypes.GET_PRODUCTS_ERROR
    | GlobalTypes.GET_SINGLE_PRODUCT_BEGIN
    | GlobalTypes.GET_SINGLE_PRODUCT_ERROR
    | GlobalTypes.SIDEBAR_CLOSE
    | GlobalTypes.SIDEBAR_OPEN;
};

export type Action = ActionType | SingleProductActionType | ProductsActionType;

export interface ProductsContextType extends ProductState {
  openSidebar: () => void;
  closeSidebar: () => void;
  fetchProducts: (url: string) => void;
  fetchSingleProduct: (url: string) => void;
}
