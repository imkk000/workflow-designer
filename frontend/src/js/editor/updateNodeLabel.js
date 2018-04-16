import { getDataFromGlobal } from '../utility/editorMode'

export default nodeId => {
  const nodes = getDataFromGlobal('NODES')
  const graph = getDataFromGlobal('GRAPH')
  const node = d3.select($(`#${nodeId}`).get(0))
  const nodeInDegree = graph.indegree(nodeId)
  const { label, limitInput } = nodes[nodeId]
  const nodeCountLabel = `${nodeInDegree}/`
  const newLabel = `(${nodeInDegree > 0 ? nodeCountLabel : ''}${limitInput}) ${label}`
  const nodeLabel = node.select('.node-label').text(newLabel.toUpperCase())
  const textBBox = nodeLabel.node().getBBox()
  const { width: textWidth, height: textHeight } = textBBox
  const [rectWidthOffset, rectHeightOffset] = [15, 15]

  node
    .select('.node-box')
    .attr('width', textWidth + rectWidthOffset)
    .attr('height', textHeight + rectHeightOffset)
}
