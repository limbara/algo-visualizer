import styles from './Toolbar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from 'rsuite';
import { selectAlgo, selectIsRunning, selectSize, selectSpeed, setAlgo, setSize, setSpeed } from '../sort-visualizer/sortVisualizerSlice';
import { SortAlgoEnum } from '../../algo/interface';

export function Toolbar() {
  const selectedAlgo = useSelector(selectAlgo)
  const selectedSpeed = useSelector(selectSpeed)
  const selectedSize = useSelector(selectSize)
  const isRunning = useSelector(selectIsRunning)

  const dispatch = useDispatch();

  return (
    <div className={styles.toolbar}>
      <div className={styles.title}>
        <span>Sorting Visualizer</span>
      </div>
      <div className={styles.form}>
        <div className={`${styles.form_control} basis-1/4`}>
          <label>Choose an Algo : </label>
          <select value={selectedAlgo} onChange={(e) => dispatch(setAlgo(e.target.value as SortAlgoEnum))} disabled={isRunning} className="disabled:cursor-not-allowed">
            {
              Object.entries(SortAlgoEnum).map(([algo, value]) => (
                <option value={value} key={value}>{algo}</option>
              ))
            }
          </select>
        </div>
        <div className={`${styles.form_control} basis-1/2`}>
          <label>Speed : </label>
          <Slider
            progress
            min={0}
            max={1001}
            tooltip={false}
            defaultValue={selectedSpeed}
            disabled={isRunning}
            onChange={value => dispatch(setSpeed(Math.abs(value - 1000)))} />
        </div>
        <div className={`${styles.form_control} basis-1/2`}>
          <label>Size : </label>
          <Slider
            progress
            min={5}
            max={100}
            defaultValue={selectedSize}
            disabled={isRunning}
            onChange={value => dispatch(setSize(value))} />
        </div>
      </div>
    </div>
  )
}