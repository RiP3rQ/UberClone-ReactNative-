import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: {
    items: [],
    restaurantName: "",
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      if (action.payload.checkboxValue) {
        state.selectedItems = {
          items: [...state.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        state.selectedItems = {
          items: [
            ...state.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart.selectedItems;

export default cartSlice.reducer;
