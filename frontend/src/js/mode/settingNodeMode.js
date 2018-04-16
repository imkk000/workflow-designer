import uploadFileDialog from './settingDialog/upload-file-dialog'
import setParameterDialog from './settingDialog/set-parameter-dialog'
import { getDataFromGlobal, getPassData } from '../utility/editorMode'

export default () => {
  const nodes = getDataFromGlobal('NODES')
  const { nodeId } = getPassData()
  const { type, settings } = nodes[nodeId]
  const settingsCount = Object.keys(settings).length

  if (type === 'LoadImageFunction') uploadFileDialog()
  else if (settingsCount) setParameterDialog()
}
