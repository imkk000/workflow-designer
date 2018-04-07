const load = () => {
  // TODO: create new svg, root area
  const svg = d3.select('svg.diagram-drawing')
  const root = svg.append('g').attr('class', 'root-area-group')

  // TODO: create new temp area, draw area in root area
  root.append('g').attr('class', 'temp-area-group')
  root.append('g').attr('class', 'draw-area-group')
}

document.addEventListener('contextmenu', (event) => event.preventDefault())
document.addEventListener('load', load())
