import { getWorkspace } from '../../utility/getCanvas'

export default () => {
  const workspace = getWorkspace()
  workspace
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 0)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0, -5L10, 0L0, 5')
}
