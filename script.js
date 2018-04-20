source = {
  x: 100,
  y: 100
};
target = {
  x: 300,
  y: 300
};

middle = {
  x: (source.x + target.x) / 2,
  y: (source.y + target.y) / 2
};

// set line original
(function() {
  // M100,100C200,100,200,300,300,300Z
  // M100,100C200,100,200,300,300,300Z

  lineGuide = document.querySelector('#line-new');
  _ =
    `M${source.x},${source.y}` +
    `C${middle.x},${source.y},` +
    `${middle.x},${target.y},` +
    `${target.x},${target.y}`;
  console.log('_ori_:', _);
  lineGuide.setAttribute('d', _);
})();

// set circle
(function() {
  circle = document.querySelector('#source');
  circle.setAttribute('cx', source.x);
  circle.setAttribute('cy', source.y);

  circle = document.querySelector('#target');
  circle.setAttribute('cx', target.x);
  circle.setAttribute('cy', target.y);
})();
