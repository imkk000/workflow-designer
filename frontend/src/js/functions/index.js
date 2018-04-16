import { setDataToGlobal } from '../utility/editorMode'

import LoadImageFunction from './nodeProperties/LoadImageFunction'
import RotateFunction from './nodeProperties/RotateFunction'
import GaussianBlurFunction from './nodeProperties/GaussianBlurFunction'
import ResizeFunction from './nodeProperties/ResizeFunction'
import ConvertGrayScaleFunction from './nodeProperties/ConvertGrayScaleFunction'
import ConvertHSVScaleFunction from './nodeProperties/ConvertHSVScaleFunction'

window.addEventListener('load', () => {
  const functionsInclude = [
    LoadImageFunction,
    ConvertGrayScaleFunction,
    ConvertHSVScaleFunction,
    GaussianBlurFunction,
    ResizeFunction,
    RotateFunction,
  ]
  const defaultSettings = {
    x: 0,
    y: 0,
    settings: {},
    files: {
      fileId: '',
      fileName: '',
      fileExt: '',
    },
  }

  // build node properties
  const properties = {}

  functionsInclude.map(property => {
    const { type, settings } = property

    // set default value by defaultValue
    if (settings) {
      Object.values(settings).map(setting => {
        setting.value = setting.defaultValue
        return true
      })
    }

    properties[type] = {
      ...defaultSettings,
      ...property,
    }

    return true
  })

  setDataToGlobal('NODES_PROPERTIES', properties)
})
