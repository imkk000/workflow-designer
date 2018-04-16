import { getDataFromGlobal } from '../utility/editorMode'
import attachDragAndDrop from '../utility/attachDragAndDrop'

window.addEventListener('load', () => {
  const nodePreview = d3.select('#node-preview')
  const svg = d3.select('#diagram-drawing')
  const nodesProperties = getDataFromGlobal('NODES_PROPERTIES')

  Object.values(nodesProperties).map(element => {
    const { type, fill, stroke, label } = element
    const node = nodePreview
      .append('div')
      .attr('id', type)
      .attr('class', 'node-preview-item p-3 pl-5 pr-5')
      .attr('draggable', 'true')
      .style('background-color', fill)
      .style('border-color', stroke)

    node
      .append('div')
      .style('color', stroke)
      .text(label)

    // add event for div
    attachDragAndDrop(svg, node)

    return true
  })
})
