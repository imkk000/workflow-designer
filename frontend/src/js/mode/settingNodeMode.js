import uploadFileDialog from './settingDialog/upload-file-dialog'
import { getDataFromGlobal, getPassData } from '../utility/editorMode'

export default () => {
  const nodes = getDataFromGlobal('NODES')
  const { nodeId } = getPassData()
  const { type } = nodes[nodeId]

  if (type === 'load_image') uploadFileDialog()
}
