import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addressInitialState} from "./initialState";
import {IAddressDatas} from "./type";

export const addressSlice = createSlice({
  name: "address",
  initialState: addressInitialState,
  reducers: {
    setAddressDatas: (state, action: PayloadAction<IAddressDatas>) => {
      state.addressDatas = action.payload;
    },
    updateFirstAddress: state => {
      state.isFirstAddress = false;
    },
  },
});

export const {setAddressDatas, updateFirstAddress} = addressSlice.actions;

export default addressSlice.reducer;
