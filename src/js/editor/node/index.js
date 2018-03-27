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
        .attr('dx', '1em')
        .attr('dy', '1.2em')
        .attr('text-anchor', 'start')
        .text(text.toUpperCase())

      const textBBox = nodeLabel.node().getBBox()
      const { width: textWidth, height: textHeight } = textBBox
      const [rectWidthOffset, rectHeightOffset] = [30, 10]

      const nodeBox = nodeGroup
        .insert('rect', ':first-child')
        .attr('class', 'node-box')
        .attr('width', textWidth + rectWidthOffset)
        .attr('height', textHeight + rectHeightOffset)

      const nodeBoxBBox = nodeBox.node().getBBox()
      const { width: nodeBoxWidth, height: nodeBoxHeight } = nodeBoxBBox

      const nodeInputPort = nodeGroup
        .append('rect')
        .attr('class', 'node-input-port node-port')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 12)
        .attr('height', nodeBoxHeight)

      const nodeOutputPort = nodeGroup
        .append('rect')
        .attr('class', 'node-input-port node-port')
        .attr('x', nodeBoxWidth - 12)
        .attr('y', 0)
        .attr('width', 12)
        .attr('height', nodeBoxHeight)

      this.loadEvent({
        nodeGroup,
        nodeLabel,
        nodeBox,
        nodeInputPort,
        nodeOutputPort
      })
    }

    loadEvent = ({ nodeGroup, nodeInputPort }) => {
      nodeGroup.call(d3.drag().on('drag', event.handleNodeGroupDragging))
      nodeInputPort
        .call(
          d3
            .drag()
            .on('start', event.handleNodePortStartDrag)
            .on('drag', event.handleNodePortDragging)
            .on('end', event.handleNodePortEndDrag)
        )
        .on('mouseover', event.handleNodePortMouseOver)
        .on('mouseout', event.handleNodePortMouseOut)
    }
  }
