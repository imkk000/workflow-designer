import axios from 'axios'

window.addEventListener('load', () => {
  document.getElementById('start-process').addEventListener('click', () => {
    axios.post('http://127.0.0.1:9999/api/process', {})
  })
})
