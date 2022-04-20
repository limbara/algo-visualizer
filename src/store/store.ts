import { configureStore } from '@reduxjs/toolkit';
import sortVisualizerBoardSlice from '../components/sort-visualizer/sortVisualizerBoardSlice';
import sortVisualizerSlice from '../components/sort-visualizer/sortVisualizerSlice';

export const store = configureStore({
  reducer: {
    sortvisualizer: sortVisualizerSlice,
    sortVisualizerBoard: sortVisualizerBoardSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
