import { Observable } from 'rxjs';

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
