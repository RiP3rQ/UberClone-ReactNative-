import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  favoritePlaces: [],
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setFavoritePlaces: (state, action) => {
      state.favoritePlaces = [...state.favoritePlaces, action.payload];
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setFavoritePlaces,
} = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectFavoritePlaces = (state) => state.nav.favoritePlaces;

export default navSlice.reducer;
