import exportMode from './exportMode'

const saveMode = () => {
  const { nodes, lines } = exportMode()

  localStorage.setItem('NODES', JSON.stringify(nodes))
  localStorage.setItem('LINES', JSON.stringify(lines))
}

window.addEventListener('load', () => {
  document.getElementById('save').addEventListener('click', () => {
    saveMode()
  })
})

export default saveMode
