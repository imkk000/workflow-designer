import { errorDialog } from '../editor/dialog'

const isSelfNode = ({ beginId, endId }) => beginId === endId

const showErrorDialog = () => {
  errorDialog('You can not select this node, please try again.')
  return true
}

export default nodes => {
  const result = isSelfNode(nodes)
  if (result) return showErrorDialog()

  // NOTE: this connection is ok
  return false
}
