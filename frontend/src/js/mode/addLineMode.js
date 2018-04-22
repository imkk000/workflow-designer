import EDITOR_MODE, {
  setEditorMode,
  getDataFromGlobal,
  getPassData,
  getPassDataBeforeClear,
  isAddLineMode,
} from '../utility/editorMode'
import Line from '../editor/line'
import generateId from '../utility/generateId'
import { destroyNodeDrawAreaContextMenu } from '../contextmenu/nodeDrawAreaContextMenu'
import nodeValidate from '../utility/nodeValidator'

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
  const nodes = getDataFromGlobal('NODES')

  // prepare data for validate
  const { beginId } = getPassData()
  const endNode = d3.select(this)
  const endId = endNode.attr('id')

  // validate node with beginId, endId !!!
  if (nodeValidate({ beginId, endId })) return

  // prepare data for add line
  const lineId = generateId()
  const { [beginId]: source } = nodes
  const { [endId]: target } = nodes

  // add this line to begin and end node.lines
  source.lines.push(lineId)
  target.lines.push(lineId)

  new Line({
    lineId,
    beginId,
    endId,
  })

  // exit ADD_LINE mode
  quitAddLineMode()
}

export default addLineMode
