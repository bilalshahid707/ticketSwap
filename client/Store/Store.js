import { configureStore } from "@reduxjs/toolkit";
import {UserAuth}  from "../Services/UserAuth";
export const Store = configureStore({
    reducer:{
        "User":UserAuth.reducer
    },
})

export default Store