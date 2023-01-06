import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    cart: cartReducer,
  },
});
