import { getDataFromGlobal } from '../utility/editorMode'
import attachDragAndDrop from '../utility/attachDragAndDrop'

window.addEventListener('load', () => {
  const svg = d3.select('#diagram-drawing')
  const nodesProperties = getDataFromGlobal('NODES_PROPERTIES')

  Object.values(nodesProperties).map(element => {
    const { type, fill, stroke, label, limitInput } = element

    let listId = '#function-list'
    if (limitInput === 0) listId = '#input-list'

    const node = d3
      .select(listId)
      .append('div')
      .attr('id', type)
      .attr('class', 'node-item')
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
