import { getDataFromGlobal } from '../utility/editorMode'

export default nodeId => {
  const nodes = getDataFromGlobal('NODES')
  const graph = getDataFromGlobal('GRAPH')
  const node = d3.select(document.getElementById(nodeId))
  const nodeInDegree = graph.indegree(nodeId)
  const nodeOutDegree = graph.outdegree(nodeId)
  const { label, limitInput, settings } = nodes[nodeId]

  const settingsArray = Object.keys(settings)
  let paramsString = ''
  if (settingsArray.length) {
    settingsArray.map((key, index) => {
      paramsString += `${settings[key].value}`
      if (settingsArray.length - 1 > index) paramsString += ', '
      return true
    })
    paramsString = `(${paramsString}) `
  }

  const newLabel = `${limitInput}-${label} ${paramsString} (${nodeInDegree}, ${nodeOutDegree})`
  const nodeLabel = node.select('.node-label').text(newLabel)
  const textBBox = nodeLabel.node().getBBox()
  const { width: textWidth, height: textHeight } = textBBox
  const newWidth = Math.max(90, textWidth) + 15
  const newHeight = Math.max(35, textHeight)

  // fix node label center
  nodeLabel.attr('x', newWidth / 2)
  nodeLabel.attr('y', newHeight / 2)

  node
    .select('.node-box')
    .attr('width', newWidth)
    .attr('height', newHeight)
}
