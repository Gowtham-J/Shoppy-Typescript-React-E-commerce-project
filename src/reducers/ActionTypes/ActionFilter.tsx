import { GlobalTypes } from "../../actions";
import { ProductsType } from "./ActionProduct";

export interface FilterState {
  filtered_Products: ProductsType[];
  all_products: ProductsType[];
  grid_view: boolean;
  sort: string;
  filters: {
    text: string;
    company: string;
    category: string;
    color: string;
    min_price: number;
    max_price: number;
    price: number;
    shipping: boolean;
  };
}

type LoadProductsType = {
  type: GlobalTypes.LOAD_PRODUCTS;
  payload: ProductsType[];
};

type UpdateSortType = {
  type: GlobalTypes.UPDATE_SORT;
  payload: string;
};

type UpdateFilterType = {
  type: GlobalTypes.UPDATE_FILTERS;
  payload: {
    name: string;
    value: string | number | undefined | null | boolean;
  };
};

type ActionType = {
  type:
    | GlobalTypes.FILTER_PRODUCTS
    | GlobalTypes.SORT_PRODUCTS
    | GlobalTypes.SET_GRIDVIEW
    | GlobalTypes.SET_LISTVIEW
    | GlobalTypes.CLEAR_FILTERS
    | GlobalTypes.SIDEBAR_OPEN;
};

export type Action =
  | ActionType
  | UpdateSortType
  | LoadProductsType
  | UpdateFilterType;

export interface FilterContextType extends FilterState {
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: any) => void;
  // updateSort: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateFilters: (e: any) => void;
  // updateFilters: (
  //   e:
  //     | React.ChangeEvent<HTMLInputElement>
  //     | React.ChangeEvent<HTMLSelectElement>
  //     | React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => void;
  clearFilters: () => void;
}
