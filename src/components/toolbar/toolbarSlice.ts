import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export enum SortAlgoEnum {
  BubbleSort = 'BUBBLE_SORT',
  SelectionSort = 'SELECTION_SORT',
  QuickSort = 'QUICK_SORT',
  MergeSort = 'MERGE_SORT',
  HeapSort = 'HEAP_SORT',
}

interface ToolbarState {
  algo: SortAlgoEnum;
}

const initialState: ToolbarState = { algo: SortAlgoEnum.BubbleSort };

const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    changeAlgo(state, action: PayloadAction<SortAlgoEnum>) {
      state.algo = action.payload;
    },
  },
});

export const { changeAlgo } = toolbarSlice.actions;
export const selectAlgo = (state: RootState) => state.toolbar.algo;
export default toolbarSlice.reducer;
