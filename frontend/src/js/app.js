import Node from './editor/node'

const load = () => {
  // TODO: create new svg, root area
  const svg = d3.select('svg.diagram-drawing')
  const root = svg.append('g').attr('class', 'root-area-group')

  // TODO: create new temp area, draw area in root area
  root.append('g').attr('class', 'temp-area-group')
  root.append('g').attr('class', 'draw-area-group')

  new Node({ x: 100, y: 100, text: 'Load Image', fill: 'red' })
  new Node({ x: 200, y: 200, text: 'Rotate', fill: 'green' })
}

document.addEventListener('contextmenu', (event) => event.preventDefault())
document.addEventListener('load', load())
