import axios from 'axios'
import Node from './editor/node'

const load = () => {
  // TODO: create new svg, root area
  const svg = d3.select('svg.diagram-drawing')
  const root = svg.append('g').attr('class', 'root-area-group')

  // TODO: create new temp area, draw area in root area
  root.append('g').attr('class', 'temp-area-group')
  root.append('g').attr('class', 'draw-area-group')

  axios
    .get('//127.0.0.1:3000/api/nodes')
    .then(({ data }) => {
      data.forEach((element) => {
        new Node(element)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

document.addEventListener('contextmenu', (event) => event.preventDefault())
document.addEventListener('load', load())
