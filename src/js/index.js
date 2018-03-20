import Node from './editor/node';

document.addEventListener('contextmenu', event => event.preventDefault());

$(function () {
  const svg = d3.select('body').append('svg');
  const g = svg.append('g').attr('class', 'root');
  const workspace = g.append('g');
  const NewNode = Node(workspace, g);
  new NewNode().setNode(50, 50, 'Load Image');
  new NewNode().setNode(200, 200, 'Rotate');
});
