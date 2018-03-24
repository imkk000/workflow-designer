import * as d3 from 'd3';
import Node from './editor/node';

// disable right click contextmenu
document.addEventListener('contextmenu', event => event.preventDefault());

$(function () {
  const svg = d3.select('body').append('svg');
  const g = svg.append('g').attr('class', 'root');
  const temp = g.append('g').attr('class', 'temp');
  const workspace = g.append('g').attr('class', 'workspace');

  const NewNode = Node(temp, workspace);

  const n1 = new NewNode(200, 200, 'Load Image');
  const n2 = new NewNode(50, 50, 'Rotate');
});
