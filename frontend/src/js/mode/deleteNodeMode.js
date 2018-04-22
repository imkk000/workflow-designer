import EDITOR_MODE, { setEditorMode, getDataFromGlobal, getPassDataBeforeClear } from '../utility/editorMode'
import updateNodeLabel from '../editor/updateNodeLabel'

export default () => {
  // get all data for delete node
  const { nodeId, node } = getPassDataBeforeClear()
  const nodes = getDataFromGlobal('NODES')
  const lines = getDataFromGlobal('LINES')
  const graph = getDataFromGlobal('GRAPH')
  const { lines: nodeLines } = nodes[nodeId]

  // remove all lines from nodes, lines, grap data
  nodeLines.map(lineId => {
    const { beginId, endId } = lines[lineId]
    const beginNode = nodes[beginId]
    const endNode = nodes[endId]
    // lazy code
    beginNode.lines = beginNode.lines.filter(xline => xline !== lineId)
    endNode.lines = endNode.lines.filter(xline => xline !== lineId)

    // remove edge from graph data
    graph.removeEdge(beginId, endId)

    // delete target line
    d3.select(document.getElementById(lineId)).remove()

    // upload node label
    updateNodeLabel(endId)

    return delete lines[lineId]
  })

  // confirm delete node
  delete nodes[nodeId]

  // remove node from graph data
  graph.removeNode(nodeId)

  // delete target node
  node.remove()

  // reset mode to NORMAL
  setEditorMode(EDITOR_MODE.NORMAL)
}
