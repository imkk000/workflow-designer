import initialGlobalVariable from '../onload/initialGlobalVariable'

const resetMode = () => {
  if (confirm('Are you sure?')) {
    initialGlobalVariable()
    localStorage.clear()
    location.reload()
  }
}

window.addEventListener('load', () => {
  const resetId = document.getElementById('filterNode')
  if (!resetId) return

  resetId.addEventListener('click', () => {
    resetMode()
  })
})

export default resetMode
