import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { SortAlgoEnum } from '../../algo/interface';
import { generateRandomArray } from '../../utils/utils';

export interface SortVisualizerState {
  algo: SortAlgoEnum;
  array: Array<number>;
  size: number;
  speed: number;
  isRunning: boolean;
  isDone: boolean;
}

const initialState: SortVisualizerState = {
  algo: SortAlgoEnum.BubbleSort,
  array: generateRandomArray(50, 1, 100),
  size: 50,
  speed: 500,
  isRunning: false,
  isDone: false,
};

const sortVisualizerSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: {
    setSize(state, action: PayloadAction<number>) {
      state.size = action.payload;
      state.array = generateRandomArray(state.size, 1, 100);
    },
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
    setAlgo(state, action: PayloadAction<SortAlgoEnum>) {
      state.algo = action.payload;
    },
    setIsRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },
    setIsDone(state, action: PayloadAction<boolean>) {
      state.isDone = action.payload;
    },
  },
});

export const { setSize, setSpeed, setAlgo, setIsRunning, setIsDone } =
  sortVisualizerSlice.actions;

export const selectArray = (state: RootState) => state.sortvisualizer.array;
export const selectAlgo = (state: RootState) => state.sortvisualizer.algo;
export const selectSpeed = (state: RootState) => state.sortvisualizer.speed;
export const selectSize = (state: RootState) => state.sortvisualizer.size;
export const selectIsRunning = (state: RootState) =>
  state.sortvisualizer.isRunning;
export const selectIsDone = (state: RootState) => state.sortvisualizer.isDone;

export default sortVisualizerSlice.reducer;
