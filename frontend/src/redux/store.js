import {configureStore} from '@reduxjs/toolkit';


import CartSlice from './CartSlice';
import userSlice from './userSlice';

const store=configureStore({
    reducer:{
        cart:CartSlice,
        user:userSlice,
    }
})

export default store;