import {IAuthDatas, INoAuthDatas} from "./type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authInitialState} from "./initialState";

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setNoAuthDatas: (state, action: PayloadAction<INoAuthDatas>) => {
      state.noAuthDatas = action.payload;
    },
    setAuthDatas: (state, action: PayloadAction<IAuthDatas>) => {
      state.authDatas = action.payload;
    },
  },
});

export const {setNoAuthDatas, setAuthDatas} = authSlice.actions;

export default authSlice.reducer;
