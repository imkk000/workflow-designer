function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  d3.select('svg')
    .data([{x: 100, y: 100}])
    .append('rect')
    .attr('width', 50)
    .attr('height', 50)
    .attr('fill', 'white')
    .attr('x', 100)
    .attr('y', 100)
    .call(d3.drag().on('drag', function (d) {
      d.x += d3.event.dx
      d.y += d3.event.dy

      d3
        .select(this)
        .attr('x', d.x)
        .attr('y', d.y)
    }))
}
