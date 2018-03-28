import * as event from './event'
import { drag } from 'd3'
import generateId from '../../utility/generateId'
import { getWorkspace } from '../../utility/getCanvas'

export default (workspace = getWorkspace()) =>
  class {
    constructor(options) {
      this.id = generateId()
      this.render(options)
    }

    render = ({ x = 0, y = 0, text = 'null' }) => {
      const nodeGroup = workspace
        .data([{ x, y }])
        .append('g')
        .attr('class', 'node')
        .attr('id', this.id)
        .attr('transform', (data) => `translate(${data.x}, ${data.y})`)

      const nodeLabel = nodeGroup
        .append('text')
        .attr('class', 'node-label')
        .attr('dx', '.4em')
        .attr('dy', '1.2em')
        .attr('text-anchor', 'start')
        .text(text.toUpperCase())

      const textBBox = nodeLabel.node().getBBox()
      const { width: textWidth, height: textHeight } = textBBox
      const [rectWidthOffset, rectHeightOffset] = [10, 10]

      const nodeBox = nodeGroup
        .insert('rect', ':first-child')
        .attr('class', 'node-box')
        .attr('width', textWidth + rectWidthOffset)
        .attr('height', textHeight + rectHeightOffset)

      this.loadEvent({
        nodeGroup,
        nodeLabel,
        nodeBox
      })
    }

    loadEvent = ({ nodeGroup }) => {
      nodeGroup.call(drag().on('drag', event.handleNodeGroupDragging))
    }
  }
