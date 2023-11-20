import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";
import { SortVisualizerBoard } from "./SortVisualizerBoard";
import {
  selectAlgo,
  selectArray,
  selectIsDone,
  selectIsRunning,
  selectSpeed,
  setIsDone,
  setIsRunning,
} from "./sortVisualizerSlice";
import { initArray, setState } from "./sortVisualizerBoardSlice";
import {
  SorterEvent,
  SorterEventDone,
  SorterEventEnum,
  SorterEventHighlightItems,
  SorterEventRunning,
  SorterEventSwap,
  sorterFactory,
} from "./../../algo/interface";
import { map, takeWhile } from "rxjs";
import { useCallbackRef, useResizeObserver } from "@restart/hooks";

export function SortVisualizer() {
  const selectedSpeed = useSelector(selectSpeed);
  const selectedArray = useSelector(selectArray);
  const selectedAlgo = useSelector(selectAlgo);
  const selectedIsRunning = useSelector(selectIsRunning);
  const selectedIsDone = useSelector(selectIsDone);

  let sorter = sorterFactory(
    selectedArray.slice(),
    selectedSpeed,
    selectedAlgo
  );

  const dispatch = useDispatch();

  const [wrapperRef, setWrapperRef] = useCallbackRef<HTMLDivElement>();
  const wrapperRect = useResizeObserver(wrapperRef);

  useEffect(() => {
    dispatch(setIsDone(false));
    dispatch(initArray(selectedArray.slice()));

    sorter = sorterFactory(selectedArray.slice(), selectedSpeed, selectedAlgo);
  }, [selectedArray, selectedSpeed, selectedAlgo]);

  const onClick = () => {
    dispatch(setIsDone(false));
    dispatch(initArray(selectedArray.slice()));
    dispatch(ActionCreators.clearHistory());

    sorter
      .sort()
      .pipe(
        takeWhile((e) => e != null),
        map((e) => e as SorterEvent)
      )
      .subscribe((e) => {
        switch (e.event) {
          case SorterEventEnum.HighlightItems:
            dispatch(
              setState({
                highlightItems: (e as SorterEventHighlightItems).highlightItems,
              })
            );
            break;
          case SorterEventEnum.SwapItems:
            dispatch(
              setState({
                array: (e as SorterEventSwap).array,
                highlightItems: (e as SorterEventSwap).highlightItems,
              })
            );
            break;
          case SorterEventEnum.Running:
            dispatch(setIsRunning((e as SorterEventRunning).isRunning));
            break;
          case SorterEventEnum.Done:
            dispatch(setIsDone((e as SorterEventDone).isDone));
            break;
        }
      });
  };

  const onClickUndo = () => dispatch(ActionCreators.undo());
  const onClickRedo = () => dispatch(ActionCreators.redo());

  return (
    <div className="w-11/12 h-screen mx-auto mt-2 mb-2" ref={setWrapperRef}>
      {wrapperRect && (
        <SortVisualizerBoard
          onClick={onClick}
          onClickRedo={onClickRedo}
          onClickUndo={onClickUndo}
          parentWidth={wrapperRect.width}
          parentHeight={wrapperRect.height}
          isRunning={selectedIsRunning}
          isDone={selectedIsDone}
        />
      )}
    </div>
  );
}
