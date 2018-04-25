import { getDataFromGlobal } from '../utility/editorMode'
import attachDragAndDrop from '../mode/attachDragAndDrop'

const addNodePreviews = (keyword = '') => {
  const svg = d3.select('#diagram-drawing')
  const nodesProperties = getDataFromGlobal('NODES_PROPERTIES')

  const nodeList = d3.select('#node-list')
  nodeList.selectAll('*').remove()

  nodeList.append('h2').text('Input')
  nodeList.append('div').attr('id', 'input-list')

  nodeList.append('h2').text('Function')
  nodeList.append('div').attr('id', 'function-list')

  Object.values(nodesProperties).map(element => {
    const { type, fill, stroke, label, limitInput } = element

    let listId = '#function-list'
    if (limitInput === 0) listId = '#input-list'

    const filterResult = label.toLowerCase().indexOf(keyword.toLowerCase())

    if (filterResult >= 0) {
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
        .style('color', 'black')
        .text(label)

      // add event for div
      attachDragAndDrop(svg, node)
    }

    return true
  })
}

window.addEventListener('load', () => {
  const nodeListId = document.getElementById('node-list')
  if (!nodeListId) return

  addNodePreviews()
})

export default addNodePreviews
