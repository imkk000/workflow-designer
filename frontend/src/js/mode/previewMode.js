const previewMode = () => {
  window.open(`${location.origin}/preview`)
}

window.addEventListener('load', () => {
  document.getElementById('preview').addEventListener('click', () => {
    previewMode()
  })
})

export default previewMode
