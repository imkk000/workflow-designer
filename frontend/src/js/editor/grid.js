import { getRootArea } from '../utility/getArea'

// NOTE: load grid line
// NOTE: reference - https://codepen.io/pigabo/pen/eAiLF?editors=1010
$(document).ready(() => {
  const gridLineGroup = getRootArea().insert('g', ':first-child')
  const defs = gridLineGroup.append('defs')
  defs
    .append('pattern')
    .attr('id', 'smallGrid')
    .attr('width', 10)
    .attr('height', 10)
    .attr('patternUnits', 'userSpaceOnUse')
    .append('path')
    .attr('d', 'M 10 0 L 0 0 0 10')
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('stroke-width', 0.5)

  const grid = defs
    .append('pattern')
    .attr('id', 'grid')
    .attr('width', 100)
    .attr('height', 100)
    .attr('patternUnits', 'userSpaceOnUse')

  grid
    .append('rect')
    .attr('width', 100)
    .attr('height', 100)
    .attr('fill', 'url(#smallGrid)')

  grid
    .append('path')
    .attr('d', 'M 100 0 L 0 0 0 100')
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('stroke-width', 1)

  gridLineGroup
    .append('rect')
    .attr('id', 'grid-line-group')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'url(#grid)')
})
