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

  render = ({ id = generateId(), x, y, label, fill, stroke }) => {
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
    nodeGroup.call(d3.drag().on('drag', this.handleNodeGroupDragging))
    $.contextMenu({
      selector: 'g.node',
      trigger: 'left',
      callback: (key, options) => {
        console.log(key, options)
      },
      items: {
        ADD_LINE: {
          name: 'Add Line',
          icon: 'fa-plus-circle',
        },
        SETTING: {
          name: 'Setting',
          icon: 'fa-edit',
        },
        SEP: '---------',
        CLOSE: {
          name: 'Close',
          icon: 'fa-close',
        },
      },
    })
  }

  handleNodeGroupDragging(data) {
    // TODO: Calculate coordinate
    data.x += d3.event.dx
    data.y += d3.event.dy

    d3.select(this).attr('transform', `translate(${data.x}, ${data.y})`)
  }
}
