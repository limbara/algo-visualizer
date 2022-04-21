import { concatMap, delay, Observable, of } from 'rxjs';
import {
  HighlightItemLock,
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

export default class MergeSort implements Sorter {
  array: number[];
  speed: number;

  constructor(array: Array<number>, speed: number) {
    this.array = array.slice();
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

      const mergeHelper = (array: Array<number>, low: number, high: number) => {
        if (low >= high) {
          return;
        }

        // highlight divided array
        subscribe.next(
          new SorterEventHighlightItems(
            array
              .slice(low, high + 1)
              .map((_, index) => HighlightItemsDivide(low + index))
          )
        );

        const mid = Math.floor((low + high) / 2);
        mergeHelper(array, low, mid);
        mergeHelper(array, mid + 1, high);
        mergeArray(array, low, mid, high);
      };

      const mergeArray = (
        array: Array<number>,
        low: number,
        mid: number,
        high: number
      ) => {
        // highlight to merge array
        subscribe.next(
          new SorterEventHighlightItems(
            array
              .slice(low, high + 1)
              .map((_, index) => HighlightItemSelect(low + index))
          )
        );

        const tempArray = [];

        let firstStart = low,
          firstEnd = mid,
          secondStart = mid + 1,
          secondEnd = high;

        while (firstStart <= firstEnd && secondStart <= secondEnd) {
          if (array[firstStart] < array[secondStart]) {
            tempArray.push(array[firstStart]);
            firstStart++;
          } else {
            tempArray.push(array[secondStart]);
            secondStart++;
          }
        }

        // while first half of the array has items left
        while (firstStart <= firstEnd) {
          tempArray.push(array[firstStart]);
          firstStart++;
        }

        // while second half of the array has items left
        while (secondStart <= secondEnd) {
          tempArray.push(array[secondStart]);
          secondStart++;
        }

        // highlight lock merging array
        subscribe.next(
          new SorterEventHighlightItems(
            array
              .slice(low, high + 1)
              .map((_, index) => HighlightItemLock(low + index))
          )
        );

        // copy from sorted temp array to original array
        for (let k = 0; k < tempArray.length; k++) {
          array[low] = tempArray[k];
          low++;
        }

        // replace sorted array to original array, and highlight released from lock
        subscribe.next(
          new SorterEventSwap(array.slice(), [
            array
              .slice(low, high + 1)
              .map((_, index) => HighlightItemSelect(low + index)),
          ])
        );

        subscribe.next(new SorterEventHighlightItems([]));
      };

      mergeHelper(this.array, 0, this.array.length - 1);

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
