import initialGlobalVariable from '../onload/initialGlobalVariable'

const resetMode = () => {
  if (confirm('Are you sure?')) {
    initialGlobalVariable()
    localStorage.clear()
    location.reload()
  }
}

window.addEventListener('load', () => {
  document.getElementById('reset').addEventListener('click', () => {
    resetMode()
  })
})

export default resetMode
