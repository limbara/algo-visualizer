import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export enum SortAlgoEnum {
  BubbleSort = 'BUBBLE_SORT',
  QuickSort = 'QUICK_SORT',
  MergeSort = 'MERGE_SORT',
  HeapSort = 'HEAP_SORT',
}

interface ToolbarState {
  algo: SortAlgoEnum;
  speed: number;
  size: number;
}

const initialState: ToolbarState = {
  algo: SortAlgoEnum.BubbleSort,
  speed: 50,
  size: 50,
};

const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    changeAlgo(state, action: PayloadAction<SortAlgoEnum>) {
      state.algo = action.payload;
    },
    changeSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
    changeSize(state, action: PayloadAction<number>) {
      state.size = action.payload;
    },
  },
});

export const { changeAlgo, changeSpeed, changeSize } = toolbarSlice.actions;

export const selectAlgo = (state: RootState) => state.toolbar.algo;
export const selectSpeed = (state: RootState) => state.toolbar.speed;
export const selectSize = (state: RootState) => state.toolbar.size;

export default toolbarSlice.reducer;
