import { getDrawArea } from '../utility/getArea'
import { getDataFromGlobal } from '../utility/editorMode'
import diagonal from '../editor/diagonal'
import updateNodeLabel from '../editor/updateNodeLabel'

export default class {
  constructor(options) {
    this.render(options)
  }

  render = ({ lineId, beginId, endId }) => {
    const drawArea = getDrawArea()
    const { [beginId]: source } = nodes
    const { [endId]: target } = nodes
    const link = diagonal({ source, target })
    const nodes = getDataFromGlobal('NODES')

    // render line group to draw-area-group
    const lineGroup = drawArea
      .insert('g', ':first-child')
      .attr('class', 'line')
      .attr('id', lineId)
      .data([{ source, target }])

    // render path
    lineGroup
      .append('path')
      .attr('class', 'line-background-path')
      .attr('d', link)

    lineGroup
      .append('path')
      .attr('class', 'line-path')
      .attr('id', `line-path-${lineId}`)
      .attr('d', link)

    // render arrow by text
    lineGroup
      .append('text')
      .attr('class', 'line-text')
      .append('textPath')
      .attr('href', `#line-path-${lineId}`)
      .attr('dominant-baseline', 'middle')
      .attr('startOffset', '50%')
      .text('►')

    // add edge to graph data
    const graph = getDataFromGlobal('GRAPH')
    graph.addEdge(beginId, endId)

    // upload node label
    updateNodeLabel(endId)
  }
}
