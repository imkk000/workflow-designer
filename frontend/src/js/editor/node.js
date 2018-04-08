import generateId from '../utility/generateId'
import { getDrawArea } from '../utility/getArea'

/**
 * TODO: Node life cycle
 * pass options
 * beforeRender
 * render
 * loadEvent
 */

export default class {
  constructor(options) {
    this.render({
      ...options,
    })
  }

  render = ({ id = generateId(), x, y, text, fill }) => {
    const drawArea = getDrawArea()

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
      .attr('fill', 'white')
      .text(text.toUpperCase())

    const textBBox = nodeLabel.node().getBBox()
    const { width: textWidth, height: textHeight } = textBBox
    const [rectWidthOffset, rectHeightOffset] = [10, 10]

    const nodeBox = nodeGroup
      .insert('rect', ':first-child')
      .attr('class', 'node-box')
      .attr('width', textWidth + rectWidthOffset)
      .attr('height', textHeight + rectHeightOffset)
      .attr('fill', fill)

    this.loadEvent({ nodeGroup, nodeLabel, nodeBox })
  }

  loadEvent = ({ nodeGroup }) => {
    nodeGroup.on('click', this.handleNodeGroupClick)
  }

  handleNodeGroupClick = () => {}
}
