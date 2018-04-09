import { getDrawArea } from '../utility/getArea'

export default () => {
  getDrawArea()
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('markerUnits', 'strokeWidth')
    .attr('refX', 0)
    .attr('refY', 0)
    .attr('viewBox', '0 -5 10 10')
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')

    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .style('fill', 'purple')
}
