/* eslint-disable react-hooks/rules-of-hooks */
import { GlobalTypes } from "../actions";
import React, { useEffect } from "react";
import { useReducer, useContext } from "react";
import reducer from "../reducers/filterReducer";
import { useProductsContext } from "./productsContext";
import { ProductsContextType } from "../reducers/ActionTypes/ActionProduct";
import {
  FilterState,
  FilterContextType,
} from "../reducers/ActionTypes/ActionFilter";

const initialState: FilterState = {
  filtered_Products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const initialContextValue: FilterContextType = {
  filtered_Products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
  setGridView: () => null,
  setListView: () => null,
  updateSort: () => null,
  updateFilters: () => null,
  clearFilters: () => null,
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

const FilterContext = React.createContext(initialContextValue);

export const FilterProvider = ({ children }: Props) => {
  const { products }: ProductsContextType = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: GlobalTypes.LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: GlobalTypes.FILTER_PRODUCTS });
    dispatch({ type: GlobalTypes.SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: GlobalTypes.SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: GlobalTypes.SET_LISTVIEW });
  };

  const updateSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: GlobalTypes.UPDATE_SORT, payload: value });
  };

  const updateFilters = (
    e: React.ChangeEvent<HTMLInputElement>
    // any
    // | React.MouseEvent<HTMLButtonElement, MouseEvent>
    // | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let name: string = e.target.name;
    let value: string | number | undefined | null | boolean = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: GlobalTypes.UPDATE_FILTERS, payload: { name, value } });
  };

  const k = updateFilters;
  console.log("k", k);
  const clearFilters = () => {
    dispatch({ type: GlobalTypes.CLEAR_FILTERS });
  };

  const contextValue: FilterContextType = {
    ...state,
    setGridView,
    setListView,
    updateSort,
    updateFilters,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

// export default filterContext;

export const useFilterContext = () => {
  return useContext(FilterContext);
};
