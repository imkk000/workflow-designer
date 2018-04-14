import { errorDialog } from '../editor/dialog'
import { getDataFromGlobal } from './editorMode'

let nodes
let lines
let graph

const isSelfNode = ({ beginId, endId }) => beginId === endId

const isLimitInput = ({ endId }) => nodes[endId].limitInput === graph.indegree(endId)

const showErrorDialog = () => {
  errorDialog('You can not select this node, please try again.')
  return true
}

export default nodeData => {
  // NOTE: first, get all data from global
  nodes = getDataFromGlobal('NODES')
  lines = getDataFromGlobal('LINES')
  graph = getDataFromGlobal('GRAPH')

  const validateFunctionList = [isSelfNode, isLimitInput]

  for (let i = 0; i < validateFunctionList.length; i += 1)
    if (validateFunctionList[i](nodeData)) return showErrorDialog()

  // NOTE: this connection is ok
  return false
}
