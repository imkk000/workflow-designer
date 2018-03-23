import * as d3 from 'd3';

const g = d3
  .select('body')
  .append('svg')
  .append('g');

const d = {
  name: 'Load Image',
  children: [
    {
      name: 'Rotate'
    },
    {
      name: 'Blur'
    }
  ]
};

// make hier
var hierarchies = d3.hierarchy(d);

// set tree size
const tree = d3.tree().size([1000, 500]);

// set links for update
const links = d3
  .linkVertical()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  });

// tree always need to root
var root = tree(hierarchies);

// create all line in tree
var link = g
  .selectAll('.link')
  .data(root.links())
  .enter()
  .append('path')
  .attr('class', 'link')
  .style('fill', 'none')
  .style('stroke', 'orange')
  .style('stroke-width', 2)
  .attr('d', links);

// make node and bind event drag
var node = g
  .selectAll('.node')
  .data(root.descendants())
  .enter()
  .append('g')
  .attr('class', 'node')
  .attr('transform', d => `translate(${d.x}, ${d.y})`)
  .append('circle')
  .attr('r', 10)
  .call(d3.drag().on('drag', dragged))
  .on('dblclick', dblclicked);

function dragged(d) {
  d.x += d3.event.dx;
  d.y += d3.event.dy;

  // move node
  d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`);

  // update all line
  link.attr('d', links);
}

function dblclicked() {
  const child = d.children;
  child.push({
    name: 'Empty'
  });

  hierarchies = d3.hierarchy(d);
  root = tree(hierarchies);
  link = g
    .selectAll('.link')
    .data(root.links())
    .enter()
    .append('path')
    .attr('class', 'link')
    .style('fill', 'none')
    .style('stroke', 'orange')
    .style('stroke-width', 2)
    .attr('d', links);

  node = g
    .selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)
    .append('circle')
    .attr('r', 10)
    .call(d3.drag().on('drag', dragged))
    .on('dblclick', dblclicked);
}
