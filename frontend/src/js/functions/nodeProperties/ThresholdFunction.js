export default {
  label: 'Threshold',
  type: 'ThresholdFunction',
  limitInput: 1,
  fill: '#71AE83',
  stroke: 'brown',
  documentation: 'https://docs.opencv.org/trunk/d7/d1b/group__imgproc__misc.html#gae8a4a146d1ca78c626a53577199e9c57',
  settings: {
    thresh: {
      defaultValue: 0,
    },
    maxVal: {
      defaultValue: 255,
    },
  },
}
