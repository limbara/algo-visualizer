import { Observable } from 'rxjs';
import BubbleSort from './bubbleSort';

export enum SortAlgoEnum {
  BubbleSort = 'BUBBLE_SORT',
  QuickSort = 'QUICK_SORT',
  MergeSort = 'MERGE_SORT',
  HeapSort = 'HEAP_SORT',
}

export interface SorterState {
  array: Array<number>;
  swappingIndex: [number, number] | [];
  isSwapping: boolean;
  isRunning: boolean;
  isDone: boolean;
}

export interface Sorter {
  array: Array<number>;
  speed: number;

  sort(): Observable<SorterState>;
}

export function sorterFactory(
  array: Array<number>,
  speed: number,
  algo: SortAlgoEnum
): Sorter {
  switch (algo) {
    case SortAlgoEnum.BubbleSort:
      return new BubbleSort(array, speed);
    default:
      return new BubbleSort(array, speed);
  }
}
