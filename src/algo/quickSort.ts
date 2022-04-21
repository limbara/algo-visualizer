import { concatMap, delay, Observable, of } from 'rxjs';
import {
  HighlightItemLock,
  HighlightItemPivot,
  HighlightItemsDivide,
  HighlightItemSelect,
} from '../components/sort-visualizer/interfaces';
import {
  NullableSorterEvent,
  Sorter,
  SorterEventDone,
  SorterEventHighlightItems,
  SorterEventRunning,
  SorterEventSwap,
} from './interface';

export class QuickSort implements Sorter {
  array: Array<number>;
  speed: number;

  constructor(array: Array<number>, speed: number) {
    this.array = array;
    this.speed = speed;
  }

  sort(): Observable<NullableSorterEvent> {
    const observable = new Observable<NullableSorterEvent>((subscribe) => {
      if (this.array.length == 0) {
        // done streaming
        subscribe.next(new SorterEventDone(true));
        // end stream, auto unsubscribe
        subscribe.next(null);
      }

      const swap = (array: Array<number>, i: number, j: number) => {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      };

      const quickSortHelper = (
        array: Array<number>,
        start: number,
        end: number
      ) => {
        if (start >= end) {
          return;
        }

        // highlight divided quick sort partition
        subscribe.next(
          new SorterEventHighlightItems(
            array
              .slice(start, end)
              .map((_, index) => HighlightItemsDivide(start + index))
          )
        );

        const mid = Math.floor((start + end) / 2);

        // highlight select
        subscribe.next(
          new SorterEventHighlightItems([
            HighlightItemSelect(start),
            HighlightItemSelect(mid),
          ])
        );

        // highlight items to swap lock
        subscribe.next(
          new SorterEventHighlightItems([
            HighlightItemLock(start),
            HighlightItemLock(mid),
          ])
        );

        swap(array, start, mid);

        // set swap result and clear highlight
        subscribe.next(new SorterEventSwap(array.slice(), []));

        let pivot = start,
          left = start + 1,
          right = end;

        const HighlightPivot = HighlightItemPivot(pivot);

        while (left <= right) {
          if (array[left] > array[pivot] && array[right] < array[pivot]) {
            // highlight items to swap lock
            subscribe.next(
              new SorterEventHighlightItems([
                HighlightPivot,
                HighlightItemLock(left),
                HighlightItemLock(right),
              ])
            );

            swap(array, left, right);

            // set swap result and clear highlight, except pivot
            subscribe.next(
              new SorterEventSwap(array.slice(), [HighlightPivot])
            );
          }

          if (array[left] <= array[pivot]) {
            left++;
          }

          if (array[right] >= array[pivot]) {
            right--;
          }

          // highlight items select
          subscribe.next(
            new SorterEventHighlightItems([
              HighlightPivot,
              HighlightItemSelect(left),
              HighlightItemSelect(right),
            ])
          );
        }

        // highlight items select
        subscribe.next(
          new SorterEventHighlightItems([
            HighlightItemSelect(pivot),
            HighlightItemSelect(right),
          ])
        );

        // highlight items to swap lock
        subscribe.next(
          new SorterEventHighlightItems([
            HighlightItemLock(pivot),
            HighlightItemLock(right),
          ])
        );

        if (pivot != right) {
          swap(array, pivot, right);
        }

        // set swap result and clear highlight
        subscribe.next(new SorterEventSwap(array.slice(), []));

        quickSortHelper(array, start, right - 1);
        quickSortHelper(array, right + 1, end);
      };

      subscribe.next(new SorterEventRunning(true));

      quickSortHelper(this.array, 0, this.array.length - 1);

      // replace entire sorted array to original array
      subscribe.next(new SorterEventSwap(this.array.slice(), []));

      // stop running
      subscribe.next(new SorterEventRunning(false));
      // done streaming
      subscribe.next(new SorterEventDone(true));
      // end stream, auto unsubscribe
      subscribe.next(null);
    });

    return observable.pipe(concatMap((x) => of(x).pipe(delay(this.speed))));
  }
}
