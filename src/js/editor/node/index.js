import * as event from './event'
import * as $ from 'jquery'
import { drag } from 'd3'
import { generateId } from '../../utility/generateId'
import { getWorkspace as workspace } from '../../utility/getCanvas'

export default class {
  constructor(options) {
    this.id = generateId()
    this.render(options)
  }

  render = ({ x = 0, y = 0, text = 'null' }) => {
    const nodeGroup = workspace()
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
    nodeGroup
      .call(drag().on('drag', event.handleNodeGroupDragging))
      .on('click', event.handleNodeGroupClick)

    $.contextMenu({
      selector: '.node',
      callback: function(key, options) {
        var m = 'clicked: ' + key
        ;(window.console && console.log(m)) || alert(m)
      },
      items: {
        edit: { name: 'Edit', icon: 'edit' },
        cut: { name: 'Cut', icon: 'cut' },
        copy: { name: 'Copy', icon: 'copy' },
        paste: { name: 'Paste', icon: 'paste' },
        delete: { name: 'Delete', icon: 'delete' },
        sep1: '---------',
        quit: {
          name: 'Quit',
          icon: function() {
            return 'context-menu-icon context-menu-icon-quit'
          }
        }
      }
    })
  }
}
