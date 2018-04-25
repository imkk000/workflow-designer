import addNodePreviews from './addNodePreviews'

window.addEventListener('load', () => {
  const filterNodeID = document.getElementById('filterNode')
  if (!filterNodeID) return

  filterNodeID.addEventListener('keyup', event => {
    addNodePreviews(event.target.value.trim())
  })
})
