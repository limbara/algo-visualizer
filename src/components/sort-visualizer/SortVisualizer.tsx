import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ActionCreators } from "redux-undo"
import { generateRandomArray } from "../../utils/utils"
import { initArray, setState } from "./sortVisualizerSlice"
import useElementRect from "../../hooks/useElementRect"
import { SortVisualizerBoard } from "./SortVisualizerBoard"
import BubbleSort from "../../algo/bubbleSort"

export function SortVisualizer() {
  const dispatch = useDispatch()
  const [setRef, domRect] = useElementRect()
  const [array] = useState(generateRandomArray(100, 1, 100))

  useEffect(() => {
    dispatch(initArray(array))
  }, [array])

  const onClick = () => {
    dispatch(initArray(array))
    dispatch(ActionCreators.clearHistory())
    const bubbleSort = new BubbleSort(array.slice(), 2)
    bubbleSort.sort().subscribe(sorterState => dispatch(setState(sorterState)))
  }

  const onClickUndo = () => dispatch(ActionCreators.undo())
  const onClickRedo = () => dispatch(ActionCreators.redo())

  return (
    <div className="w-11/12 h-screen mx-auto mt-2 mb-2" ref={setRef}>
      {
        domRect && <SortVisualizerBoard onClick={onClick} onClickRedo={onClickRedo} onClickUndo={onClickUndo} parentWidth={domRect.width} parentHeight={domRect.height} />
      }
    </div>
  )
}