import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ActionCreators } from "redux-undo"
import { generateRandomArray } from "../../utils/utils"
import { initArray, setState } from "./sortVisualizerSlice"
import useElementRect from "../../hooks/useElementRect"
import { SortVisualizerBoard } from "./SortVisualizerBoard"
import BubbleSort from "../../algo/bubbleSort"
import { selectSize, selectSpeed } from "../toolbar/toolbarSlice"

export function SortVisualizer() {
  const selectedSpeed = useSelector(selectSpeed)
  const selectedSize = useSelector(selectSize)

  const dispatch = useDispatch()
  const [setRef, domRect] = useElementRect()
  const [array, setArray] = useState<Array<number>>([])

  useEffect(() => {
    const generatedArray = generateRandomArray(selectedSize, 1, 100);

    setArray(generatedArray)
    dispatch(initArray(generatedArray))

  }, [selectedSpeed, selectedSize])

  const onClick = () => {
    dispatch(initArray(array))
    dispatch(ActionCreators.clearHistory())
    const bubbleSort = new BubbleSort(array.slice(), selectedSpeed)
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