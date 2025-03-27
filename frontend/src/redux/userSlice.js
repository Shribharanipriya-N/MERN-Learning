import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            console.log(state.token);
        },
        removeToken: (state, action) => {
            state.token = null
        }
    }
})

export const { setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;