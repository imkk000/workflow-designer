const Node = class {
  constructor(x, y, text) {
    this.nodedata = [{ x: x, y: y }];

    this.nodegroup = d3
      .select('.root')
      .append('g')
      .data(this.nodedata)
      .attr('class', 'nodegroup')
      .attr('transform', `translate(${x}, ${y})`);

    this.node = this.nodegroup
      .append('rect')
      .attr('class', 'node')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('fill', 'lightblue')
      .attr('width', 125)
      .attr('height', 40);

    this.line = this.nodegroup
      .append('path')
      .attr('class', 'node_line')
      .attr('d', 'M 30 1 l 0 38');

    this.text = this.nodegroup
      .append('text')
      .attr('class', 'node_label')
      .attr('x', 38)
      .attr('y', 19)
      .attr('dy', '.35em')
      .attr('text-anchor', 'start')
      .text(text);

    this.port_input = this.nodegroup
      .append('g')
      .attr('class', 'port_input')
      .attr('transform', 'translate(-7, 14)')
      .append('rect')
      .attr('class', 'port')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 14)
      .attr('height', 14);

    this.port_output = this.nodegroup
      .append('g')
      .attr('class', 'port_output')
      .attr('transform', `translate(${this.node.attr('width') - 7}, 14)`)
      .append('rect')
      .attr('class', 'port')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('width', 14)
      .attr('height', 14);

    this.loadEvent();
  }

  loadEvent() {
    this.nodegroup.call(d3.behavior.drag().on('drag', this.handleNodeDrag));

    this.port_input
      .on('mouseover', this.handlePortMouseOver)
      .on('mouseout', this.handlePortMouseOut)
      .on('click', this.handlePortClick);

    this.port_output
      .on('mouseover', this.handlePortMouseOver)
      .on('mouseout', this.handlePortMouseOut)
      .on('click', this.handlePortClick)
      .on('mousemove', this.handleMouseMove);
  }

  handleNodeDrag(d) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;

    d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`);
  }

  handlePortMouseOver() {
    d3.select(this).classed('port_hover', true);
  }

  handlePortMouseOut() {
    d3.select(this).classed('port_hover', false);
  }

  handlePortClick() {
    const w = d3.select(this).on('mousemove');
  }

  handleMouseMove() {
    console.log(d3.event);
  }
};

export default Node;
