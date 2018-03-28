import { linkHorizontal } from 'd3'
import { getTempspace } from '../../utility/getCanvas'

export default (temp = getTempspace()) =>
  class {
    constructor(options) {
      this.render(options)
    }

    render(options) {
      const optionsArray = [options]
      temp
        .selectAll('.line')
        .data(optionsArray)
        .enter()
        .append('line')
        .attr('class', 'line')
        .attr('x1', ({ source: [x1] }) => x1)
        .attr('y1', ({ source: [, y1] }) => y1)
        .attr('x2', ({ target: [x2] }) => x2)
        .attr('y2', ({ target: [, y2] }) => y2)
        .attr('marker-end', 'url(#arrow)')
    }
  }
