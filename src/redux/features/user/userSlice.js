const { createSlice } = require("@reduxjs/toolkit");

// Safely access localStorage only on the client side
const persistAuthUser = () => {
  if (typeof window === "undefined") {
    return null; // Return null during SSR
  }

  return window.localStorage.getItem("authUser")
    ? JSON.parse(window.localStorage.getItem("authUser"))
    : null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
  },
  reducers: {
    initialAuthUser: (state) => {
      // Only update state if on the client side
      if (typeof window !== "undefined") {
        state.authUser = persistAuthUser();
      }
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("authUser", JSON.stringify(action.payload));
      }
    },
    clearAuthUser: (state) => {
      state.authUser = null;
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("authUser");
      }
    },
  },
});

export const { setAuthUser, clearAuthUser, initialAuthUser } =
  userSlice.actions;

export default userSlice.reducer;
