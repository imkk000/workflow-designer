import generateId from '../utility/generateId'
import { getDrawArea } from '../utility/getArea'
import { isAddLineMode, getDataFromGlobal, isNormalMode } from '../utility/editorMode'
import updateLine from './updateLine'
import addLineMode from '../mode/addLineMode'
import updateNodeLabel from './updateNodeLabel'

export default class {
  constructor(options) {
    this.render(options)
  }

  render = ({ id = generateId(), x, y, limitInput, files, settings, type, label, fill, stroke }) => {
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
      settings,
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

    // add node to graph data
    const graph = getDataFromGlobal('GRAPH')
    graph.addNode(id)

    // upload node label
    updateNodeLabel(id)

    this.loadEvent({
      nodeGroup,
      nodeLabel,
      nodeBox,
      nodeBG,
    })
  }

  loadEvent = ({ nodeGroup }) => {
    nodeGroup
      .on('mouseover', this.handleNodeGroupMouseOver)
      .on('click', this.handleNodeGroupClick)
      .call(d3.drag().on('drag', this.handleNodeGroupDragging))
  }

  handleNodeGroupDragging(data) {
    // on drag active on NORMAL mode
    if (isNormalMode()) {
      // Calculate coordinate
      data.x += d3.event.dx
      data.y += d3.event.dy

      const node = d3.select(this)

      // set transform from [x, y]
      node.attr('transform', `translate(${data.x}, ${data.y})`)

      // update line
      updateLine({ node, data })
    }
  }

  handleNodeGroupMouseOver() {
    this.parentNode.appendChild(this)
  }

  handleNodeGroupClick() {
    if (isAddLineMode()) {
      addLineMode.bind(this)()
    }
  }
}
