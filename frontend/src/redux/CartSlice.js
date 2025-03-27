import {createSlice} from '@reduxjs/toolkit'


const CartSlice=createSlice({
    name:"cart",
    initialState:{
        products:[]
    },
    reducers:{
      addproduct: (state,action)=>{
         state.products.push(action.payload);
      },
      setCart:(state,action)=>{
        console.log(state.products);
        state.products=action.payload;
      }
    }
})
export const {addproduct,setCart}=CartSlice.actions;
export default CartSlice.reducer;