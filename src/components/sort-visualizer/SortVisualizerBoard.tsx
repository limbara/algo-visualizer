import PropTypes, { InferProps } from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectArray, selectIsRunning, selectIsSwapping, selectSwappingIndex } from './sortVisualizerBoardSlice';
import styles from './SortVisualizer.module.scss';

const getBarRatio = (array: Array<number>, parentWidth: number, parentHeight: number) => {
  return {
    width: parentWidth / array.length,
    height: parentHeight / Math.max(...array)
  }
}

function SortVisualizerBoard(props: InferProps<typeof SortVisualizerBoard.propTypes>) {
  const array = useSelector(selectArray)
  const swappingIndex = useSelector(selectSwappingIndex)
  const isSwapping = useSelector(selectIsSwapping)
  const isRunning = useSelector(selectIsRunning)

  const parentWidth = Math.floor(props.parentWidth)
  const parentHeight = Math.floor(props.parentHeight * 0.8) // only going to use 80% of available height
  const barRatio = getBarRatio(array, parentWidth, parentHeight)

  const barWidthWithMargin = Math.floor(barRatio.width * 1) // don't really have a width
  const barMargin = barWidthWithMargin * 0.2 // 20% of barWidthAndMargin goes to barMargin
  const barWidth = barWidthWithMargin - (barMargin * 2) // barWidth is barWidthWidthMargin minus left and right barMargin

  const createBar = (num: number, index: number) => {
    const height = num * barRatio.height
    const isInSwappingIndex = (swappingIndex as Array<number>).includes(index)

    const style = {
      transform: `translateY(${parentHeight - height}px)`,
      height: `${height}px`,
      width: `${barWidth}px`,
      marginLeft: `${barMargin * 2}px`,
    }

    if (isInSwappingIndex) {
      if (isSwapping) {
        Object.assign(style, { backgroundColor: '#e63946' })
      } else {
        Object.assign(style, { backgroundColor: '#a8dadc' })
      }
    }

    return (
      <div className={styles.bar} key={`${num}-${index}`} style={style}>{num}</div>
    )
  }

  const bars = array.map((num, index) => createBar(num, index))

  return (
    <React.Fragment>
      <div className="w-full my-5">
        {bars}
      </div>
      <div className="w-full">
        <button className={styles.button} onClick={props.onClick} disabled={isRunning}>Play</button>
        <button className={styles.button} onClick={props.onClickUndo} disabled={!props.isDone}>Undo</button>
        <button className={styles.button} onClick={props.onClickRedo} disabled={!props.isDone}>Redo</button>
      </div>
    </React.Fragment>
  )
}

SortVisualizerBoard.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClickUndo: PropTypes.func.isRequired,
  onClickRedo: PropTypes.func.isRequired,
  parentWidth: PropTypes.number.isRequired,
  parentHeight: PropTypes.number.isRequired,
  isDone: PropTypes.bool.isRequired
}

export { SortVisualizerBoard }