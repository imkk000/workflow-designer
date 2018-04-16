import { isInt } from 'validator'

export default {
  label: 'Rotate',
  type: 'RotateFunction',
  limitInput: 1,
  fill: 'orange',
  stroke: 'black',
  settings: {
    angle: {
      defaultValue: 0,
      validatorOptions: { gt: -359, lt: 359 },
      get validator() {
        return value => isInt(value, this.validatorOptions)
      },
      get label() {
        return `angle (${this.validatorOptions.gt}- ${this.validatorOptions.lt}) [degree]`
      },
      get errorText() {
        return `angle has value between ${this.validatorOptions.gt} degree to ${this.validatorOptions.lt} degree`
      },
    },
  },
}
