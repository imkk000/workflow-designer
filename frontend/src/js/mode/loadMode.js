import GraphDataStructure from 'graph-data-structure'
import Node from '../editor/node'
import Line from '../editor/line'
import { getDataFromGlobal, setDataToGlobal } from '../utility/editorMode'
import { getDrawArea } from '../utility/getArea'

const loadMode = data => {
  let parseNodes = null
  let parseLines = null

  if (data) {
    const { nodes, lines } = JSON.parse(data)
    parseNodes = nodes
    parseLines = lines
  } else {
    parseNodes = localStorage.getItem('NODES')
    parseLines = localStorage.getItem('LINES')

    if (!parseNodes || !parseLines) return

    parseNodes = JSON.parse(parseNodes)
    parseLines = JSON.parse(parseLines)
  }

  const nodesProperties = getDataFromGlobal('NODES_PROPERTIES')
  const nodes = []
  const lines = parseLines

  // map validator with nodes
  Object.values(parseNodes).map(parseNode => {
    const { id, position, type, settings, files, lines: nodeLines } = parseNode

    if (settings) {
      const { settings: nodePropertySettings } = nodesProperties[type]
      const settingKeys = Object.keys(nodePropertySettings)
      settingKeys.map(settingKey => {
        const setting = nodePropertySettings[settingKey]

        settings[settingKey] = {
          ...setting,
          ...settings[settingKey],
        }
        return true
      })
    }

    nodes.push({
      ...nodesProperties[type],
      id,
      settings,
      x: position[0],
      y: position[1],
      files,
      lines: nodeLines,
    })

    return true
  })

  // reset global variable
  setDataToGlobal('NODES', {})
  setDataToGlobal('LINES', {})
  setDataToGlobal('GRAPH', new GraphDataStructure())

  // clear canvas
  getDrawArea()
    .selectAll('*')
    .remove()

  nodes.map(node => {
    new Node(node)
    return true
  })

  lines.map(line => {
    new Line(line)
    return true
  })
}

window.addEventListener('load', () => {
  document.getElementById('load').addEventListener('click', () => {
    loadMode()
  })
})

export default loadMode
