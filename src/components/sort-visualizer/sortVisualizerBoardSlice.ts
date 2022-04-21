import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { HighlightItem } from './interfaces';
import undoable from 'redux-undo';

export interface SortVisualizerBoardState {
  array: Array<number>;
  highlightItems: Array<HighlightItem>;
}

export type OptionalSortVisualierBoardState = Partial<SortVisualizerBoardState>;

const initialState: SortVisualizerBoardState = {
  array: [],
  highlightItems: [],
};

const sortVisualizerBoardSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<OptionalSortVisualierBoardState>) {
      if (action.payload.array != undefined) {
        state.array = action.payload.array;
      }

      if (action.payload.highlightItems != undefined) {
        state.highlightItems = action.payload.highlightItems;
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
export const selectHighlightItems = (state: RootState) =>
  state.sortVisualizerBoard.present.highlightItems;

export default undoable(sortVisualizerBoardSlice.reducer);
