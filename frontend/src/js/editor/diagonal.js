export default ({ source: beginNode }) => {
  const { id: beginId } = beginNode
  const nodeBeginId = document.getElementById(beginId)
  if (!nodeBeginId) return false

  // computed path
  const beginNodeObject = d3.select(nodeBeginId)
  const { width: widthBeginNode, height: heightBeginNode } = beginNodeObject.node().getBBox()
  const halfHeightBeginNode = heightBeginNode / 2
  const source = window.NODES[beginId]

  return d3
    .linkHorizontal()
    .x(({ id, position }) => {
      if (id === source.id) return position[0] + widthBeginNode
      return position[0]
    })
    .y(({ position }) => position[1] + halfHeightBeginNode)
}
