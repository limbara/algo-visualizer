import { configureStore } from '@reduxjs/toolkit';
import sortVisualizerSlice from '../components/sort-visualizer/sortVisualizerSlice';
import toolbarReducer from '../components/toolbar/toolbarSlice';

export const store = configureStore({
  reducer: {
    toolbar: toolbarReducer,
    sortvisualizer: sortVisualizerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
