import generateId from '../utility/generateId'
import { getDrawArea, getTempArea } from '../utility/getArea'
import { isAddLineMode, getPassData } from '../utility/editorMode'

/**
 * TODO: Node life cycle
 * pass options
 * render
 * loadEvent
 */

export default class {
  constructor(options) {
    this.render(options)
  }

  render = ({ id = generateId(), x, y, label, fill, stroke }) => {
    const drawArea = getDrawArea()

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
      .attr('transform', (data) => `translate(${data.x}, ${data.y})`)

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
      .call(d3.drag().on('drag', this.handleNodeGroupDragging))
      .on('click', this.handleNodeGroupClick)
  }

  handleNodeGroupDragging(data) {
    // TODO: Calculate coordinate
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
      // TODO: calculate beginNode size
      const { beginId, node: beginNode } = getPassData()
      const {
        width: widthBeginNode,
        height: heightBeginNode,
      } = beginNode.node().getBBox()
      const halfHeightBeginNode = heightBeginNode / 2
      const endNode = d3.select(this)
      const endId = endNode.attr('id')

      // DEBUG: only
      const source = window.NODES[beginId]
      const target = window.NODES[endId]

      const link = d3
        .linkHorizontal()
        .x(({ id, position }) => {
          if (id === source.id) return position[0] + widthBeginNode
          return position[0]
        })
        .y(({ position }) => position[1] + halfHeightBeginNode)

      getTempArea()
        .data([{ source, target }])
        .append('path')
        .attr('class', 'line')
        .attr('d', link)
        .style('fill', 'none')
        .style('stroke-width', 3)
        .style('stroke', 'blue')
      // .attr('marker-end', 'url(#arrow)')
    }
  }
}
