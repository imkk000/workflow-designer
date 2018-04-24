export default {
  label: 'Canny',
  type: 'CannyFunction',
  limitInput: 1,
  fill: '#FF9E62',
  stroke: 'brown',
  documentation: 'https://docs.opencv.org/3.1.0/dd/d1a/group__imgproc__feature.html#ga04723e007ed888ddf11d9ba04e2232de',
  settings: {
    threshold1: {
      defaultValue: 0,
    },
    threshold2: {
      defaultValue: 0,
    },
  },
  files: {
    fileId: '',
    fileExt: '',
  },
}
