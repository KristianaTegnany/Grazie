import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {inspirationInitialState} from "./initialState";
import {IInspirationDatas} from "./type";

export const inspirationSlice = createSlice({
  name: "inspiration",
  initialState: inspirationInitialState,
  reducers: {
    setInspirationDatas: (state, action: PayloadAction<IInspirationDatas>) => {
      state.inspirationDatas = action.payload;
    },
    updateFirstInspiration: state => {
      state.isFirstInspiration = false;
    },
  },
});

export const {setInspirationDatas, updateFirstInspiration} =
  inspirationSlice.actions;

export default inspirationSlice.reducer;
