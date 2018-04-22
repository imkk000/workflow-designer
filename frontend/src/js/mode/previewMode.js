const previewMode = () => {
  console.log(previewMode)
}

window.addEventListener('load', () => {
  document.getElementById('preview').addEventListener('click', () => {
    previewMode()
  })
})

export default previewMode
