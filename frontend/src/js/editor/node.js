import generateId from '../utility/generateId'
import { getDrawArea } from '../utility/getArea'
import { isAddLineMode, getDataFromGlobal, isNormalMode } from '../utility/editorMode'
import updateLine from './updateLine'
import addLineMode from '../mode/addLineMode'

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

  render = ({ id = generateId(), x, y, limitInput, label, fill, stroke }) => {
    const drawArea = getDrawArea()
    const nodes = getDataFromGlobal('NODES')

    this.defaultFill = fill

    nodes[id] = {
      id,
      position: [x, y],
      lines: [],
      limitInput,
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
      .attr('dx', '.48em')
      .attr('dy', '1.4em')
      .attr('text-anchor', 'start')
      .attr('stroke', stroke)
      .text(label.toUpperCase())

    const textBBox = nodeLabel.node().getBBox()
    const { width: textWidth, height: textHeight } = textBBox
    const [rectWidthOffset, rectHeightOffset] = [15, 15]

    const nodeBox = nodeGroup
      .insert('rect', ':first-child')
      .attr('class', 'node-box')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('width', textWidth + rectWidthOffset)
      .attr('height', textHeight + rectHeightOffset)
      .attr('fill', fill)
      .attr('stroke', stroke)

    const nodeBG = nodeGroup
      .insert('rect', ':first-child')
      .attr('class', 'node-bg')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('width', textWidth + rectWidthOffset)
      .attr('height', textHeight + rectHeightOffset)
      .attr('fill', 'white')

    // NOTE: add node to graph data
    const graph = getDataFromGlobal('GRAPH')
    graph.addNode(id)

    this.loadEvent({
      nodeGroup,
      nodeLabel,
      nodeBox,
      nodeBG,
    })
  }

  loadEvent = ({ nodeGroup }) => {
    nodeGroup.on('click', this.handleNodeGroupClick).call(d3.drag().on('drag', this.handleNodeGroupDragging))
  }

  handleNodeGroupDragging(data) {
    // NOTE: on drag active on NORMAL mode
    if (isNormalMode()) {
      // NOTE: Calculate coordinate
      data.x += d3.event.dx
      data.y += d3.event.dy

      // DEBUG: only
      const node = d3.select(this)

      // NOTE: set transform from [x, y]
      node.attr('transform', `translate(${data.x}, ${data.y})`)

      // NOTE: update line
      updateLine({ node, data })
    }
  }

  handleNodeGroupClick() {
    if (isAddLineMode()) {
      addLineMode.bind(this)()
    }
  }
}
