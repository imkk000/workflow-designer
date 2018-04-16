import LoadImageFunction from './nodeProperties/LoadImageFunction'
import RotateFunction from './nodeProperties/RotateFunction'
import GaussianBlurFunction from './nodeProperties/GaussianBlurFunction'
import ResizeFunction from './nodeProperties/ResizeFunction'

window.addEventListener('load', () => {
  const functionList = [LoadImageFunction, RotateFunction, GaussianBlurFunction, ResizeFunction]
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
  functionList.map(property => {
    const { settings } = property

    // set default value by defaultValue
    if (settings) {
      Object.values(settings).map(setting => {
        setting.value = setting.defaultValue
        return true
      })
    }

    return {
      ...defaultSettings,
      ...property,
    }
  })
})
