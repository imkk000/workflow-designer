import generateId from '../utility/generateId'
import { getDrawArea } from '../utility/getArea'
import { isAddLineMode, getDataFromGlobal, isNormalMode } from '../utility/editorMode'
import updateLine from './updateLine'
import addLineMode from '../mode/addLineMode'
import updateNodeLabel from './updateNodeLabel'
import { getSettings } from '../mode/settingNodeMode'

export default class {
  constructor(options) {
    this.render(options)
  }

  render = ({ id = generateId(), x, y, limitInput, files, type, label, fill, stroke }) => {
    const drawArea = getDrawArea()
    const nodes = getDataFromGlobal('NODES')

    this.defaultFill = fill

    nodes[id] = {
      id,
      position: [x, y],
      lines: [],
      limitInput,
      type,
      label,
      settings: getSettings(type),
      files,
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
      .attr('dy', '1.5em')
      .attr('text-anchor', 'start')
      .attr('stroke', stroke)

    const nodeBox = nodeGroup
      .insert('rect', ':first-child')
      .attr('class', 'node-box')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', fill)
      .attr('stroke', stroke)

    const nodeBG = nodeGroup
      .insert('rect', ':first-child')
      .attr('class', 'node-bg')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', 'white')

    // NOTE: add node to graph data
    const graph = getDataFromGlobal('GRAPH')
    graph.addNode(id)

    // NOTE: upload node label
    updateNodeLabel(id)

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
