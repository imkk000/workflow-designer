import { isInt } from 'validator'
import uploadFileDialog from './settingDialog/upload-file-dialog'
import setParameterDialog from './settingDialog/set-parameter-dialog'
import { getDataFromGlobal, getPassData } from '../utility/editorMode'

export const getSettings = type => {
  if (type === 'rotate') {
    const angleOptions = { gt: -359, lt: 359 }
    return {
      angle: {
        value: 0,
        defaultValue: 0,
        validator: value => isInt(value, angleOptions),
        label: `angle (${angleOptions.gt}- ${angleOptions.lt}) [degree]`,
        errorText: `angle has value between ${angleOptions.gt} degree to ${angleOptions.lt} degree`,
      },
    }
  } else if (type === 'gaussian_blur') {
    const sigmaXOptions = { gt: 0, lt: 100 }
    const sigmaYOptions = { gt: 0, lt: 100 }
    return {
      sigmaX: {
        value: 15,
        defaultValue: 15,
        validator: value => isInt(value, sigmaXOptions),
        label: `sigmaX (${sigmaXOptions.gt} - ${sigmaXOptions.lt}) [integer]`,
        errorText: `sigmaX has value between ${sigmaXOptions.gt} to ${sigmaXOptions.lt}`,
      },
      sigmaY: {
        value: 0,
        defaultValue: 0,
        validator: value => isInt(value, sigmaYOptions),
        label: `sigmaY (${sigmaYOptions.gt} - ${sigmaYOptions.lt}) [integer]`,
        errorText: `sigmaY has value between ${sigmaYOptions.gt} to ${
          sigmaYOptions.lt
        }. if sigmaY is zero, it is set to be equal to sigmaX`,
      },
    }
  } else if (type === 'resize') {
    const widthPercentOptions = { gt: -100, lt: 100 }
    const heightPercentOptions = { gt: -100, lt: 100 }
    return {
      widthPercent: {
        value: 0,
        defaultValue: 0,
        validator: value => isInt(value, widthPercentOptions),
        label: `widthPercent (${widthPercentOptions.gt} - ${widthPercentOptions.lt}) [%]`,
        errorText: `widthPercent has value between ${widthPercentOptions.gt}% to ${widthPercentOptions.lt}%`,
      },
      heightPercent: {
        value: 0,
        defaultValue: 0,
        validator: value => isInt(value, heightPercentOptions),
        label: `heightPercent (${heightPercentOptions.gt} - ${heightPercentOptions.lt}) [%]`,
        errorText: `heightPercent has value between ${heightPercentOptions.gt}% to ${heightPercentOptions.lt}%`,
      },
    }
  } else if (type === 'debugger') {
    return {
      fill: {
        value: 'green',
        defaultValue: 'gold',
        validator: () => {
          console.log(getDataFromGlobal('NODES'))
          return true
        },
        label: 'How do you feel',
        errorText: '',
      },
    }
  }

  return {}
}

export default () => {
  const nodes = getDataFromGlobal('NODES')
  const { nodeId } = getPassData()
  const { type } = nodes[nodeId]

  if (type === 'load_image') uploadFileDialog()
  else setParameterDialog()
}
