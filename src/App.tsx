import { Provider } from 'react-redux'
import { Toolbar } from './components/toolbar/Toolbar'
import { SortVisualizer } from './components/sort-visualizer/SortVisualizer'
import { store } from './store/store'
import { generateRandomArray } from './utils/utils'
import useElementRect from './hooks/useElementRect'

const array = generateRandomArray(100, 1, 100)

function App() {
  const [setRef, domRect] = useElementRect()

  return (
    <Provider store={store}>
      <Toolbar />
      <div className="w-11/12 h-screen mx-auto mt-2 mb-2" ref={setRef}>
        {
          domRect && <SortVisualizer array={array} parentWidth={domRect.width} parentHeight={domRect.height} />
        }
      </div>
    </Provider>
  )
}

export default App
