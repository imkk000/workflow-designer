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
      validateOptions: { gt: 0, lt: 100 },
      get validator() {
        return value => isInt(value, this.validateOptions)
      },
      get label() {
        return `sigmaX (${this.validateOptions.gt} - ${this.validateOptions.lt}) [integer]`
      },
      get errorText() {
        return `sigmaX has value between ${this.validateOptions.gt} to ${this.validateOptions.lt}`
      },
    },
    sigmaY: {
      defaultValue: 0,
      validateOptions: { gt: 0, lt: 100 },
      get validator() {
        return value => isInt(value, this.validateOptions)
      },
      get label() {
        return `sigmaY (${this.validateOptions.gt} - ${this.validateOptions.lt}) [integer]`
      },
      get errorText() {
        return `sigmaY has value between ${this.validateOptions.gt} to ${this.validateOptions.lt}.
        if sigmaY is zero, it is set to be equal to sigmaX`
      },
    },
  },
}
