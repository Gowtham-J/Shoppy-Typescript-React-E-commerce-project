import { GlobalTypes } from "../../actions";
import { SingleProductType } from "./ActionProduct";
export interface CartItem {
  amount: number;
  color: string;
  id: string;
  image: string;
  max: number;
  name: string;
  price: number;
}

export interface CartState {
  cart: CartItem[];
  total_items: number;
  total_amount: number;
  shipping_fee: number;
}

interface AddToCart {
  id: string;
  color: string;
  amount: number;
  product: SingleProductType;
}

type AddToCartType = {
  type: GlobalTypes.ADD_TO_CART;
  payload: AddToCart;
};

type RemoveCartItemType = {
  type: GlobalTypes.REMOVE_CART_ITEM;
  payload: string;
};

type ToggleCartItemAmountType = {
  type: GlobalTypes.TOGGLE_CART_ITEM_AMOUNT;
  payload: {
    id: string;
    value: string;
  };
};

type ActionType = {
  type: GlobalTypes.COUNT_CART_TOTALS | GlobalTypes.CLEAR_CART;
};

export type Action =
  | ActionType
  | ToggleCartItemAmountType
  | RemoveCartItemType
  | AddToCartType;

export interface CartContextType extends CartState {
  addToCart: (
    id: string,
    color: string,
    amount: number,
    product: SingleProductType
  ) => void;
  toggleAmount: (id: string, value: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}
