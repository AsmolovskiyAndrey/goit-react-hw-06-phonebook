import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'phoneBook',
  initialState: {
    contacts: [],
    filter: '',
  },
  reducers: {
    addFilter: (state, action) => {
      state.filter = action.payload;
    },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
    addMyContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteMyContact: (state, action) => {
      console.log(action.payload);
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { addMyContact, deleteMyContact, addFilter } =
  contactSlice.actions;

export default contactSlice.reducer;
