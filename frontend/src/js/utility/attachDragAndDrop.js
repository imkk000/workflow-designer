import Node from '../editor/node'
import { getDataFromGlobal, isNormalMode } from '../utility/editorMode'

const allowDrop = event => {
  event.preventDefault()
}

const drop = event => {
  event.preventDefault()

  if (isNormalMode()) {
    const buffer = getDataFromGlobal('NODES_BUFFER')
    const data = event.dataTransfer.getData('text')
    const nodeBuffer = buffer[data]
    const nodeData = {
      ...nodeBuffer,
      x: event.offsetX,
      y: event.offsetY,
    }

    // NOTE: create new Node
    new Node(nodeData)
  }
}

const drag = event => {
  event.dataTransfer.setData('text', event.target.id)
}

export default (svg, node) => {
  const svgDom = svg.node()
  const nodeDom = node.node()

  nodeDom.addEventListener('dragstart', drag)
  svgDom.addEventListener('drop', drop)
  svgDom.addEventListener('dragover', allowDrop)
}
