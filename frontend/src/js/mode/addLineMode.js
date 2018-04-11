import { getDrawArea } from '../utility/getArea'
import EDITOR_MODE, {
  setEditorMode,
  setDataInGlobal,
  getDataFromGlobal,
  getPassDataBeforeClear,
} from '../utility/editorMode'
import generateId from '../utility/generateId'
import diagonal from '../editor/diagonal'

export default function() {
  const drawArea = getDrawArea()
  const nodes = getDataFromGlobal('NODES')

  // TODO: validate node !!!

  // NOTE: prepare data for add line
  const { beginId, node: beginNode, defaultStroke } = getPassDataBeforeClear()
  const endNode = d3.select(this)
  const endId = endNode.attr('id')
  const link = diagonal({ beginId, beginNode })
  const lineId = generateId()
  const { [beginId]: source } = nodes
  const { [endId]: target } = nodes

  // NOTE: add this line to begin and end node.lines
  source.lines.push(lineId)
  target.lines.push(lineId)

  // NOTE: add line to global LINES
  setDataInGlobal('LINES', lineId, {
    beginId,
    endId,
  })

  // NOTE: render line group to draw-area-group
  const lineGroup = drawArea
    .insert('g', ':first-child')
    // .append('g')
    .attr('class', 'line')
    .attr('id', lineId)
    .data([{ source, target }])

  // NOTE: render path
  lineGroup
    .append('path')
    .attr('class', 'line-path')
    .attr('id', `line-path-${lineId}`)
    .attr('d', link)

  // NOTE: render arrow by text
  lineGroup
    .append('text')
    .attr('class', 'line-text')
    .append('textPath')
    .attr('href', `#line-path-${lineId}`)
    .attr('dominant-baseline', 'middle')
    .attr('startOffset', '50%')
    .text('►')

  // NOTE: reset stroke and context menu
  beginNode.select('.node-box').attr('stroke', defaultStroke)
  $('g.node').contextMenu(true)

  // NOTE: reset mode to NORMAL
  setEditorMode(EDITOR_MODE.NORMAL)
}
