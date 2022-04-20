import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
import { SorterState } from '../../algo/interface';
import { RootState } from '../../store/store';

export interface SortVisualizerState {
  array: Array<number>;
  swappingIndex: [number, number] | [];
  isSwapping: boolean;
  isRunning: boolean;
  isDone: boolean;
}

const initialState: SortVisualizerState = {
  array: [],
  swappingIndex: [],
  isSwapping: false,
  isRunning: false,
  isDone: false,
};

const sortVisualizerSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<SorterState>) {
      state.isRunning = action.payload.isRunning;
      state.isDone = action.payload.isDone;
      state.isSwapping = action.payload.isSwapping;
      state.swappingIndex = action.payload.swappingIndex;

      if (
        action.payload.isSwapping &&
        action.payload.swappingIndex.length == 2
      ) {
        const [i, j] = action.payload.swappingIndex;
        [state.array[i], state.array[j]] = [state.array[j], state.array[i]];
      }
    },
    initArray(state, action: PayloadAction<Array<number>>) {
      state.array = action.payload;
    },
  },
});

export const { initArray, setState } = sortVisualizerSlice.actions;

export const selectArray = (state: RootState) =>
  state.sortvisualizer.present.array;
export const selectIsSwapping = (state: RootState) =>
  state.sortvisualizer.present.isSwapping;
export const selectIsRunning = (state: RootState) =>
  state.sortvisualizer.present.isRunning;
export const selectIsDone = (state: RootState) =>
  state.sortvisualizer.present.isDone;
export const selectSwappingIndex = (state: RootState) =>
  state.sortvisualizer.present.swappingIndex;

export default undoable(sortVisualizerSlice.reducer);
