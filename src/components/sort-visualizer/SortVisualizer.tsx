import PropTypes, { InferProps } from 'prop-types';
import React from 'react';
import styles from './SortVisualizer.module.scss';

const getBarRatio = (array: Array<number>, parentWidth: number, parentHeight: number) => {
  return {
    width: parentWidth / array.length,
    height: parentHeight / Math.max(...array)
  }
}

function SortVisualizer(props: InferProps<typeof SortVisualizer.propTypes>) {
  const parentWidth = Math.floor(props.parentWidth)
  const parentHeight = Math.floor(props.parentHeight * 0.8) // only going to use 80% of available height
  const barRatio = getBarRatio(props.array as Array<number>, parentWidth, parentHeight)

  const barWidthWithMargin = barRatio.width * 1 // don't really have a width
  const barMargin = barWidthWithMargin * 0.2 // 20% of barWidthAndMargin goes to barMargin
  const barWidth = barWidthWithMargin - (barMargin * 2) // barWidth is barWidthWidthMargin minus left and right barMargin

  const createBar = (num: number, index: number) => {
    const height = num * barRatio.height
    const style = {
      transform: `translateY(${parentHeight - height}px)`,
      height: `${height}px`,
      width: `${barWidth}px`,
      marginLeft: `${barMargin * 2}px`,
    }

    return (
      <div className={styles.bar} key={`${num}-${index}`} style={style}>{num}</div>
    )
  }

  return (
    <React.Fragment>
      <div className="w-full">
        {
          props.array.map((num, index) => createBar(num as number, index))
        }
      </div>
      <button>Test</button>
    </React.Fragment>
  )
}

SortVisualizer.propTypes = {
  array: PropTypes.arrayOf(PropTypes.number).isRequired,
  parentWidth: PropTypes.number.isRequired,
  parentHeight: PropTypes.number.isRequired
}

export { SortVisualizer }