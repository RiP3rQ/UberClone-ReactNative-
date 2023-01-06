import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: {
    items: [],
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
        };
      } else {
        state.selectedItems = {
          items: [
            ...state.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
        };
      }
    },
    CLEAR_CART: (state) => {
      state.selectedItems.items = [];
    },
  },
});

export const { ADD_TO_CART, CLEAR_CART } = cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart.selectedItems;

export default cartSlice.reducer;
