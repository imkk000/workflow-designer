import * as $ from 'jquery'
import { drag, event, select } from 'd3'
import { generateId } from '../../utility/generateId'
import { getWorkspace as workspace } from '../../utility/getCanvas'

// global variable : shared memory
let drawMode = false

export default class {
  constructor(options) {
    this.id = generateId()
    this.render(options)
  }

  render = ({ x = 0, y = 0, text = 'null' }) => {
    const nodeGroup = workspace()
      .data([
        {
          x,
          y
        }
      ])
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
    nodeGroup
      .call(drag().on('drag', this.handleNodeGroupDragging))
      .on('click', this.handleNodeGroupClick)

    $.contextMenu({
      selector: `.node#${this.id}`,
      callback: this.handleContextMenuCallback,
      items: {
        addLine: {
          name: 'Add Line',
          icon: 'fa-plus'
        }
      }
    })
  }

  handleNodeGroupDragging = (data, index, nodes) => {
    data.x += event.dx
    data.y += event.dy
    const node = nodes[index]
    const nodeSelected = select(node)
    nodeSelected.attr('transform', `translate(${data.x}, ${data.y})`)
  }

  handleNodeGroupClick = (data, index, nodes) => {
    console.log(data, index, nodes)
  }

  handleContextMenuCallback = (key, options) => {
    switch (key) {
      case 'addLine':
        this.handleOnAddLine(options)
        break
    }
    console.log(key)
  }

  handleOnAddLine = ({ $trigger: target }) => {
    drawMode = !drawMode
    console.log(drawMode)
    console.log(target.html())
  }
}
