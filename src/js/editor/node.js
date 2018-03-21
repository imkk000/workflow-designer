import * as d3 from 'd3';

export default (workspace, g) =>
  class {
    setNode(x, y, text) {
      this.node_data = [{ x: x, y: y }];

      this.node_group = d3
        .select('.root')
        .append('g')
        .data(this.node_data)
        .attr('class', 'node_group')
        .attr('transform', `translate(${x}, ${y})`);

      this.node = this.node_group
        .append('rect')
        .attr('class', 'node')
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('fill', 'lightBlue')
        .attr('width', 125)
        .attr('height', 40);

      this.line = this.node_group
        .append('path')
        .attr('class', 'node_line')
        .attr('d', 'M 30 1 l 0 38');

      this.text = this.node_group
        .append('text')
        .attr('class', 'node_label')
        .attr('x', 38)
        .attr('y', 19)
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .text(text);

      this.port_input = this.node_group
        .append('g')
        .attr('class', 'port_input')
        .attr('transform', 'translate(-7, 14)')
        .append('rect')
        .attr('class', 'port')
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('width', 14)
        .attr('height', 14);

      this.port_output = this.node_group
        .append('g')
        .attr('class', 'port_output')
        .attr('transform', `translate(${this.node.attr('width') - 7}, 14)`)
        .append('rect')
        .attr('class', 'port')
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('width', 14)
        .attr('height', 14);

      this.drawable = false;
      this.loadEvent();
    }

    loadEvent() {
      this.node_group.call(d3.drag().on('drag', this.handleNodeDrag));

      this.port_input
        .on('mouseover', this.handlePortMouseOver)
        .on('mouseout', this.handlePortMouseOut)
        .call(
          d3
            .drag()
            .on('start', this.handlePortDragStart)
            .on('drag', this.handlePortDragging)
            .on('end', this.handlePortDragEnd)
        );

      this.port_output
        .on('mouseover', this.handlePortMouseOver)
        .on('mouseout', this.handlePortMouseOut)
        .call(
          d3
            .drag()
            .on('start', this.handlePortDragStart)
            .on('drag', this.handlePortDragging)
            .on('end', this.handlePortDragEnd)
        );
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

    handlePortDragStart() {
      this.drawable = true;
      const x = d3.event.sourceEvent.x,
        y = d3.event.sourceEvent.y;
      this.source = [x, y];

      const link = d3.linkVertical();

      workspace
        .append('path')
        .data([
          {
            source: [x, y],
            target: [x, y]
          }
        ])
        .attr('d', link)
        .attr('fill', 'none')
        .attr('stroke-width', 3)
        .attr('stroke', '#ff7f0e');
    }

    handlePortDragging() {
      const link = d3.linkHorizontal();
      const x = d3.event.sourceEvent.x,
        y = d3.event.sourceEvent.y;

      workspace
        .select('path')
        .data([
          {
            source: this.source,
            target: [x, y]
          }
        ])
        .attr('d', link);
    }

    handlePortDragEnd() {
      this.drawable = false;
      workspace.select('path').remove();
    }
  };
