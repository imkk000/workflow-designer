import { getDataFromGlobal } from '../utility/editorMode'
import diagonal from './diagonal'

export default ({ node, data }) => {
  // NOTE: get (nodes, lines) data from global
  const nodes = getDataFromGlobal('NODES')
  const lines = getDataFromGlobal('LINES')

  // NOTE: get node id (this node from event)
  const nodeId = node.attr('id')
  const {
    [nodeId]: { lines: linesData },
  } = nodes

  const nodeData = nodes[nodeId]
  nodeData.position = [data.x, data.y]

  // NOTE: update line when node moving
  linesData.map(lineId => {
    const {
      [lineId]: { beginId, endId },
    } = lines
    const beginNode = d3.select($(`#${beginId}`).get(0))
    const line = d3.select($(`#${lineId} path`).get(0))
    const source = nodeId === beginId ? nodeData : nodes[beginId]
    const target = nodeId === endId ? nodeData : nodes[endId]
    const link = diagonal({ beginId, beginNode })

    line
      .data([
        {
          source,
          target,
        },
      ])
      .attr('d', link)

    return true
  })
}
