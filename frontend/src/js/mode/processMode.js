import axios from 'axios'
import { isLength } from 'validator'
import EDITOR_MODE, { getDataFromGlobal, notNormalMode, setEditorMode } from '../utility/editorMode'
import { informationDialog, errorDialog, confirmDialog } from '../editor/dialog'

let startProcessState = false

const quitProcessMode = () => {
  startProcessState = true
  toggleMode()
  setEditorMode(EDITOR_MODE.NORMAL)
}

const toggleMode = () => {
  if (startProcessState) {
    document.getElementById('start').innerText = 'Start'
    startProcessState = false
  } else {
    document.getElementById('start').innerText = 'Process'
    startProcessState = true
  }
}

window.addEventListener('load', () => {
  document.getElementById('start').addEventListener('click', () => {
    if (notNormalMode()) {
      errorDialog('Process can use only NORMAL mode')
      return
    }

    if (startProcessState) {
      informationDialog('Exit process mode')
      quitProcessMode()
      return
    }

    setEditorMode(EDITOR_MODE.PROCESS)

    const nodes = getDataFromGlobal('NODES')
    const lines = getDataFromGlobal('LINES')
    const graph = getDataFromGlobal('GRAPH')
    // sort and remove some node dont have lines
    const topologicalSort = graph
      .topologicalSort()
      .filter(nodeId => nodes[nodeId].lines.length > 0)
      .map(nodeId => nodes[nodeId])

    if (topologicalSort.length === 0) {
      errorDialog('Functions not found, please try again')
      quitProcessMode()
      return
    }

    // check empty file
    const loadImageFunctions = topologicalSort.filter(({ type }) => type === 'LoadImageFunction')
    if (loadImageFunctions.length === 0) {
      errorDialog('LoadImageFunction not found')
      quitProcessMode()
      return
    }

    const isFilesValid = loadImageFunctions.reduce((valid, { files: { fileId } }) => {
      const isValid = isLength(fileId, { min: 32 })
      return valid && isValid
    }, true)

    if (!isFilesValid) {
      errorDialog('LoadImageFunction does not have image file')
      quitProcessMode()
      return
    }

    // start process
    const queue = topologicalSort
    const queueNext = () => {
      if (startProcessState) {
        const node = queue.shift()
        if (node) {
          const { id, type, settings, lines: linesNode } = node

          if (type === 'LoadImageFunction') {
            queueNext()
            return
          }

          // deep clone
          const newSettings = JSON.parse(JSON.stringify(settings))
          Object.keys(newSettings).map(key => {
            const { value } = newSettings[key]
            newSettings[key] = value
            return true
          })

          const beginFiles = linesNode
            .filter(lineId => {
              const { beginId } = lines[lineId]
              return id !== beginId
            })
            .map(lineId => {
              const { beginId } = lines[lineId]
              const nodeFiles = nodes[beginId].files
              return nodeFiles
            })

          const newFiles = beginFiles.length === 1 ? beginFiles[0] : beginFiles
          const sendData = {
            id,
            type,
            files: newFiles,
            settings: newSettings,
          }

          axios
            .post('http://127.0.0.1:9999/api/process', sendData)
            .then(({ data }) => {
              if (!startProcessState) return

              if (queue.length) {
                if (data.status) {
                  errorDialog('something error on server, please try again')
                  return
                }

                node.files = data
                queueNext()
              } else {
                informationDialog('Process Complete')
                quitProcessMode()
              }
            })
            .catch(error => {
              errorDialog('Something error, please try again')
              quitProcessMode()
            })
        }
      }
    }

    // add custom callback
    const okCallback = () => {
      toggleMode()
      queueNext()
      $('#confirm-dialog').dialog('close')
    }
    const cancelCallback = () => {
      quitProcessMode()
      $('#confirm-dialog').dialog('close')
    }
    confirmDialog('Do you want to continue?', okCallback, cancelCallback)
  })
})
