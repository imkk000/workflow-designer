export default ({ beginId, beginNode }) => {
  // NOTE: computed path
  const { width: widthBeginNode, height: heightBeginNode } = beginNode.node().getBBox()
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
