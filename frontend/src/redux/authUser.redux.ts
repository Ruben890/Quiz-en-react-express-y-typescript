import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interface/interfaces";
import Cookies from "js-cookie";

interface AuthUserState {
  isLogin: boolean;
  myUser: User | null;
}

const initialState: AuthUserState = {
  isLogin: false,
  myUser: null,
};

const authUser = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
      // Guardar en las cookies
      Cookies.set("isLogin", action.payload.toString());
    },
    setMyUser: (state, action: PayloadAction<User | null>) => {
      state.myUser = action.payload;
    },
  },
});

export const { setAuthUser, setMyUser } = authUser.actions;
export default authUser.reducer;
