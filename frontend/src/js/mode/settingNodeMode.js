import uploadFileDialog from './settingDialog/upload-file-dialog'
import setParameterDialog from './settingDialog/set-parameter-dialog'
import { getDataFromGlobal, getPassData } from '../utility/editorMode'

const getValidator = type => {
  if (type === 'rotate') {
    return {
      angle: {
        validator: value => value >= 0 && value <= 359,
        errorText: 'Angle has value between 0 degree to 359 degree',
      },
    }
  } else if (type === 'gaussian_blur') {
    return {
      sigmaX: {
        validator: value => value >= 0 && value <= 100,
        errorText: 'sigmaX has value between 0 to 100',
      },
      sigmaY: {
        validator: value => value >= 0 && value <= 100,
        errorText: 'sigmaY has value between 0 to 100. if sigmaY is zero, it is set to be equal to sigmaX',
      },
    }
  } else if (type === 'resize') {
    return {
      widthPercent: {
        validator: value => value >= 0 && value <= 100,
        errorText: 'widthPercent has value between 0% to 100%',
      },
      heightPercent: {
        validator: value => value >= 0 && value <= 100,
        errorText: 'heightPercent has value between 0% to 100%',
      },
    }
  }
  return {}
}

export default () => {
  const nodes = getDataFromGlobal('NODES')
  const { nodeId } = getPassData()
  const { type } = nodes[nodeId]
  const validator = getValidator(type)

  if (type === 'load_image') uploadFileDialog()
  else setParameterDialog(validator)
}
