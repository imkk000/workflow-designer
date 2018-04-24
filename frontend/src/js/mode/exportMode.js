import { getDataFromGlobal } from '../utility/editorMode'

// http://www.codevoila.com/post/30/export-json-data-to-downloadable-file-using-javascript
const exportMode = () => {
  const xnodes = getDataFromGlobal('NODES')
  const xlines = getDataFromGlobal('LINES')

  const nodes = JSON.parse(JSON.stringify(xnodes))
  const lines = JSON.parse(JSON.stringify(xlines))

  const newNodes = Object.keys(nodes).map(nodeId => {
    const node = nodes[nodeId]

    delete node.label
    delete node.documentation
    delete node.limitInput
    delete node.files

    Object.keys(node.settings).map(settingKey => {
      delete node.settings[settingKey].defaultValue
      return true
    })

    return node
  })

  const newLines = Object.keys(lines).map(lineId => ({
    lineId,
    ...lines[lineId],
  }))

  return {
    nodes: newNodes,
    lines: newLines,
  }
}

window.addEventListener('load', () => {
  document.getElementById('export').addEventListener('click', () => {
    const jsonData = exportMode()
    const dataStr = JSON.stringify(jsonData)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    const exportFileDefaultName = 'workflow-export.json'

    // fake click for download file
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  })
})

export default exportMode
