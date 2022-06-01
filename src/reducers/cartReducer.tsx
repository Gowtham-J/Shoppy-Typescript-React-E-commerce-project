import { GlobalTypes } from "../actions";
import { CartState, Action, CartItem } from "./ActionTypes/ActionCart";

const cart_reducer = (state: CartState, action: Action) => {
  if (action.type === GlobalTypes.ADD_TO_CART) {
    // ===================
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i: CartItem) => i.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem: CartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === GlobalTypes.REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(
      (item: CartItem) => item.id !== action.payload
    );
    return { ...state, cart: tempCart };
  }
  if (action.type === GlobalTypes.CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === GlobalTypes.TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item: any) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === GlobalTypes.COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;

        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
