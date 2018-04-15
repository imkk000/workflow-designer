import dom from 'jsx-render'
import axios from 'axios'
import GraphDataStructure from 'graph-data-structure'
import { errorDialog } from './editor/dialog'
import { setDataToGlobal, getDataFromGlobal } from './utility/editorMode'
import xdom from './utility/xdom'
import attachDragAndDrop from './utility/attachDragAndDrop'

// NOTE: disable right click contextmenu
$(document).contextmenu(event => event.preventDefault())
$(document).ready(() => {
  // NOTE: initial global variable project
  setDataToGlobal('EDITOR_MODE', 'NORMAL')
  setDataToGlobal('NODES_BUFFER', {})
  setDataToGlobal('NODES', {})
  setDataToGlobal('LINES', {})
  setDataToGlobal('GRAPH', new GraphDataStructure())

  // NOTE: create new svg, root area
  const nodePreview = d3.select('#node-preview')
  const svg = d3.select('#diagram-drawing')
  const root = svg.append('g').attr('id', 'root-area-group')

  // NOTE: create new temp area, draw area in root area
  root.append('g').attr('id', 'temp-area-group')
  root.append('g').attr('id', 'draw-area-group')

  // NOTE: query nodes description
  axios
    .get('//127.0.0.1:3000/api/nodes')
    .then(({ data }) => {
      const buffer = getDataFromGlobal('NODES_BUFFER')

      data.forEach(element => {
        const { type, fill, stroke, label } = element
        const node = nodePreview
          .append('div')
          .attr('id', type)
          .attr('class', 'node p-2')
          .attr('draggable', 'true')
          .style('background-color', fill)

        node
          .append('span')
          .style('color', stroke)
          .text(label)

        attachDragAndDrop(svg, node)

        // NOTE: save node to buffer with nodeId
        buffer[type] = element
      })
    })
    .catch(error => {
      errorDialog(error.response)
    })
})
