import { isInt } from 'validator'

export default {
  label: 'Rotate',
  type: 'RotateFunction',
  limitInput: 1,
  fill: 'orange',
  stroke: 'black',
  settings: {
    angle: {
      defaultValue: 90,
      validatorOptions: { min: -359, max: 359 },
      get validator() {
        return value => isInt(value, this.validatorOptions)
      },
      get label() {
        return `angle (${this.validatorOptions.min}- ${this.validatorOptions.max}) [degree]`
      },
      get errorText() {
        return `angle has value between ${this.validatorOptions.min} degree to ${this.validatorOptions.max} degree`
      },
    },
  },
}
