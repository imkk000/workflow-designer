const previewMode = () => {
  window.open('//0.0.0.0:1412/preview')
}

window.addEventListener('load', () => {
  document.getElementById('preview').addEventListener('click', () => {
    previewMode()
  })
})

export default previewMode
