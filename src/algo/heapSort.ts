import { concatMap, delay, Observable, of } from 'rxjs';
import {
  HighlightItemLock,
  HighlightItemPivot,
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

export default class HeapSort implements Sorter {
  array: number[];
  speed: number;

  constructor(array: number[], speed: number) {
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

      const getParentIndex = (index: number) => {
        return Math.floor((index - 1) / 2);
      };

      const getLeftChildIndex = (index: number) => {
        return index * 2 + 1;
      };

      const getRightChildIndex = (index: number) => {
        return index * 2 + 2;
      };

      const hasParent = (index: number) => {
        return getParentIndex(index) >= 0;
      };

      const createMaxHeapArray = (array: number[]) => {
        for (let i = 1; i < array.length; i++) {
          // Heapify Up
          const HighlightHeapifyItem = HighlightItemPivot(i);

          const temp = array[i];
  
          while (hasParent(i) && array[getParentIndex(i)] < temp) {
            const parentIndex = getParentIndex(i);
  
            // highlight heapify up items
            subscribe.next(
              new SorterEventHighlightItems([
                HighlightHeapifyItem,
                HighlightItemSelect(i),
                HighlightItemSelect(parentIndex),
              ])
            );
  
            // highlight heapify up items to replace
            subscribe.next(
              new SorterEventHighlightItems([
                HighlightHeapifyItem,
                HighlightItemLock(i),
                HighlightItemLock(parentIndex),
              ])
            );
  
            array[i] = array[parentIndex];
  
            // replace original array to heapified array in store, and remove highlights
            subscribe.next(
              new SorterEventSwap(this.array.slice(), [HighlightHeapifyItem])
            );
  
            i = parentIndex;
          }
  
          // highlight Heapify Item and highlight i to replace to stored in memory value
          subscribe.next(
            new SorterEventHighlightItems([
              HighlightHeapifyItem,
              HighlightItemLock(i),
            ])
          );
  
          array[i] = temp;
  
          // replace original array to heapified array in store, and remove highlights
          subscribe.next(
            new SorterEventSwap(this.array.slice(), [HighlightHeapifyItem])
          );
        }

        return array;
      };

      const sortAndHeapifyDown = (array: number[]) => {
        for (let end = array.length - 1; end > 0; end--) {
          // highlight popped biggest item and the last item in array according to current end pointer
          subscribe.next(
            new SorterEventHighlightItems([
              HighlightItemSelect(end),
              HighlightItemSelect(0),
            ])
          );

          // highlight popped biggest item and the last item in array according to current end pointer to swap
          subscribe.next(
            new SorterEventHighlightItems([
              HighlightItemLock(end),
              HighlightItemLock(0),
            ])
          );

          const item = array[0];
          array[0] = array[end];
          array[end] = item;

          // replace original array to current sorted array & remove highlights
          subscribe.next(new SorterEventSwap(this.array.slice(), []));

          // heapify down
          let i = 0,
            j = getLeftChildIndex(i);

          while (j < end - 1) {
            const r = getRightChildIndex(i);

            // highlight heapify down item and current biggest child
            subscribe.next(
              new SorterEventHighlightItems([
                HighlightItemPivot(i),
                HighlightItemSelect(j),
              ])
            );

            if (array[r] > array[j]) {
              j = r;

              // highlight heapify down item and current biggest child (left child replace to right child)
              subscribe.next(
                new SorterEventHighlightItems([
                  HighlightItemPivot(i),
                  HighlightItemSelect(j),
                ])
              );
            }

            if (array[j] > array[i]) {
              // highlight heapify down item and current biggest child to swap
              subscribe.next(
                new SorterEventHighlightItems([
                  HighlightItemPivot(i),
                  HighlightItemLock(j),
                ])
              );

              [array[j], array[i]] = [array[i], array[j]];

              i = j;

              // replace original array to heapified array and remove highlights
              subscribe.next(
                new SorterEventSwap(this.array.slice(), [HighlightItemPivot(i)])
              );

              j = getLeftChildIndex(i);
            } else {
              break;
            }
          }
        }

        return array;
      };

      // running sort
      subscribe.next(new SorterEventRunning(true));

      const maxHeapArray = createMaxHeapArray(this.array)

      sortAndHeapifyDown(maxHeapArray);

      // replace entire sorted array to original array
      subscribe.next(new SorterEventSwap(maxHeapArray.slice(), []));
      // stop running
      subscribe.next(new SorterEventRunning(false));
      // done sorting
      subscribe.next(new SorterEventDone(true));
      // end stream, auto unsubscribe
      subscribe.next(null);
    });

    return observable.pipe(concatMap((x) => of(x).pipe(delay(this.speed))));
  }
}
