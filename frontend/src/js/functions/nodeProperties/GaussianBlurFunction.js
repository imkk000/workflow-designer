import { isInt } from 'validator'

export default {
  label: 'Gaussian Blur',
  type: 'GaussianBlurFunction',
  limitInput: 1,
  fill: 'cyan',
  stroke: 'black',
  settings: {
    sigma: {
      defaultValue: 15,
      validateOptions: { min: 0, max: 100 },
      get validator() {
        return value => isInt(value, this.validateOptions) && value % 2
      },
      get label() {
        return `sigma (${this.validateOptions.min} - ${this.validateOptions.max}) [odd-number]`
      },
      get errorText() {
        return `sigma has value between ${this.validateOptions.min} to
        ${this.validateOptions.max}, and is odd number`
      },
    },
  },
}
