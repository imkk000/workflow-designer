import EDITOR_MODE, { setEditorMode, getDataFromGlobal, getPassDataBeforeClear } from '../utility/editorMode'
import updateNodeLabel from '../editor/updateNodeLabel'

export default () => {
  // NOTE: get all data for delete node
  const { nodeId, node } = getPassDataBeforeClear()
  const nodes = getDataFromGlobal('NODES')
  const lines = getDataFromGlobal('LINES')
  const graph = getDataFromGlobal('GRAPH')
  const { lines: nodeLines } = nodes[nodeId]

  // NOTE: remove all lines from nodes, lines, grap data
  nodeLines.map(lineId => {
    const { beginId, endId } = lines[lineId]
    const beginNode = nodes[beginId]
    const endNode = nodes[endId]
    // NOTE: lazy code
    beginNode.lines = beginNode.lines.filter(xline => xline !== lineId)
    endNode.lines = endNode.lines.filter(xline => xline !== lineId)

    // NOTE: remove edge from graph data
    graph.removeEdge(beginId, endId)

    // NOTE: delete target line
    d3.select(document.getElementById(lineId)).remove()

    // NOTE: upload node label
    updateNodeLabel(endId)

    return delete lines[lineId]
  })

  // NOTE: confirm delete node
  delete nodes[nodeId]

  // NOTE: remove node from graph data
  graph.removeNode(nodeId)

  // NOTE: delete target node
  node.remove()

  // NOTE: reset mode to NORMAL
  setEditorMode(EDITOR_MODE.NORMAL)
}
