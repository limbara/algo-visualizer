import { concatMap, delay, Observable, of } from 'rxjs';
import {
  HighlightItemLock,
  HighlightItemSelect,
} from '../components/sort-visualizer/interfaces';
import {
  Sorter,
  NullableSorterEvent,
  SorterEventRunning,
  SorterEventHighlightItems,
  SorterEventSwap,
  SorterEventDone,
} from './interface';

export default class BubbleSort implements Sorter {
  array: number[];
  speed: number;

  constructor(array: Array<number>, speed: number) {
    this.array = array.slice();
    this.speed = speed;
  }

  sort(): Observable<NullableSorterEvent> {
    const observable = new Observable<NullableSorterEvent>((subscriber) => {
      // initialize running sort
      subscriber.next(new SorterEventRunning(true));

      for (let i = 0; i < this.array.length; i++) {
        for (let j = 0; j < this.array.length - 1 - i; j++) {
          // highlight items to check
          subscriber.next(
            new SorterEventHighlightItems([
              HighlightItemSelect(j),
              HighlightItemSelect(j + 1),
            ])
          );

          if (this.array[j] > this.array[j + 1]) {
            // highlight items to swap
            subscriber.next(
              new SorterEventSwap(this.array.slice(), [
                HighlightItemLock(j),
                HighlightItemLock(j + 1),
              ])
            );

            const temp = this.array[j];
            this.array[j] = this.array[j + 1];
            this.array[j + 1] = temp;

            // highlight items to swap release
            subscriber.next(
              new SorterEventSwap(this.array.slice(), [
                HighlightItemSelect(j),
                HighlightItemSelect(j + 1),
              ])
            );
          }

          // hightlight items to check release
          subscriber.next(new SorterEventHighlightItems([]));
        }
      }

      // stop running
      subscriber.next(new SorterEventRunning(false));
      // done sorting
      subscriber.next(new SorterEventDone(true));

      // end stream, auto unsubscribe
      subscriber.next(null);
    });

    return observable.pipe(concatMap((x) => of(x).pipe(delay(this.speed))));
  }
}
