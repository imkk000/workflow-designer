export default {
  label: 'Gaussian Blur',
  type: 'GaussianBlurFunction',
  limitInput: 1,
  fill: '#C4DF00',
  stroke: 'brown',
  documentation: 'https://docs.opencv.org/3.1.0/d4/d86/group__imgproc__filter.html#gaabe8c836e97159a9193fb0b11ac52cf1',
  settings: {
    sigmaX: {
      defaultValue: 1,
    },
    sigmaY: {
      defaultValue: 0,
    },
  },
}
