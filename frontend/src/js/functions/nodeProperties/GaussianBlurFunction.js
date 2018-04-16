import { isInt } from 'validator'

export default {
  label: 'Gaussian Blur',
  type: 'GaussianBlurFunction',
  limitInput: 1,
  fill: 'cyan',
  stroke: 'black',
  settings: {
    sigmaX: {
      defaultValue: 15,
      validateOptions: { min: 0, max: 100 },
      get validator() {
        return value => isInt(value, this.validateOptions)
      },
      get label() {
        return `sigmaX (${this.validateOptions.min} - ${this.validateOptions.max}) [integer]`
      },
      get errorText() {
        return `sigmaX has value between ${this.validateOptions.min} to ${this.validateOptions.max}`
      },
    },
    sigmaY: {
      defaultValue: 15,
      validateOptions: { min: 0, max: 100 },
      get validator() {
        return value => isInt(value, this.validateOptions)
      },
      get label() {
        return `sigmaY (${this.validateOptions.min} - ${this.validateOptions.max}) [integer]`
      },
      get errorText() {
        return `sigmaY has value between ${this.validateOptions.min} to ${this.validateOptions.max}`
      },
    },
  },
}
