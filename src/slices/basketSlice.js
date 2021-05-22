import { createNextState, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },

    updateAmount: (state, action) => {
      state.items = state.items.map((item, index)=>{
        if(item.id === action.payload.id){
          return {...item, amount: action.payload.amount}
        }
        return item;
      });
    },

    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if(index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in basket`
        )
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket, updateAmount } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotalPrice = (state) => state.basket.items.reduce((total, item)=>total+ item.price*item.amount, 0);
export const selectTotalAmount = (state) => state.basket.items.reduce((amount, item)=>amount+item.amount, 0);

export default basketSlice.reducer;
