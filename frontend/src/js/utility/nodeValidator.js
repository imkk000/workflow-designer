import { errorDialog } from '../editor/dialog'
import { getDataFromGlobal } from './editorMode'

const nodes = getDataFromGlobal('NODES')
const lines = getDataFromGlobal('LINES')
const graph = getDataFromGlobal('GRAPH')

const isSelfNode = ({ beginId, endId }) => beginId === endId

const isLimitInput = ({ endId }) => nodes[endId].limitInput === graph.indegree(endId)

const showErrorDialog = () => {
  errorDialog('You can not select this node, please try again.')
  return true
}

export default nodeData => {
  console.log(nodeData[nodeData.beginId].limitInput === graph.indegree(nodeData.endId))
  if (isSelfNode(nodeData)) return showErrorDialog()
  if (isLimitInput(nodeData)) return showErrorDialog()

  // NOTE: this connection is ok
  return false
}
