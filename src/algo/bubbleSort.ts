import { concatMap, delay, Observable, of } from 'rxjs';
import { Sorter, SorterState } from './interface';

export default class BubbleSort implements Sorter {
  array: number[];
  speed: number;

  constructor(array: Array<number>, speed: number) {
    this.array = array;
    this.speed = speed;
  }

  sort(): Observable<SorterState> {
    const observable = new Observable<SorterState>((subscriber) => {
      // initialize running sort
      subscriber.next({
        array: this.array,
        swappingIndex: [],
        isSwapping: false,
        isRunning: true,
        isDone: false,
      });

      for (let i = 0; i < this.array.length; i++) {
        for (let j = 0; j < this.array.length - 1 - i; j++) {
          // swap checking
          subscriber.next({
            array: this.array,
            swappingIndex: [j, j + 1],
            isSwapping: false,
            isRunning: true,
            isDone: false,
          });

          if (this.array[j] > this.array[j + 1]) {
            // swapping lock
            subscriber.next({
              array: this.array,
              swappingIndex: [j, j + 1],
              isSwapping: true,
              isRunning: true,
              isDone: false,
            });

            const temp = this.array[j];
            this.array[j] = this.array[j + 1];
            this.array[j + 1] = temp;

            // swapping release
            subscriber.next({
              array: this.array,
              swappingIndex: [j, j + 1],
              isSwapping: false,
              isRunning: true,
              isDone: false,
            });
          }
        }
      }

      // stop and done
      subscriber.next({
        array: this.array,
        swappingIndex: [],
        isSwapping: false,
        isRunning: false,
        isDone: true,
      });
    });

    return observable.pipe(concatMap((x) => of(x).pipe(delay(this.speed))));
  }
}
