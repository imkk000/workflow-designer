import addNodePreviews from './addNodePreviews'

window.addEventListener('load', () => {
  document.getElementById('filterNode').addEventListener('keyup', event => {
    addNodePreviews(event.target.value)
  })
})
