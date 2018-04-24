import { getDataFromGlobal } from '../utility/editorMode'

export default nodeId => {
  const nodes = getDataFromGlobal('NODES')
  const graph = getDataFromGlobal('GRAPH')
  const node = d3.select(document.getElementById(nodeId))
  const nodeInDegree = graph.indegree(nodeId)
  const { label, limitInput } = nodes[nodeId]
  const nodeCountLabel = `${nodeInDegree}/`
  const newLabel = `(${nodeInDegree > 0 ? nodeCountLabel : ''}${limitInput}) ${label}`
  const nodeLabel = node.select('.node-label').text(newLabel)
  const textBBox = nodeLabel.node().getBBox()
  const { width: textWidth, height: textHeight } = textBBox
  const newWidth = Math.max(105, textWidth)
  const newHeight = Math.max(35, textHeight)
  node
    .select('.node-box')
    .attr('width', newWidth + 15)
    .attr('height', newHeight)
}
