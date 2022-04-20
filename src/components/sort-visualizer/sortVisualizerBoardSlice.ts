import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import undoable from 'redux-undo';

export interface SortVisualizerBoardState {
  array: Array<number>;
  swappingIndex: [number, number] | [];
  isSwapping: boolean;
  isRunning: boolean;
}

const initialState: SortVisualizerBoardState = {
  array: [],
  swappingIndex: [],
  isSwapping: false,
  isRunning: false,
};

const sortVisualizerBoardSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<SortVisualizerBoardState>) {
      state.isRunning = action.payload.isRunning;
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

export const { initArray, setState } = sortVisualizerBoardSlice.actions;

export const selectArray = (state: RootState) =>
  state.sortVisualizerBoard.present.array;
export const selectIsSwapping = (state: RootState) =>
  state.sortVisualizerBoard.present.isSwapping;
export const selectIsRunning = (state: RootState) =>
  state.sortVisualizerBoard.present.isRunning;
export const selectSwappingIndex = (state: RootState) =>
  state.sortVisualizerBoard.present.swappingIndex;

export default undoable(sortVisualizerBoardSlice.reducer);
