import { Observable } from 'rxjs';
import BubbleSort from './bubbleSort';

export type NullableSorterState = SorterState | null;

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

  sort(): Observable<NullableSorterState>;
}

export enum SortAlgoEnum {
  BubbleSort = 'BUBBLE_SORT',
  QuickSort = 'QUICK_SORT',
  MergeSort = 'MERGE_SORT',
  HeapSort = 'HEAP_SORT',
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
