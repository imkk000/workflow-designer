const previewMode = () => {
  window.open(`${location.origin}/editor/preview`)
}

window.addEventListener('load', () => {
  const previewId = document.getElementById('preview')
  if (!previewId) return

  previewId.addEventListener('click', () => {
    previewMode()
  })
})

export default previewMode
