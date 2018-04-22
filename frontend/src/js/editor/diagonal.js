import { path as pathLink } from 'd3'
import { getDataFromGlobal } from '../utility/editorMode'

export default ({ source: beginNode }) => {
  // computed path
  const { id: beginId } = beginNode
  const beginNodeObject = d3.select(document.getElementById(beginId))
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
