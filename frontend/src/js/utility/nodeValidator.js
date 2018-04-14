import { errorDialog } from '../editor/dialog'
import { getDataFromGlobal } from './editorMode'

let nodes
let graph

const isSelfNode = ({ beginId, endId }) => beginId === endId

const isLimitInput = ({ endId }) => nodes[endId].limitInput === graph.indegree(endId)

const isDuplicate = ({ beginId, endId }) => graph.adjacent(beginId).filter(nodeId => nodeId === endId).length

const isUndirected = ({ beginId, endId }) => graph.adjacent(endId).filter(nodeId => nodeId === beginId).length

const showErrorDialog = () => {
  errorDialog('You can not select this node, please try again.')
  return true
}

export default nodeData => {
  // NOTE: first, get all data from global
  nodes = getDataFromGlobal('NODES')
  graph = getDataFromGlobal('GRAPH')

  const validateFunctionList = [isSelfNode, isLimitInput, isDuplicate, isUndirected]

  for (let i = 0; i < validateFunctionList.length; i += 1)
    if (validateFunctionList[i](nodeData)) return showErrorDialog()

  // NOTE: this connection is ok
  return false
}
