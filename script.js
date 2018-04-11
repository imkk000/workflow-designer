source = {
  x: 100,
  y: 100
};
target = {
  x: 100,
  y: 300
};
arrow = {
  width: 6,
  height: 6
};
middle = {
  x: (source.x + target.x) / 2,
  y: (source.y + target.y) / 2
};

// set line instead of original
(function() {
  rad = Math.atan2(target.y - source.y, target.x - source.x); // rad
  r = arrow.width * 3; // arrow size
  end = {
    x: r * Math.cos(rad) + target.x,
    y: r * Math.sin(rad) + target.y
  };

  line = document.querySelector('#line-new');
  _ =
    `M ${source.x} ${source.y},` +
    `C ${middle.x} ${source.y},` +
    `${middle.x} ${target.y},` +
    `${target.x} ${target.y},`;

  console.log('_new_:', _);
  line.setAttribute('d', _);

  arrow = document.querySelector('#arrow');
  arrow.setAttribute('refX', 0);
  arrow.setAttribute('refY', 3);

  path = arrow.querySelector('path');
  _ = `M 0 0,  L 0 6, 6 3 z`;
  path.setAttribute('d', _);
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

// set line original
(function() {
  // lineGuide = document.querySelector('#line-guide');
  // _ =
  //   `M ${source.x} ${source.y},` +
  //   `C ${middle.x} ${source.y},` +
  //   `${middle.x} ${target.y},` +
  //   `${target.x} ${target.y},`;
  // console.log('_ori_:', _);
  // lineGuide.setAttribute('d', _);
})();
