import { event, select, linkHorizontal } from 'd3'
import Line from '../line'

export const handleNodeGroupDragging = (data, index, nodes) => {
  data.x += event.dx
  data.y += event.dy
  const node = nodes[index]
  const nodeSelected = select(node)
  nodeSelected.attr('transform', `translate(${data.x}, ${data.y})`)
}
