import * as d3 from 'd3';

export default (temp, workspace) =>
  class {
    constructor(x, y, text) {
      this.node_data = [{ x: x, y: y }];

      this.node_group = workspace
        .append('g')
        .data(this.node_data)
        .attr('class', 'node_group')
        .attr('transform', `translate(${x}, ${y})`);

      this.text = this.node_group
        .append('text')
        .attr('class', 'node_label')
        .attr('dx', '.7em')
        .attr('dy', '1.5em')
        .attr('text-anchor', 'start')
        .style('font', 'bold 1em sans-serif, Verdana, Arial, Helvetica')
        .text(text);

      const textBBox = this.text.node().getBBox();

      this.node = this.node_group
        .insert('rect', ':first-child')
        .attr('class', 'node')
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('fill', 'lightBlue')
        .attr('width', textBBox.width + 20)
        .attr('height', textBBox.height + 20);

      this.loadEvent();
    }

    loadEvent() {
      this.node_group.call(d3.drag().on('drag', this.handleNodeDrag));
      this.node_group.on('dblclick', this.handleNodeDblClick);
    }

    handleNodeDrag(d) {
      d.x += d3.event.dx;
      d.y += d3.event.dy;

      d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`);
    }

    handleNodeDblClick(d) {
      console.log('clicked');
    }
  };
