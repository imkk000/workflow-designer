import errorDialog from '../dialog/errorDialog'

const isSelfNode = ({ beginId, endId }) => beginId === endId
const notSelfNode = nodesId => !isSelfNode(nodesId)

export const checkSelfNode = nodesId => {
  if (isSelfNode(nodesId)) errorDialog('Error!')
}

export default isSelfNode
