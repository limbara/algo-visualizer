import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ActionCreators } from "redux-undo"
import useElementRect from "../../hooks/useElementRect"
import { SortVisualizerBoard } from "./SortVisualizerBoard"
import { selectAlgo, selectArray, selectIsDone, selectSpeed, setIsDone } from "./sortVisualizerSlice"
import { initArray, setState } from "./sortVisualizerBoardSlice"
import { sorterFactory } from "./../../algo/interface"

export function SortVisualizer() {
  const selectedSpeed = useSelector(selectSpeed)
  const selectedArray = useSelector(selectArray)
  const selectedAlgo = useSelector(selectAlgo)
  const selectedIsDone = useSelector(selectIsDone)

  let sorter = sorterFactory(selectedArray.slice(), selectedSpeed, selectedAlgo)

  const dispatch = useDispatch()
  const [setRef, domRect] = useElementRect()

  useEffect(() => {
    dispatch(setIsDone(false))
    dispatch(initArray(selectedArray))

    sorter = sorterFactory(selectedArray.slice(), selectedSpeed, selectedAlgo)
  }, [selectedArray, selectedSpeed, selectedAlgo])

  const onClick = () => {
    dispatch(setIsDone(false))
    dispatch(initArray(selectedArray))
    dispatch(ActionCreators.clearHistory())

    sorter.sort().subscribe(sorterState => {
      dispatch(setState(sorterState))

      sorterState.isDone && dispatch(setIsDone(true))
    })
  }

  const onClickUndo = () => dispatch(ActionCreators.undo())
  const onClickRedo = () => dispatch(ActionCreators.redo())

  return (
    <div className="w-11/12 h-screen mx-auto mt-2 mb-2" ref={setRef}>
      {
        domRect && <SortVisualizerBoard onClick={onClick} onClickRedo={onClickRedo} onClickUndo={onClickUndo} parentWidth={domRect.width} parentHeight={domRect.height} isDone={selectedIsDone} />
      }
    </div>
  )
}