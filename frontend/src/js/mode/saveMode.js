import { getDataFromGlobal } from '../utility/editorMode'

const saveMode = () => {
  const nodes = getDataFromGlobal('NODES')
  const lines = getDataFromGlobal('LINES')

  const newNodes = Object.values(nodes).map(node => {
    const { settings } = node

    // remove value depth 0
    delete node.label
    delete node.limitInput

    // remove value depth 1: settings
    Object.keys(settings).map(settingKey => {
      const { value } = settings[settingKey]
      settings[settingKey] = { value }
      return true
    })

    return node
  })

  const newLines = Object.keys(lines).map(lineId => ({
    lineId,
    ...lines[lineId],
  }))

  localStorage.setItem('NODES', JSON.stringify(newNodes))
  localStorage.setItem('LINES', JSON.stringify(newLines))
}

window.addEventListener('load', () => {
  document.getElementById('save').addEventListener('click', () => {
    saveMode()
  })
})

export default saveMode
