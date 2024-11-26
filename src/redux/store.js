import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.js";

export const makeStore = () => {
  return configureStore({
    reducer: { userReducer },
  });
};
