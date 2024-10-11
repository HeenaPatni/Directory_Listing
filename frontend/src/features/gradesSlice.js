import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const gradesSlice = createSlice({
    name: 'grades',
    initialState: [],
    reducers: {
        setGrades: (state, action) => action.payload,
    },
});

export const { setGrades } = gradesSlice.actions;
export const fetchGrades = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/api/grades');
    dispatch(setGrades(response.data));
};
export default gradesSlice.reducer;
