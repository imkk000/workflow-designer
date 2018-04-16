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
      validatorOptions: { gt: -360, lt: 360 },
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
