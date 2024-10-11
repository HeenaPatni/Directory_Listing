import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const materialsSlice = createSlice({
    name: 'materials',
    initialState: [],
    reducers: {
        setMaterials: (state, action) => action.payload,
    },
});

export const { setMaterials } = materialsSlice.actions;
export const fetchMaterials = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/api/materials');
    dispatch(setMaterials(response.data));
};
export default materialsSlice.reducer;
