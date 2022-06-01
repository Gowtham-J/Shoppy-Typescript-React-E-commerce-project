import React, { useEffect, useContext, useReducer, ContextType } from "react";
import reducer from "../reducers/cartReducer";
import { Children } from "../helpers/ChildrenType";
import { GlobalTypes } from "../actions";
import { SingleProductType } from "../reducers/ActionTypes/ActionProduct";
import {
  CartState,
  Action,
  CartContextType,
} from "../reducers/ActionTypes/ActionCart";
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const initialState: CartState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const initialContextValue: CartContextType = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
  toggleAmount: () => null,
  addToCart: () => null,
  removeItem: () => null,
  clearCart: () => null,
};

const CartContext = React.createContext<CartContextType>(initialContextValue);

export const CartProvider = ({ children }: Children) => {
  const [state, dispatch]: [CartState, React.Dispatch<Action>] = useReducer(
    reducer,
    initialState
  );
  console.log("state", state);
  // add to cart
  const addToCart = (
    id: string,
    color: string,
    amount: number,
    product: SingleProductType
  ) => {
    dispatch({
      type: GlobalTypes.ADD_TO_CART,
      payload: { id, color, amount, product },
    });
  };
  // remove item
  const removeItem = (id: string) => {
    dispatch({ type: GlobalTypes.REMOVE_CART_ITEM, payload: id });
  };
  // toggle amount
  const toggleAmount = (id: string, value: string) => {
    dispatch({
      type: GlobalTypes.TOGGLE_CART_ITEM_AMOUNT,
      payload: { id, value },
    });
  };
  //   // clear cart
  const clearCart = () => {
    dispatch({ type: GlobalTypes.CLEAR_CART });
  };

  useEffect(() => {
    dispatch({ type: GlobalTypes.COUNT_CART_TOTALS });

    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // const stateDuplicate = { ...state };

  const contextValue: CartContextType = {
    ...state,
    addToCart,
    removeItem,
    toggleAmount,
    clearCart,
  };

  console.log("contextValue", contextValue);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
// // make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
