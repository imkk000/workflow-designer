import { isInt } from 'validator'

export default {
  label: 'Resize',
  type: 'ResizeFunction',
  limitInput: 1,
  fill: '#CCFFFF',
  stroke: 'brown',
  settings: {
    widthPercent: {
      defaultValue: 0,
      validatorOptions: { min: -100, max: 100 },
      get validator() {
        return value => isInt(value, this.validatorOptions)
      },
      get label() {
        return `widthPercent (${this.validatorOptions.min} - ${this.validatorOptions.max}) [%]`
      },
      get errorText() {
        return `widthPercent has value between ${this.validatorOptions.min}% to ${this.validatorOptions.max}%`
      },
    },
    heightPercent: {
      defaultValue: 0,
      validatorOptions: { min: -100, max: 100 },
      get validator() {
        return value => isInt(value, this.validatorOptions)
      },
      get label() {
        return `heightPercent (${this.validatorOptions.min} - ${this.validatorOptions.max}) [%]`
      },
      get errorText() {
        return `heightPercent has value between ${this.validatorOptions.min}% to ${this.validatorOptions.max}%`
      },
    },
  },
}
