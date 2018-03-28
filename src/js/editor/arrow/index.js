import { getWorkspace } from '../../utility/getCanvas'

export default class {
  constructor() {
    this.render()
  }

  render = () => {
    const workspace = getWorkspace()
    const marker = workspace
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')

    marker.append('path').attr('d', 'M0, -5L10, 0L0, 5')
  }
}
