export default {
  label: 'Sobel',
  type: 'SobelFunction',
  limitInput: 1,
  fill: '#DE0079',
  stroke: 'brown',
  documentation: 'https://docs.opencv.org/3.1.0/d4/d86/group__imgproc__filter.html#gacea54f142e81b6758cb6f375ce782c8d',
  settings: {
    ddepth: {
      defaultValue: 0,
    },
    dx: {
      defaultValue: 1,
    },
    dy: {
      defaultValue: 0,
    },
  },
}
