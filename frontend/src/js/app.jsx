import axios from 'axios'
import GraphDataStructure from 'graph-data-structure'
import Node from './editor/node'
import { errorDialog } from './editor/dialog'
import EDITOR_MODE, { setEditorMode, setPassData, setDataToGlobal, getDataFromGlobal } from './utility/editorMode'
import { getAppName, getAppTitle, getAppVersion, getAppAuthor } from './utility/aboutApp'
import settingNodeMode from './mode/settingNodeMode'
import dom from 'jsx-render'
import xdom from './utility/xdom'

// NOTE: generate tag
xdom('head', <meta charset="utf-8" />)
xdom('head', <meta name="viewport" content="width=device-width" initial-scale="1.0" />)
xdom('head', <meta http-equiv="X-UA-Compatible" content="ie=edge" />)
xdom('head', <meta name="description" content={getAppTitle()} />)
xdom('head', <meta name="author" content={getAppAuthor()} />)
xdom('head', <title>{getAppName()} - v{getAppVersion()} (Development Mode)</title>)

xdom('body', <svg class="diagram-drawing"></svg>)

// NOTE: disable right click contextmenu
$(document).contextmenu(event => event.preventDefault())
$(document).ready(() => {
  // NOTE: initial global variable project
  setDataToGlobal('EDITOR_MODE', 'NORMAL')
  setDataToGlobal('NODES', {})
  setDataToGlobal('LINES', {})
  setDataToGlobal('GRAPH', new GraphDataStructure())

  // NOTE: create new svg, root area
  const svg = d3.select('svg.diagram-drawing')
  const root = svg.append('g').attr('class', 'root-area-group')

  // NOTE: create new temp area, draw area in root area
  root.append('g').attr('class', 'temp-area-group')
  root.append('g').attr('class', 'draw-area-group')

  // NOTE: query nodes description
  const nodesBuffer = []
  axios
    .get('//127.0.0.1:3000/api/nodes')
    .then(({ data }) => {
      data.forEach(element => {
        new Node(element)
        nodesBuffer.push(element)
      })
    })
    .catch(error => {
      errorDialog(error.response)
    })
})
