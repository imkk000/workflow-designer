import { isInt } from 'validator'

export default {
  label: 'Resize',
  type: 'ResizeFunction',
  limitInput: 1,
  fill: '#9BFF00',
  stroke: 'black',
  settings: {
    widthPercent: {
      defaultValue: 0,
      validatorOptions: { gt: -100, lt: 100 },
      get validator() {
        return value => isInt(value, this.validatorOptions)
      },
      get label() {
        return `widthPercent (${this.validatorOptions.gt} - ${this.validatorOptions.lt}) [%]`
      },
      get errorText() {
        return `widthPercent has value between ${this.validatorOptions.gt}% to ${this.validatorOptions.lt}%`
      },
    },
    heightPercent: {
      defaultValue: 0,
      validatorOptions: { gt: -100, lt: 100 },
      get validator() {
        return value => isInt(value, this.validatorOptions)
      },
      get label() {
        return `heightPercent (${this.validatorOptions.gt} - ${this.validatorOptions.lt}) [%]`
      },
      get errorText() {
        return `heightPercent has value between ${this.validatorOptions.gt}% to ${this.validatorOptions.lt}%`
      },
    },
  },
}
