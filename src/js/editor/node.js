import _ from 'lodash';
import genId from '../util/generateId';

// private variable
let id, g, text, node, port, port_target;

export default (temp, workspace) =>
  class {
    constructor(x, y, text) {
      id = genId();

      g = workspace
        .append('g')
        .data([{ x: x, y: y }])
        .attr('class', 'node_group')
        .attr('transform', `translate(${x}, ${y})`);

      text = g
        .append('text')
        .attr('class', 'node_label')
        .attr('dx', '.7em')
        .attr('dy', '1.5em')
        .attr('text-anchor', 'start')
        .text(text);

      const textBBox = text.node().getBBox();

      node = g
        .insert('rect', ':first-child')
        .attr('class', 'node')
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('fill', 'lightBlue')
        .attr('width', textBBox.width + 20)
        .attr('height', textBBox.height + 20);

      port = g
        .append('circle')
        .attr('class', 'node_port')
        .attr('r', 10);

      this.loadEvent();
    }

    get getId() {
      return id;
    }

    loadEvent() {
      this.nodeEvent();
      this.portEvent();
    }

    nodeEvent() {
      function handleDrag(d) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        d3.select(this).raise().attr('transform', `translate(${d.x}, ${d.y})`);
      }
      g.call(d3.drag().on('drag', handleDrag));
    }

    portEvent() {
      function handleMouseOver() {
        port_target = this;
        d3.select(this).classed('node_port_hover', true);
      }
      function handleMouseOut() {
        port_target = null;
        d3.select(this).classed('node_port_hover', false);
      }
      function handleStartDrag(d) {
        temp
          .append('path')
          .data([
            {
              source: [d.x, d.y],
              target: [d.x, d.y]
            }
          ])
          .attr('class', 'draw_line')
          .attr('d', d3.linkHorizontal());
      }
      function handleDragged(d) {
        temp
          .select('.draw_line')
          .data([
            {
              source: [d.x, d.y],
              target: [d3.event.sourceEvent.x, d3.event.sourceEvent.y]
            }
          ])
          .attr('d', d3.linkHorizontal());
      }
      function handleEndDrag(d) {
        if (!_.isNil(port_target)) {
          console.log(port_target);
        }

        temp.select('.draw_line').remove();
      }
      port
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut)
        .call(
          d3
            .drag()
            .on('start', handleStartDrag)
            .on('drag', handleDragged)
            .on('end', handleEndDrag)
        );
    }
  };
