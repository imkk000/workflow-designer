import Node from './editor/node'
import Arrow from './editor/arrow/'
import { select } from 'd3'

const load = () => {
  const svg = select('body').append('svg')
  const root = svg.append('g').attr('class', 'root')
  const temp = root.append('g').attr('class', 'temp')
  const workspace = root.append('g').attr('class', 'workspace')
  const arrow = new Arrow()

  const node1 = new Node({ x: 100, y: 100, text: 'Load Image' })
  const node2 = new Node({ x: 200, y: 200, text: 'Rotate' })
  const idNodes = [node1.id, node2.id]
  console.log('from app.js:', idNodes)
}

document.addEventListener('contextmenu', (event) => event.preventDefault())
document.addEventListener('load', load())
