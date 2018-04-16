import GraphDataStructure from 'graph-data-structure'
import { setDataToGlobal } from '../utility/editorMode'

// initial global variable project
window.addEventListener('load', () => {
  setDataToGlobal('EDITOR_MODE', 'NORMAL')
  setDataToGlobal('NODES_PROPERTIES', {})
  setDataToGlobal('NODES', {})
  setDataToGlobal('LINES', {})
  setDataToGlobal('GRAPH', new GraphDataStructure())
})
