// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const combinationsSlice = createSlice({
//     name: 'combinations',
//     initialState: [],
//     reducers: {
//         setCombinations: (state, action) => action.payload,
//         updateCombinationInState: (state, action) => {
//             return state.map(combination =>
//                 combination._id === action.payload.productId
//                     ? { ...combination, ...action.payload.updatedDetails }
//                     : combination
//             );
//         },
//     },
// });

// export const { setCombinations,updateCombinationInState } = combinationsSlice.actions;
// export const fetchCombinations = () => async dispatch => {
//     const response = await axios.get('http://localhost:5000/api/combinations');
//     dispatch(setCombinations(response.data));
// };

// export const updateCombination = (productId, updatedDetails) => async dispatch => {
//     await axios.put(`http://localhost:5000/api/combinations/${productId}`, updatedDetails);
//     dispatch(updateCombinationInState({ productId, updatedDetails }));
// };

// export default combinationsSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    combinations: [],
    status: 'idle',
    error: null,
};

// Thunks for async actions
export const fetchCombinations = createAsyncThunk('combinations/fetchCombinations', async (filters) => {
    try {
        const response = await axios.get('http://localhost:5000/api/combinations', { params: filters });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});


export const createCombination = createAsyncThunk('combinations/createCombination', async (newCombination) => {
    try {
        const response = await axios.post('http://localhost:5000/api/combinations', newCombination);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const updateCombination = createAsyncThunk('combinations/updateCombination', async ({ id, updatedDetails }) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/combinations/${id}`, updatedDetails);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

// Slice
const combinationsSlice = createSlice({
    name: 'combinations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCombinations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCombinations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.combinations = action.payload;
            })
            .addCase(fetchCombinations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createCombination.fulfilled, (state, action) => {
                state.combinations.push(action.payload);
            })
            .addCase(updateCombination.fulfilled, (state, action) => {
                const index = state.combinations.findIndex(combination => combination._id === action.payload._id);
                if (index !== -1) {
                    state.combinations[index] = action.payload;
                }
            });
    },
});

export default combinationsSlice.reducer;
