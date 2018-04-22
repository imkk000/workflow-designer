import Node from '../editor/node'
import { getDataFromGlobal, notNormalMode } from '../utility/editorMode'
import saveMode from './saveMode'

const allowDrop = event => {
  event.preventDefault()
}

const drop = event => {
  if (notNormalMode()) {
    event.preventDefault()
    return
  }

  const nodesProperties = getDataFromGlobal('NODES_PROPERTIES')
  const data = event.dataTransfer.getData('text')
  const nodeBuffer = nodesProperties[data]
  const nodeData = {
    ...nodeBuffer,
    x: event.offsetX,
    y: event.offsetY,
  }

  // create new Node
  new Node(nodeData)

  // auto save on NORMAL mode
  saveMode()
}

const drag = event => {
  if (notNormalMode()) {
    event.preventDefault()
    return
  }

  event.dataTransfer.setData('text', event.target.id)
}

export default (svg, node) => {
  const svgDom = svg.node()
  const nodeDom = node.node()

  nodeDom.addEventListener('dragstart', drag)
  svgDom.addEventListener('drop', drop)
  svgDom.addEventListener('dragover', allowDrop)
}
