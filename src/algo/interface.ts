import { Observable } from 'rxjs';
import { HighlightItem } from '../components/sort-visualizer/interfaces';
import BubbleSort from './bubbleSort';
import HeapSort from './heapSort';
import MergeSort from './mergeSort';
import { QuickSort } from './quickSort';

export enum SorterEventEnum {
  Running = 'RUNNING',
  Done = 'DONE',
  HighlightItems = 'HIGHLIGHT_ITEMS',
  SwapItems = 'SWAP_ITEMS',
}

export interface SorterEvent {
  event: SorterEventEnum;
}

export class SorterEventRunning implements SorterEvent {
  event: SorterEventEnum;
  isRunning: boolean;

  constructor(isRunning: boolean) {
    this.event = SorterEventEnum.Running;
    this.isRunning = isRunning;
  }
}

export class SorterEventDone implements SorterEvent {
  event: SorterEventEnum;
  isDone: boolean;

  constructor(isDone: boolean) {
    this.event = SorterEventEnum.Done;
    this.isDone = isDone;
  }
}

export class SorterEventHighlightItems implements SorterEvent {
  event: SorterEventEnum;
  highlightItems: Array<HighlightItem>;

  constructor(highlightItems: Array<HighlightItem>) {
    this.event = SorterEventEnum.HighlightItems;
    this.highlightItems = highlightItems;
  }
}

export class SorterEventSwap implements SorterEvent {
  event: SorterEventEnum;
  array: Array<number>;
  highlightItems: Array<HighlightItem>;

  constructor(array: Array<number>, highlightItems: Array<HighlightItem>) {
    this.event = SorterEventEnum.SwapItems;
    this.array = array;
    this.highlightItems = highlightItems;
  }
}

export type NullableSorterEvent = SorterEvent | null;

export interface Sorter {
  array: Array<number>;
  speed: number;

  sort(): Observable<NullableSorterEvent>;
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
    case SortAlgoEnum.MergeSort:
      return new MergeSort(array, speed);
    case SortAlgoEnum.QuickSort:
      return new QuickSort(array, speed);
    case SortAlgoEnum.HeapSort:
      return new HeapSort(array, speed);
    default:
      return new BubbleSort(array, speed);
  }
}
