import { useDispatch, useSelector } from 'react-redux';
import { changeAlgo, changeSize, changeSpeed, selectAlgo, selectSize, selectSpeed, SortAlgoEnum } from './toolbarSlice'
import { Slider } from 'rsuite';
import styles from './Toolbar.module.scss';

export function Toolbar() {
  const selectedAlgo = useSelector(selectAlgo)
  const selectedSpeed = useSelector(selectSpeed)
  const selectedSize = useSelector(selectSize)

  const dispatch = useDispatch();

  return (
    <div className={styles.toolbar}>
      <div className={styles.title}>
        <span>Sorting Visualizer</span>
      </div>
      <div className={styles.form}>
        <div className={`${styles.form_control} basis-1/4`}>
          <label>Choose an Algo : </label>
          <select value={selectedAlgo} onChange={(e) => dispatch(changeAlgo(e.target.value as SortAlgoEnum))}>
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
            min={1}
            max={100}
            defaultValue={selectedSpeed}
            onChange={value => dispatch(changeSpeed(value))} />
        </div>
        <div className={`${styles.form_control} basis-1/2`}>
          <label>Size : </label>
          <Slider
            progress
            min={10}
            max={100}
            defaultValue={selectedSize}
            onChange={value => dispatch(changeSize(value))} />
        </div>
      </div>
    </div>
  )
}