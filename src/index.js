import Node from './editor/node';
document.addEventListener('contextmenu', event => event.preventDefault());

$(function () {
  const svg = d3.select('body').append('svg');
  const g = svg.append('g').attr('class', 'root');
  const workspace = g.append('g');

  new Node(g, workspace).setNode(50, 50, 'Load Image');
  new Node(g, workspace).setNode(200, 200, 'Rotate');
});
