import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import materialsReducer from './features/materialsSlice';
import gradesReducer from './features/gradesSlice';
import combinationsReducer from './features/combinationsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        materials: materialsReducer,
        grades: gradesReducer,
        combinations: combinationsReducer,
    },
});
