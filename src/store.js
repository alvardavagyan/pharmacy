import { configureStore } from "@reduxjs/toolkit";
import { medicneReducer } from "./feautures/Medicine/medicine.slice";

export const store=configureStore({
    reducer:medicneReducer
})