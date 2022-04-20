import React from 'react'
import { SortVisualizer } from './components/sort-visualizer/SortVisualizer'
import { Toolbar } from './components/toolbar/Toolbar'

function App() {
  return (
    <React.Fragment>
      <Toolbar />
      <SortVisualizer />
    </React.Fragment>
  )
}

export default App
