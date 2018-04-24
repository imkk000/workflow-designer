import axios from 'axios'
import { errorDialog, informationDialog } from '../editor/dialog'

const clearServerMode = () => {
  if (confirm('Are you sure?')) {
    axios
      .delete('//0.0.0.0:1412/api/clear', { data: { helpme: 'please' } })
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
  document.getElementById('clear-files').addEventListener('click', () => {
    clearServerMode()
  })
})

export default clearServerMode
