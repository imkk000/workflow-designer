import generateId from '../utility/generateId'
import { getDrawArea } from '../utility/getArea'
import EDITOR_MODE, {
  isAddLineMode,
  setEditorMode,
  getPassDataBeforeClear,
} from '../utility/editorMode'
import diagonal from './diagonal'

/**
 * NOTE: Node life cycle
 * pass options
 * render
 * loadEvent
 */

export default class {
  constructor(options) {
    this.render(options)
  }

render = ({
  id = generateId(), x, y, label, fill, stroke,
}) => {
  const drawArea = getDrawArea()

  this.defautlFill = fill
  // DEBUG: only
  window.NODES[id] = {
    id,
    position: [x, y],
    lines: [],
  }

  const nodeGroup = drawArea
    .data([{ x, y }])
    .append('g')
    .attr('class', 'node')
    .attr('id', id)
    .attr('transform', data => `translate(${data.x}, ${data.y})`)

  const nodeLabel = nodeGroup
    .append('text')
    .attr('class', 'node-label')
    .attr('dx', '.4em')
    .attr('dy', '1.2em')
    .attr('text-anchor', 'start')
    .attr('fill', stroke)
    .text(label.toUpperCase())

  const textBBox = nodeLabel.node().getBBox()
  const { width: textWidth, height: textHeight } = textBBox
  const [rectWidthOffset, rectHeightOffset] = [10, 10]

  const nodeBox = nodeGroup
    .insert('rect', ':first-child')
    .attr('class', 'node-box')
    .attr('width', textWidth + rectWidthOffset)
    .attr('height', textHeight + rectHeightOffset)
    .attr('fill', fill)
    .attr('stroke', stroke)

  this.loadEvent({ nodeGroup, nodeLabel, nodeBox })
}

loadEvent = ({ nodeGroup }) => {
  nodeGroup
    .call(d3
      .drag()
      .on('drag', this.handleNodeGroupDragging))
    .on('click', this.handleNodeGroupClick)
}

handleNodeGroupDragging(data) {
// NOTE: Calculate coordinate
  data.x += d3.event.dx
  data.y += d3.event.dy

  // DEBUG: only
  const node = d3.select(this)
  const nodeId = node.attr('id')
  window.NODES[nodeId].position = [data.x, data.y]

  node.attr('transform', `translate(${data.x}, ${data.y})`)
}

handleNodeGroupClick() {
  if (isAddLineMode()) {
    // TODO: validate node !!!

    // NOTE: prepare data for add line
    const { beginId, node: beginNode, defaultStroke } = getPassDataBeforeClear()
    const endNode = d3.select(this)
    const endId = endNode.attr('id')

    // DEBUG: only
    const link = diagonal({ beginId, beginNode })
    const lineId = generateId()
    const source = window.NODES[beginId]
    const target = window.NODES[endId]

    // NOTE: add this line to begin and end node.lines
    source.lines.push(lineId)
    target.lines.push(lineId)

    // NOTE: add line to global LINES
    // addDataToGlobal()
    // NOTE: render line to draw-area-group
    getDrawArea()
      .insert('g', ':first-child')
      .attr('class', 'line')
      .attr('id', lineId)
      .data([{ source, target }])
      .append('path')
      .attr('d', link)

    // NOTE: reset stroke and context menu
    beginNode.select('.node-box').attr('stroke', defaultStroke)
    $('g.node').contextMenu(true)

    // NOTE: reset mode to NORMAL
    setEditorMode(EDITOR_MODE.NORMAL)

    // DEBUG: only
    console.log(source, target)
  }
}
}
