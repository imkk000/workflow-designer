import { errorDialog } from '../editor/dialog'

const isSelfNode = ({ beginId, endId }) => beginId === endId

export const checkSelfNode = nodesId => {
  const result = isSelfNode(nodesId)

  if (result) errorDialog("Can't select")
  return result
}

export default isSelfNode
