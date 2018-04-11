source = {
  x: 300,
  y: 100
};
target = {
  x: 100,
  y: 100
};
middle = {
  x: (source.x + target.x) / 2,
  y: (source.y + target.y) / 2
};

// set circle
(function() {
  circle = document.querySelector('#source');
  circle.setAttribute('cx', source.x);
  circle.setAttribute('cy', source.y);

  circle = document.querySelector('#target');
  circle.setAttribute('cx', target.x);
  circle.setAttribute('cy', target.y);
})();

// set line original
(function() {
  lineGuide = document.querySelector('#line-guide');
  _ =
    `M ${source.x},${source.y} ` +
    `C ${middle.x},${source.y} ` +
    `${middle.x},${target.y} ` +
    `${target.x},${target.y} `;
  console.log('_ori_:', _);
  lineGuide.setAttribute('d', _);
})();

// set line instead of original
(function() {
  line = document.querySelector('#line-new');
  _ =
    `M ${source.x},${source.y} ` +
    `Q ${middle.x},${source.y} ${middle.x},${middle.y} ` +
    `Q ${middle.x},${target.y} ${target.x},${target.y} `;
  console.log('_new_:', _);
  line.setAttribute('d', _);
})();
