import dom from 'jsx-render'
import axios from 'axios'
import GraphDataStructure from 'graph-data-structure'
import { errorDialog } from './editor/dialog'
import { setDataToGlobal, getDataFromGlobal } from './utility/editorMode'
import { getAppName, getAppTitle, getAppVersion, getAppAuthor } from './utility/aboutApp'
import xdom from './utility/xdom'
import attachDragAndDrop from './utility/attachDragAndDrop'

// NOTE: generate tag
xdom('head', <meta charset="utf-8" />)
xdom('head', <meta name="viewport" content="width=device-width" initial-scale="1.0" />)
xdom('head', <meta http-equiv="X-UA-Compatible" content="ie=edge" />)
xdom('head', <meta name="description" content={getAppTitle()} />)
xdom('head', <meta name="author" content={getAppAuthor()} />)
xdom(
  'head',
  <title>
    {getAppName()} - v{getAppVersion()} (Development Mode)
  </title>
)

xdom('body', <div id="node-preview" />)
xdom('body', <svg id="diagram-drawing" />)

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
          .attr('class', 'node')
          .attr('draggable', 'true')
          .style('background-color', fill)
          .style('border', `1px solid ${stroke}`)
          .style('color', stroke)
        node.append('span').text(label)

        attachDragAndDrop(svg, node)

        // NOTE: save node to buffer with nodeId
        buffer[type] = element
      })
    })
    .catch(error => {
      errorDialog(error.response)
    })
})
