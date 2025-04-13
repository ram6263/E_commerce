import { configureStore } from "@reduxjs/toolkit";
import cartReduser  from './createSlice'

export const store=configureStore({
    reducer:{
        cart: cartReduser
    }
})