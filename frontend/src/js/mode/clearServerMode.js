import axios from 'axios'
import { errorDialog, informationDialog } from '../editor/dialog'

const clearServerMode = () => {
  if (confirm('Are you sure?')) {
    axios
      .delete(`${location.origin}/api/clear`, { data: { helpme: 'please' } })
      .then(() => {
        informationDialog('Delete Complete')
      })
      .catch(error => {
        console.log(error)
        errorDialog('Delete fail, please try again')
      })
  }
}

window.addEventListener('load', () => {
  const clearFilesId = document.getElementById('clear-files')
  if (!clearFilesId) return

  clearFilesId.addEventListener('click', () => {
    clearServerMode()
  })
})

export default clearServerMode
