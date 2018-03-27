import * as d3 from 'd3'

export const handleNodeGroupDragging = (data, index, nodes) => {
  data.x += d3.event.dx
  data.y += d3.event.dy
  const node = nodes[index]
  const nodeSelected = d3.select(node)
  nodeSelected.attr('transform', `translate(${data.x}, ${data.y})`)
}

export const handleNodePortStartDrag = (data, index, nodes) => {

}

export const handleNodePortDragging = (data, index, nodes) => {

}

export const handleNodePortEndDrag = (data, index, nodes) => {

}

export const handleNodePortMouseOver = (data, index, nodes) => {
  const node = nodes[index]
  const nodeSelected = d3.select(node.parentNode)
  const nodePortSelected = nodeSelected.select('.node-port')
  nodePortSelected.classed('node-port-hover', true)
}

export const handleNodePortMouseOut = (data, index, nodes) => {
  const node = nodes[index]
  const nodeSelected = d3.select(node.parentNode)
  const nodePortSelected = nodeSelected.select('.node-port')
  nodePortSelected.classed('node-port-hover', false)
}
