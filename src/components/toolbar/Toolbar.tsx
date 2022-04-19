import { useDispatch, useSelector } from 'react-redux';
import { changeAlgo, selectAlgo, SortAlgoEnum } from './toolbarSlice'
import styles from './Toolbar.module.scss';

export function Toolbar() {
  const selectedAlgo = useSelector(selectAlgo)
  const dispatch = useDispatch();

  return (
    <div className={styles.toolbar}>
      <div className={`${styles.title} mr-5`}>
        <span>Sorting Visualizer</span>
      </div>
      <div className={styles.select_algo}>
        <label>Choose an Algo: </label>
        <select value={selectedAlgo} onChange={(e) => dispatch(changeAlgo(e.target.value as SortAlgoEnum))}>
          {
            Object.entries(SortAlgoEnum).map(([algo, value]) => (
              <option value={value} key={value}>{algo}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}