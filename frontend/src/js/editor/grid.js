import { getGridArea } from '../utility/getArea'

// NOTE: load grid line
// NOTE: reference - https://codepen.io/pigabo/pen/eAiLF?editors=1010
$(document).ready(() => {
  const defs = getGridArea().append('defs')
  const side = 35
  const grid = defs
    .append('pattern')
    .attr('id', 'grid')
    .attr('width', side)
    .attr('height', side)
    .attr('patternUnits', 'userSpaceOnUse')

  grid
    .append('path')
    .attr('d', `M ${side} 0 L 0 0 0 ${side}`)
    .attr('fill', 'none')
    .attr('stroke', 'lightgray')
    .attr('stroke-width', 1)

  getGridArea()
    .append('rect')
    .attr('id', 'grid-line-group')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'url(#grid)')
})
