import nodeContextMenu from './nodeContextMenu'
import lineContextMenu from './lineContextMenu'

// load all context menu
window.addEventListener('load', () => {
  nodeContextMenu()
  lineContextMenu()
})
