import { event, select } from 'd3'
import Line from '../line'

export const handleNodeGroupDragging = (data, index, nodes) => {
  data.x += event.dx
  data.y += event.dy
  const node = nodes[index]
  const nodeSelected = select(node)
  nodeSelected.attr('transform', `translate(${data.x}, ${data.y})`)
}

export const handleNodeGroupClick = (data, index, nodes) => {
  console.log(data, index, nodes)
}
