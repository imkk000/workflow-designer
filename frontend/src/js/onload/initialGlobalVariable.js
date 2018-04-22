import GraphDataStructure from 'graph-data-structure'
import { setDataToGlobal } from '../utility/editorMode'
import { getDrawArea } from '../utility/getArea'

const initialGlobalVariable = () => {
  getDrawArea()
    .selectAll('*')
    .remove()

  setDataToGlobal('EDITOR_MODE', 'NORMAL')
  setDataToGlobal('NODES_PROPERTIES', {})
  setDataToGlobal('NODES', {})
  setDataToGlobal('LINES', {})
  setDataToGlobal('GRAPH', new GraphDataStructure())
}

// initial global variable project
window.addEventListener('load', () => {
  initialGlobalVariable()
})

export default initialGlobalVariable
