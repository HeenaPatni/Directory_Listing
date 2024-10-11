import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => action.payload,
    },
});

export const { setProducts } = productsSlice.actions;
export const fetchProducts = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/api/products');
    dispatch(setProducts(response.data));
};
export default productsSlice.reducer;
