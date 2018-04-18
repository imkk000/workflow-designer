import { getDrawArea } from '../utility/getArea'
import EDITOR_MODE, {
  setEditorMode,
  getDataFromGlobal,
  getPassData,
  getPassDataBeforeClear,
  isAddLineMode,
} from '../utility/editorMode'
import generateId from '../utility/generateId'
import diagonal from '../editor/diagonal'
import { destroyNodeDrawAreaContextMenu } from '../contextmenu/nodeDrawAreaContextMenu'
import nodeValidate from '../utility/nodeValidator'
import updateNodeLabel from '../editor/updateNodeLabel'

// other modules can cancel ADD_LINE mode
export const quitAddLineMode = () => {
  if (isAddLineMode()) {
    // get and remove global data in pass data
    const { node: beginNode, defaultStroke } = getPassDataBeforeClear()

    // reset stroke
    beginNode.select('.node-box').attr('stroke', defaultStroke)

    // reset context menu
    $('g.node').contextMenu(true)
    destroyNodeDrawAreaContextMenu()

    // reset all node after quit add line mode
    d3.selectAll('g.node').style('cursor', 'move')

    // reset mode to NORMAL
    setEditorMode(EDITOR_MODE.NORMAL)
  }
}

function addLineMode() {
  const drawArea = getDrawArea()
  const nodes = getDataFromGlobal('NODES')

  // prepare data for validate
  const { beginId, node: beginNode } = getPassData()
  const endNode = d3.select(this)
  const endId = endNode.attr('id')

  // validate node with beginId, endId !!!
  if (nodeValidate({ beginId, endId })) return

  // prepare data for add line
  const link = diagonal({ beginId, beginNode })
  const lineId = generateId()
  const { [beginId]: source } = nodes
  const { [endId]: target } = nodes

  // add this line to begin and end node.lines
  source.lines.push(lineId)
  target.lines.push(lineId)

  // add line to global LINES
  const lines = getDataFromGlobal('LINES')
  lines[lineId] = { beginId, endId }

  // render line group to draw-area-group
  const lineGroup = drawArea
    .insert('g', ':first-child')
    .attr('class', 'line')
    .attr('id', lineId)
    .data([{ source, target }])

  // render path
  lineGroup
    .append('path')
    .attr('class', 'line-background-path')
    .attr('d', link)

  lineGroup
    .append('path')
    .attr('class', 'line-path')
    .attr('id', `line-path-${lineId}`)
    .attr('d', link)

  // render arrow by text
  lineGroup
    .append('text')
    .attr('class', 'line-text')
    .append('textPath')
    .attr('href', `#line-path-${lineId}`)
    .attr('dominant-baseline', 'middle')
    .attr('startOffset', '50%')
    .text('►')

  // add edge to graph data
  const graph = getDataFromGlobal('GRAPH')
  graph.addEdge(beginId, endId)

  // upload node label
  updateNodeLabel(endId)

  // exit ADD_LINE mode
  quitAddLineMode()
}

export default addLineMode
