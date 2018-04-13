import nodeContextMenu from './nodeContextMenu'
import lineContextMenu from './lineContextMenu'

// NOTE: load all context menu
$(document).ready(() => {
  nodeContextMenu()
  lineContextMenu()
})
