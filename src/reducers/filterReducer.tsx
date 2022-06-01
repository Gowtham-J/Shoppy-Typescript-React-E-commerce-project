import { FilterState, Action } from "./ActionTypes/ActionFilter";
import { GlobalTypes } from "../actions";
import { ProductsType } from "./ActionTypes/ActionProduct";

// type Props = {};
const demoReducer = (state: FilterState, action: Action) => {
  if (action.type === GlobalTypes.SIDEBAR_OPEN) {
    return { ...state, grid_view: true };
  }
  if (action.type === GlobalTypes.LOAD_PRODUCTS) {
    let maxPrice: number[] | number = action.payload.map(
      (p: ProductsType) => p.price
    );

    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_Products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === GlobalTypes.SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === GlobalTypes.SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === GlobalTypes.UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === GlobalTypes.SORT_PRODUCTS) {
    const { sort, filtered_Products } = state;
    let tempProducts: ProductsType[] = [...filtered_Products];

    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a: any, b: any): number => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort(
        (a: any, b: any): number => b.price - a.price
      );
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a: any, b: any) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_Products: tempProducts };
  }
  if (action.type === GlobalTypes.UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === GlobalTypes.FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    let tempProducts: any[] = [...all_products];
    // filtering
    // text

    if (text) {
      tempProducts = tempProducts.filter((product: any) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // category
    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product: any) => product.category === category
      );
    }
    // company
    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product: any) => product.company === company
      );
    }
    // colors
    if (color !== "all") {
      tempProducts = tempProducts.filter((product: any) => {
        return product.colors.find((c: any) => c === color);
      });
    }
    // price
    tempProducts = tempProducts.filter(
      (product: any) => product.price <= price
    );
    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product: any) => product.shipping === true
      );
    }
    return { ...state, filtered_Products: tempProducts };
  }
  if (action.type === GlobalTypes.CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action-type`);
};

export default demoReducer;
