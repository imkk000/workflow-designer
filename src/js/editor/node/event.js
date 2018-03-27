import * as d3 from 'd3'

export const handleNodeGroupDragging = (data, index, nodes) => {
  data.x += d3.event.dx
  data.y += d3.event.dy
  const node = nodes[index]
  const nodeSelected = d3.select(node)
  nodeSelected.attr('transform', `translate(${data.x}, ${data.y})`)
}

export const handleNodeGroupFocus = (data, index, nodes) => {
  const node = nodes[index]
  const nodeSelected = d3.select(node)
  nodeSelected
    .select('.node-box')
    .classed('node-box-focused', true)
    .classed('node-box-blurred', false)
}

export const handleNodeGroupBlur = (data, index, nodes) => {
  const node = nodes[index]
  const nodeSelected = d3.select(node)
  nodeSelected
    .select('.node-box')
    .classed('node-box-blurred', true)
    .classed('node-box-focused', false)
}
