import { getDataFromGlobal } from '../utility/editorMode'

window.addEventListener('load', () => {
  document.getElementById('save').addEventListener('click', () => {
    const nodes = getDataFromGlobal('NODES')
    const lines = getDataFromGlobal('LINES')

    localStorage.setItem('NODES', JSON.stringify(nodes))
    localStorage.setItem('LINES', JSON.stringify(lines))
  })
})
