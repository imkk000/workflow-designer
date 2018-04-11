import axios from 'axios'
import Node from './editor/node'
import loadNodeContextMenu from './editor/nodeContextMenu'
import errorDialog from './dialog/errorDialog'
import { addDataToGlobal } from './utility/editorMode'

const initialGlobalVariable = () => {
  addDataToGlobal('EDITOR_MODE', 'NORMAL')
  addDataToGlobal('NODES', {})
  addDataToGlobal('LINES', {})
}

const load = () => {
  // NOTE: initial global variable project
  initialGlobalVariable()

  // NOTE: create new svg, root area
  const svg = d3.select('svg.diagram-drawing')
  const root = svg.append('g').attr('class', 'root-area-group')

  // NOTE: create new temp area, draw area in root area
  root.append('g').attr('class', 'temp-area-group')
  root.append('g').attr('class', 'draw-area-group')

  axios
    .get('//127.0.0.1:3000/api/nodes')
    .then(({ data }) => {
      data.forEach(element => {
        new Node(element)
      })

      // NOTE: load all object for global use
      loadNodeContextMenu()
    })
    .catch(error => {
      errorDialog(error.response)
    })
}

document.addEventListener('contextmenu', event => event.preventDefault())
document.addEventListener('load', load())
