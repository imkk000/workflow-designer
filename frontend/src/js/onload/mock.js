import axios from 'axios'
import { getDataFromGlobal } from '../utility/editorMode'
import { informationDialog } from '../editor/dialog'

window.addEventListener('load', () => {
  document.getElementById('start-process').addEventListener('click', () => {
    const nodes = getDataFromGlobal('NODES')
    const graph = getDataFromGlobal('GRAPH')
    const topologicalSort = graph.topologicalSort()
    const queue = topologicalSort
    const queueNext = () => {
      const nodeId = queue.shift()
      if (nodeId) {
        axios.post('http://127.0.0.1:9999/api/process', nodes[nodeId]).then(({ data }) => {
          if (queue.length) {
            nodes[queue[0]].files = data
            queueNext()
          } else {
            informationDialog('Process Complete')
          }
        })
      }
    }
    queueNext()
  })
})
