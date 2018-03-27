import * as event from './event'
import * as d3 from 'd3'
import generateId from '../../utility/generateId'

export default ([temp, workspace]) =>
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
        .attr('dx', '.7em')
        .attr('dy', '1.5em')
        .attr('text-anchor', 'start')
        .text(text.toUpperCase())

      const textBBox = nodeLabel.node().getBBox()
      const { width: textWidth, height: textHeight } = textBBox
      const [rectWidthOffset, rectHeightOffset] = [20, 20]

      const nodeBox = nodeGroup
        .insert('rect', ':first-child')
        .attr('class', 'node-box node-box-blurred')
        .attr('width', textWidth + rectWidthOffset)
        .attr('height', textHeight + rectHeightOffset)

      this.loadEvent({ nodeGroup, nodeLabel, nodeBox })
    }

    loadEvent = ({ nodeGroup }) => {
      nodeGroup
        .call(d3.drag().on('drag', event.handleNodeGroupDragging))
        .on('focus', event.handleNodeGroupFocus)
        .on('blur', event.handleNodeGroupBlur)
    }
  }
