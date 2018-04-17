import axios from 'axios'
import { isLength } from 'validator'
import EDITOR_MODE, { getDataFromGlobal, notNormalMode, setEditorMode } from '../utility/editorMode'
import { informationDialog, errorDialog, confirmDialog } from '../editor/dialog'

const quitProcessMode = () => {
  setEditorMode(EDITOR_MODE.NORMAL)
}

window.addEventListener('load', () => {
  document.getElementById('start-process').addEventListener('click', () => {
    if (notNormalMode()) {
      errorDialog('Process can use only NORMAL mode')
      return
    }

    setEditorMode(EDITOR_MODE.NORMAL)

    const nodes = getDataFromGlobal('NODES')
    const graph = getDataFromGlobal('GRAPH')
    // sort and remove some node dont have lines
    const topologicalSort = graph
      .topologicalSort()
      .filter(nodeId => nodes[nodeId].lines.length > 0)
      .map(nodeId => nodes[nodeId])

    if (topologicalSort.length === 0) return

    // check empty file
    const loadImageFunctions = topologicalSort.filter(({ type }) => type === 'LoadImageFunction')
    if (loadImageFunctions.length === 0) {
      errorDialog('LoadImageFunction not found')
      return
    }

    const isFilesValid = loadImageFunctions.reduce((valid, { files: { fileId, fileExt } }) => {
      const isValid = isLength(fileId, { min: 32 }) && isLength(fileExt, { min: 3, max: 4 })
      return valid && isValid
    }, true)

    if (!isFilesValid) {
      errorDialog("LoadImageFunction don't have image file")
      return
    }

    // start process
    const queue = topologicalSort
    const queueNext = () => {
      const node = queue.shift()
      if (node) {
        const { id, type, files, settings } = node
        // deep clone
        const newSettings = JSON.parse(JSON.stringify(settings))
        Object.keys(newSettings).map(key => {
          const { value } = newSettings[key]
          newSettings[key] = value
          return true
        })

        const sendData = {
          id,
          type,
          files,
          settings: newSettings,
        }

        axios
          .post('http://127.0.0.1:9999/api/process', sendData)
          .then(({ data }) => {
            if (queue.length) {
              queue[0].files = data
              queueNext()
            } else {
              informationDialog('Process Complete')
              setEditorMode(EDITOR_MODE.NORMAL)
            }
          })
          .catch(error => {
            errorDialog(error)
            setEditorMode(EDITOR_MODE.NORMAL)
          })
      }
    }

    confirmDialog('Do you want to continue?', () => {
      queueNext()
      $('#confirm-dialog').dialog('close')
    })
  })
})
